"use client";

import { parseTimelineToDays } from "@/lib/configuratorMath";
import { getOptionsFor } from "@/lib/configuratorOptions";
import { businessTypes, pricingMatrix, siteTypes, type BusinessTypeId, type SiteTypeId } from "@/lib/pricing";
import { buildQuoteMessage } from "@/lib/quoteMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import styles from "./page.module.css";

type Props = {
  businessType: BusinessTypeId;
  siteType: SiteTypeId;
};

type SelectedOptionsState = Record<string, boolean | string | number | undefined>;

type SelectedLine = {
  id: string;
  label: string;
  price: number;
  days: number;
  emailLabel: string;
};

type QuoteApiErrorResponse = {
  error?: unknown;
};

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const formatMoney = (value: number) => eur.format(value);
const formatDays = (value: number) => `${value} jours`;
const formatUnit = (value: number, unitLabel: string) => `${value} ${value > 1 ? `${unitLabel}s` : unitLabel}`;
const quoteMessageRegex = /^(?!.*[<>])[\s\S]{20,3000}$/;
const QUOTE_API_URL =
  process.env.NEXT_PUBLIC_QUOTE_API_URL ??
  "https://quote-mailer-worker.skunk-xcp.workers.dev/api/quote";

const readSubmitError = async (response: Response): Promise<string> => {
  try {
    const result = (await response.json()) as QuoteApiErrorResponse;
    if (typeof result.error === "string" && result.error.trim().length > 0) {
      return result.error;
    }
  } catch {
    // Ignore JSON parse errors and fallback to HTTP status.
  }

  return `HTTP ${response.status}`;
};

