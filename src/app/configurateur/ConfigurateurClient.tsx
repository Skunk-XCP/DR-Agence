"use client";

import { parseTimelineToDays } from "@/lib/configuratorMath";
import { getOptionsFor } from "@/lib/configuratorOptions";
import { businessTypes, pricingMatrix, siteTypes, type BusinessTypeId, type SiteTypeId } from "@/lib/pricing";
import { buildQuoteMessage } from "@/lib/quoteMessage";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import styles from "./page.module.css";

type Props = {
  businessType: BusinessTypeId;
  siteType: SiteTypeId;
};

type CheckboxState = Record<string, boolean>;
type RadioState = Record<string, string>;

type SelectedLine = {
  id: string;
  label: string;
  price: number;
  days: number;
};

type SubmitState = {
  type: "success" | "error";
  message: string;
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
  const sections = useMemo(() => getOptionsFor(businessType, siteType), [businessType, siteType]);
  const [checked, setChecked] = useState<CheckboxState>({});
  const [selectedRadios, setSelectedRadios] = useState<RadioState>({});
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [siret, setSiret] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState | null>(null);

  const base = pricingMatrix[businessType][siteType];
  const timeline = parseTimelineToDays(base.timeline);
  const basePrice = base.fromPrice ?? base.range[0];
  const baseDays = timeline.days;
  const businessLabel = businessTypes.find((item) => item.id === businessType)?.label ?? businessType;
  const siteLabel = siteTypes.find((item) => item.id === siteType)?.label ?? siteType;

  const selectedLines = useMemo(() => {
    const lines: SelectedLine[] = [];

    sections.forEach((section) => {
      section.options.forEach((option) => {
        if (option.kind === "checkbox" && checked[option.id]) {
          lines.push({
            id: option.id,
            label: option.label,
            price: option.price ?? 0,
            days: option.days ?? 0
          });
        }

        if (option.kind === "radio" && option.choices) {
          const selectedChoiceId = selectedRadios[option.id];
          if (!selectedChoiceId) {
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
            days: choice.days
          });
        }
      });
    });

    return lines;
  }, [checked, sections, selectedRadios]);

  const optionsPrice = selectedLines.reduce((sum, item) => sum + item.price, 0);
  const optionsDays = selectedLines.reduce((sum, item) => sum + item.days, 0);
  const totalPrice = basePrice + optionsPrice;
  const totalDays = baseDays + optionsDays;

  const onCheckboxChange = (optionId: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [optionId]: value }));
  };

  const onRadioChange = (optionId: string, choiceId: string) => {
    setSelectedRadios((prev) => ({ ...prev, [optionId]: choiceId }));
  };

  const canGenerateMessage =
    clientName.trim().length > 0 && businessName.trim().length > 0 && email.trim().length > 0;

  const handleGenerateMessage = () => {
    if (!canGenerateMessage) {
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
        optionLabels: selectedLines.map((line) => line.label),
        totalPrice,
        totalDays
      })
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canGenerateMessage) {
      setSubmitState({
        type: "error",
        message: "Veuillez renseigner nom client, nom etablissement et email."
      });
      return;
    }

    const normalizedMessage = quoteMessage.trim();
    if (!quoteMessageRegex.test(normalizedMessage)) {
      setSubmitState({
        type: "error",
        message: "Le message doit contenir 20 a 3000 caracteres et ne pas inclure < ou >."
      });
      return;
    }

    setSubmitState(null);
    setIsSubmitting(true);

    const payload = {
      clientName: clientName.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      siret: siret.trim(),
      businessType,
      siteType,
      selectedOptions: selectedLines.map((line) => line.label),
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
        const errorMessage = await readSubmitError(response);
        setSubmitState({
          type: "error",
          message: `Erreur d'envoi: ${errorMessage}`
        });
        return;
      }

      setSubmitState({
        type: "success",
        message: "Demande envoyée"
      });
    } catch {
      setSubmitState({
        type: "error",
        message: "Erreur d'envoi: erreur reseau."
      });
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
                            checked={Boolean(checked[option.id])}
                            onChange={(e) => onCheckboxChange(option.id, e.target.checked)}
                          />
                          <span>
                            <strong>{option.label}</strong>
                            {option.description ? <small>{option.description}</small> : null}
                            <em>
                              {`+${formatMoney(option.price ?? 0)} | +${formatDays(option.days ?? 0)}`}
                            </em>
                          </span>
                        </label>
                      );
                    }

                    return (
                      <fieldset key={option.id} className={styles.radioGroup}>
                        <legend>{option.label}</legend>
                        {option.description ? <p className={styles.radioDescription}>{option.description}</p> : null}
                        <div className={styles.choiceList}>
                          {(option.choices ?? []).map((choice) => (
                            <label key={choice.id} className={styles.choiceItem}>
                              <input
                                type="radio"
                                name={option.id}
                                value={choice.id}
                                checked={selectedRadios[option.id] === choice.id}
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
                onChange={(event) => setClientName(event.target.value)}
                pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,80}$"
                title="2 à 80 caractères: lettres, espaces, apostrophes ou tirets."
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
                onChange={(event) => setBusinessName(event.target.value)}
                pattern="^[A-Za-zÀ-ÖØ-öø-ÿ0-9'&()., -]{2,120}$"
                title="2 à 120 caractères: lettres, chiffres, espaces et ponctuation simple."
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
                onChange={(event) => setSiret(event.target.value)}
                pattern="^\d{14}$"
                title="Le SIRET doit contenir exactement 14 chiffres."
              />
            </label>

            <button
              type="button"
              className={styles.generateButton}
              disabled={!canGenerateMessage || isSubmitting}
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
                onChange={(event) => setQuoteMessage(event.target.value)}
              />
            </label>

            <button
              type="submit"
              className={styles.sendButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi..." : "Envoyer le message"}
            </button>

            {submitState ? (
              <p
                className={submitState.type === "success" ? styles.submitSuccess : styles.submitError}
                role={submitState.type === "error" ? "alert" : "status"}
                aria-live={submitState.type === "error" ? "assertive" : "polite"}
              >
                {submitState.message}
              </p>
            ) : null}
          </form>
        </section>
      </section>
    </main>
  );
}