export default function ConfigurateurClient({ businessType, siteType }: Props) {
  const router = useRouter();
  const sections = useMemo(() => getOptionsFor(businessType, siteType), [businessType, siteType]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>({});
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [siret, setSiret] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quantityDefaults = useMemo(() => {
    const defaults: Record<string, number> = {};
    sections.forEach((section) => {
      section.options.forEach((option) => {
        if (option.kind === "quantity") {
          defaults[option.id] = option.defaultValue;
        }
      });
    });
    return defaults;
  }, [sections]);

  const base = pricingMatrix[businessType][siteType];
  const timeline = parseTimelineToDays(base.timeline);
  const basePrice = base.fromPrice ?? base.range[0];
  const baseDays = timeline.days;
  const businessLabel = businessTypes.find((item) => item.id === businessType)?.label ?? businessType;
  const siteLabel = siteTypes.find((item) => item.id === siteType)?.label ?? siteType;

  useEffect(() => {
    setSelectedOptions((prev) => {
      const next = { ...prev };
      let hasChange = false;

      Object.entries(quantityDefaults).forEach(([optionId, defaultValue]) => {
        if (typeof next[optionId] !== "number") {
          next[optionId] = defaultValue;
          hasChange = true;
        }
      });

      return hasChange ? next : prev;
    });
  }, [quantityDefaults]);

  const selectedLines = useMemo(() => {
    const lines: SelectedLine[] = [];

    sections.forEach((section) => {
      section.options.forEach((option) => {
        if (option.kind === "checkbox" && Boolean(selectedOptions[option.id])) {
          lines.push({
            id: option.id,
            label: option.label,
            price: option.price,
            days: option.days,
            emailLabel: option.label
          });
        }

        if (option.kind === "radio") {
          const selectedChoiceId = selectedOptions[option.id];
          if (typeof selectedChoiceId !== "string") {
            return;
          }
          const choice = option.choices.find((item) => item.id === selectedChoiceId);
          if (!choice) {
            return;
          }
          lines.push({
            id: `${option.id}:${choice.id}`,
            label: `${option.label} - ${choice.label}`,
            price: choice.price,
            days: choice.days,
            emailLabel: `${option.label} - ${choice.label}`
          });
        }

        if (option.kind === "quantity") {
          const rawQty = selectedOptions[option.id];
          const qty = typeof rawQty === "number" ? rawQty : option.defaultValue;
          if (qty <= 0) {
            return;
          }
          const optionPrice = qty * option.unitPrice;
          const optionDays = qty * option.unitDays;
          lines.push({
            id: `${option.id}:${qty}`,
            label: `${option.label}: ${qty}`,
            price: optionPrice,
            days: optionDays,
            emailLabel: `${option.label}: ${qty} x ${option.unitPrice}€`
          });
        }
      });
    });

    return lines;
  }, [sections, selectedOptions]);

  const optionsPrice = selectedLines.reduce((sum, item) => sum + item.price, 0);
  const optionsDays = selectedLines.reduce((sum, item) => sum + item.days, 0);
  const totalPrice = basePrice + optionsPrice;
  const totalDays = baseDays + optionsDays;
  const isFormDisabled = isSubmitting || isSuccess;

  const getQuantityValue = useCallback(
    (optionId: string, fallbackValue: number) => {
      const rawValue = selectedOptions[optionId];
      return typeof rawValue === "number" ? rawValue : fallbackValue;
    },
    [selectedOptions]
  );

  const setQuantityValue = useCallback(
    (optionId: string, min: number, max: number, nextValue: number) => {
      if (isFormDisabled) {
        return;
      }
      const clamped = Math.min(max, Math.max(min, nextValue));
      setSelectedOptions((prev) => ({ ...prev, [optionId]: clamped }));
    },
    [isFormDisabled]
  );

  const getQuantityImpact = (qty: number, unitPrice: number, unitDays: number) => {
    const price = qty * unitPrice;
    const days = qty * unitDays;
    return `+${price} € / +${days} jours`;
  };

  const quoteOptionLabels = selectedLines.map((line) => line.emailLabel);

  const redirectToLanding = useCallback(() => {
    setShowSuccessModal(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!showSuccessModal) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        redirectToLanding();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [redirectToLanding, showSuccessModal]);

  const onCheckboxChange = (optionId: string, value: boolean) => {
    if (isFormDisabled) {
      return;
    }
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
  };

  const onRadioChange = (optionId: string, choiceId: string) => {
    if (isFormDisabled) {
      return;
    }
    setSelectedOptions((prev) => ({ ...prev, [optionId]: choiceId }));
  };

  const canGenerateMessage =
    clientName.trim().length > 0 && businessName.trim().length > 0 && email.trim().length > 0;

  const handleGenerateMessage = () => {
    if (isFormDisabled || !canGenerateMessage) {
      return;
    }

    setQuoteMessage(
      buildQuoteMessage({
        clientName: clientName.trim(),
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        businessTypeLabel: businessLabel,
        siteTypeLabel: siteLabel,
        optionLabels: quoteOptionLabels,
        totalPrice,
        totalDays
      })
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || isSuccess) {
      return;
    }

    if (!canGenerateMessage) {
      setErrorMessage("Veuillez renseigner nom client, nom etablissement et email.");
      return;
    }

    const normalizedMessage = quoteMessage.trim();
    if (!quoteMessageRegex.test(normalizedMessage)) {
      setErrorMessage("Le message doit contenir 20 a 3000 caracteres et ne pas inclure < ou >.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const payload = {
      clientName: clientName.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      siret: siret.trim(),
      businessType,
      siteType,
      selectedOptions: quoteOptionLabels,
      totalPrice,
      totalDays,
      message: normalizedMessage
    };

    try {
      const response = await fetch(QUOTE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const submitError = await readSubmitError(response);
        setErrorMessage(`Erreur d'envoi: ${submitError}`);
        return;
      }

      setIsSuccess(true);
      setShowSuccessModal(true);
      setClientName("");
      setBusinessName("");
      setEmail("");
      setPhone("");
      setSiret("");
      setQuoteMessage("");
      setSelectedOptions({});
    } catch {
      setErrorMessage("Erreur d'envoi: erreur reseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Configurateur avance</p>
        <h1 className={styles.title}>Configurer votre offre</h1>
        <p className={styles.context}>
          Base selectionnee: <strong>{businessLabel}</strong> - <strong>{siteLabel}</strong>
        </p>

        <div className={styles.layout}>
          <div className={styles.optionsPanel}>
            {sections.map((section) => (
              <article key={section.section} className={styles.optionSection}>
                <h2>{section.section}</h2>
                <div className={styles.optionList}>
                  {section.options.map((option) => {
                    if (option.kind === "checkbox") {
                      return (
                        <label key={option.id} className={styles.optionItem}>
                          <input
                            type="checkbox"
                            checked={Boolean(selectedOptions[option.id])}
                            disabled={isFormDisabled}
                            onChange={(e) => onCheckboxChange(option.id, e.target.checked)}
                          />
                          <span>
                            <strong>{option.label}</strong>
                            {option.description ? <small>{option.description}</small> : null}
                            <em>{`+${formatMoney(option.price)} | +${formatDays(option.days)}`}</em>
                          </span>
                        </label>
                      );
                    }

                    if (option.kind === "radio") {
                      return (
                        <fieldset key={option.id} className={styles.radioGroup}>
                          <legend>{option.label}</legend>
                          {option.description ? <p className={styles.radioDescription}>{option.description}</p> : null}
                          <div className={styles.choiceList}>
                            {option.choices.map((choice) => (
                              <label key={choice.id} className={styles.choiceItem}>
                                <input
                                  type="radio"
                                  name={option.id}
                                  value={choice.id}
                                  checked={selectedOptions[option.id] === choice.id}
                                  disabled={isFormDisabled}
                                  onChange={() => onRadioChange(option.id, choice.id)}
                                />
                                <span>
                                  <strong>{choice.label}</strong>
                                  {choice.description ? <small>{choice.description}</small> : null}
                                  <em>
                                    {`+${formatMoney(choice.price)} | +${formatDays(choice.days)}`}
                                  </em>
                                </span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      );
                    }

                    const qty = getQuantityValue(option.id, option.defaultValue);
                    return (
                      <div key={option.id} className={styles.quantityGroup}>
                        <p className={styles.quantityTitle}>{option.label}</p>
                        {option.description ? <p className={styles.radioDescription}>{option.description}</p> : null}
                        <div className={styles.quantityControls}>
                          <button
                            type="button"
                            className={styles.quantityButton}
                            disabled={isFormDisabled || qty <= option.min}
                            onClick={() => setQuantityValue(option.id, option.min, option.max, qty - 1)}
                            aria-label={`Retirer 1 ${option.unitLabel}`}
                          >
                            -
                          </button>
                          <input
                            className={styles.quantityInput}
                            type="number"
                            min={option.min}
                            max={option.max}
                            step={1}
                            value={qty}
                            disabled={isFormDisabled}
                            onChange={(event) => {
                              const parsedValue = Number(event.target.value);
                              if (Number.isNaN(parsedValue)) {
                                return;
                              }
                              setQuantityValue(option.id, option.min, option.max, parsedValue);
                            }}
                            aria-label={`${option.label} en nombre de ${option.unitLabel}`}
                          />
                          <button
                            type="button"
                            className={styles.quantityButton}
                            disabled={isFormDisabled || qty >= option.max}
                            onClick={() => setQuantityValue(option.id, option.min, option.max, qty + 1)}
                            aria-label={`Ajouter 1 ${option.unitLabel}`}
                          >
                            +
                          </button>
                          <span className={styles.quantityUnit}>{formatUnit(qty, option.unitLabel)}</span>
                        </div>
                        <em className={styles.quantityImpact}>
                          {getQuantityImpact(qty, option.unitPrice, option.unitDays)}
                        </em>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.recap}>
            <h2>Recap live</h2>
            <p className={styles.baseLine}>
              Base: <strong>{formatMoney(basePrice)}</strong>
            </p>
            <p className={styles.baseLine}>
              Delai base: <strong>{formatDays(baseDays)}</strong>
            </p>
            <p className={styles.baseSmall}>
              Info delai source: {timeline.min}-{timeline.max} jours
            </p>

            <div className={styles.recapList}>
              <p>
                <strong>Options:</strong>
              </p>
              {selectedLines.length === 0 ? (
                <p>Aucune option selectionnee.</p>
              ) : (
                <ul>
                  {selectedLines.map((item) => (
                    <li key={item.id}>
                      {item.label}: +{formatMoney(item.price)} (+{formatDays(item.days)})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.totalBlock}>
              <p className={styles.totalTitle}>Addition explicite</p>
              <p className={styles.totalLine}>
                Total: {formatMoney(basePrice)} + {formatMoney(optionsPrice)} ={" "}
                <strong>{formatMoney(totalPrice)}</strong>
              </p>
              <p className={styles.totalLine}>
                Delai: {formatDays(baseDays)} + {formatDays(optionsDays)} ={" "}
                <strong>{formatDays(totalDays)}</strong>
              </p>
            </div>

            <p className={styles.guardrail}>
              Seules les options coherentes avec le type de commerce et le type de site sont proposees.
            </p>
            <div className={styles.recapActions}>
              <Link href={`/offres?businessType=${businessType}&siteType=${siteType}`}>Modifier la base</Link>
              <Link href="/#contact">Demander un devis</Link>
            </div>
          </aside>
        </div>

        <section className={styles.formSection}>
          <h2>Vos informations</h2>
          <form className={styles.formGrid} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Nom du client *</span>
              <input
                type="text"
                name="clientName"
                autoComplete="name"
                required
                value={clientName}
                disabled={isFormDisabled}
                onChange={(event) => setClientName(event.target.value)}
                pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,80}$"
                title="2 a 80 caracteres: lettres, espaces, apostrophes ou tirets."
              />
            </label>

            <label className={styles.field}>
              <span>Nom de l'etablissement *</span>
              <input
                type="text"
                name="businessName"
                autoComplete="organization"
                required
                value={businessName}
                disabled={isFormDisabled}
                onChange={(event) => setBusinessName(event.target.value)}
                pattern="^[A-Za-zÀ-ÖØ-öø-ÿ0-9'&()., -]{2,120}$"
                title="2 a 120 caracteres: lettres, chiffres, espaces et ponctuation simple."
              />
            </label>

            <label className={styles.field}>
              <span>Email *</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                disabled={isFormDisabled}
                onChange={(event) => setEmail(event.target.value)}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                title="Format attendu: nom@domaine.tld"
              />
            </label>

            <label className={styles.field}>
              <span>Telephone</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                disabled={isFormDisabled}
                onChange={(event) => setPhone(event.target.value)}
                pattern="^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$"
                title="Format FR: 06 12 34 56 78 ou +33 6 12 34 56 78"
              />
            </label>

            <label className={styles.field}>
              <span>Siret</span>
              <input
                type="text"
                name="siret"
                inputMode="numeric"
                maxLength={14}
                value={siret}
                disabled={isFormDisabled}
                onChange={(event) => setSiret(event.target.value)}
                pattern="^\d{14}$"
                title="Le SIRET doit contenir exactement 14 chiffres."
              />
            </label>

            <button
              type="button"
              className={styles.generateButton}
              disabled={!canGenerateMessage || isFormDisabled}
              onClick={handleGenerateMessage}
            >
              Generer le texte
            </button>

            <label className={styles.fieldTextarea}>
              <span>Message / demande de devis</span>
              <p id="quoteMessageHelp" className={styles.fieldHelp}>
                20 a 3000 caracteres. Les caracteres {"<"} et {">"} ne sont pas acceptes.
              </p>
              <textarea
                name="quoteMessage"
                rows={10}
                required
                minLength={20}
                maxLength={3000}
                aria-describedby="quoteMessageHelp"
                value={quoteMessage}
                disabled={isFormDisabled}
                onChange={(event) => setQuoteMessage(event.target.value)}
              />
            </label>

            <button type="submit" className={styles.sendButton} disabled={isFormDisabled}>
              {isSubmitting ? "Envoi..." : "Envoyer le message"}
            </button>

            {errorMessage ? (
              <p className={styles.submitError} role="alert" aria-live="assertive">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </section>
      </section>
      {showSuccessModal ? (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              redirectToLanding();
            }
          }}
        >
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-description"
          >
            <h2 id="success-modal-title">Confirmation</h2>
            <p id="success-modal-description">
              Votre demande a bien été envoyée. Vous recevrez une réponse dès que possible.
            </p>
            <button type="button" className={styles.modalOkButton} autoFocus onClick={redirectToLanding}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

