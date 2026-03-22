export interface Env {
  RESEND_API_KEY: string;
  QUOTE_TO_EMAIL: string;
  FROM_EMAIL: string;
  SEND_CUSTOMER_RECEIPT?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type QuotePayload = {
  clientName?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  siret?: unknown;
  businessType?: unknown;
  projectType?: unknown;
  siteType?: unknown;
  selectedOptions?: unknown;
  totalPrice?: unknown;
  totalDays?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
};

type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const JSON_HEADERS: Record<string, string> = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidNonNegativeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

type OptionLike = string | { label?: unknown };

const normalizeSelectedOptions = (value: unknown): string[] | null => {
  if (!Array.isArray(value)) {
    return null;
  }

  const normalized = value
    .map((item: OptionLike) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        typeof item.label === "string"
      ) {
        return item.label.trim();
      }

      return "";
    })
    .filter((item) => item.length > 0);

  return normalized;
};

const getClientIp = (request: Request): string => request.headers.get("CF-Connecting-IP") ?? "";

const verifyTurnstile = async (
  secret: string,
  token: string,
  remoteIp: string
): Promise<boolean> => {
  const formData = new URLSearchParams();
  formData.set("secret", secret);
  formData.set("response", token);
  if (remoteIp) {
    formData.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
};

const sendResendEmail = async (apiKey: string, payload: ResendEmailPayload): Promise<void> => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`resend_error:${response.status}:${errorText}`);
  }
};

const normalizeOptions = (options: string[]): string =>
  options.length > 0 ? options.map((option) => `- ${option}`).join("\n") : "- Aucune option";

const normalizeInternalOptions = (options: string[]): string =>
  options.length > 0 ? options.map((option) => `- ${option}`).join("\n") : "Aucune";

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  snack: "Restauration rapide / snack",
  restaurant: "Restaurant independant",
  medical: "Sante (cabinet / dentaire / paramedical)",
  gastro: "Gastronomique / haut de gamme",
  artisan: "Artisan (BTP / services)",
  salon: "Salon (coiffure / esthetique)",
  coach: "Coach / independant",
  association: "Association / organisme",
  tpe: "TPE / PME (presence pro)"
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  new_site: "Creer un site",
  existing_site: "Mettre a jour un site existant"
};

const SITE_TYPE_LABELS: Record<string, string> = {
  vitrine: "Site vitrine",
  backend: "Vitrine + fonctionnalites"
};

const getBusinessTypeLabel = (businessType: string): string =>
  BUSINESS_TYPE_LABELS[businessType] ?? businessType;

const getProjectTypeLabel = (projectType: string): string =>
  PROJECT_TYPE_LABELS[projectType] ?? projectType;

const getSiteTypeLabel = (siteType: string): string => SITE_TYPE_LABELS[siteType] ?? siteType;

const buildGeneratedMessageBlock = (payload: {
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  projectType: string;
  businessTypeLabel: string;
  siteTypeLabel: string;
  selectedOptions: string[];
}): string => {
  const businessNameLine = payload.businessName ? ` - ${payload.businessName}` : "";
  const optionsBlock =
    payload.selectedOptions.length > 0
      ? `Je souhaite inclure les options suivantes :\n${payload.selectedOptions.map((option) => `- ${option}`).join("\n")}`
      : "Je n'ai pas d'option supplementaire pour le moment.";
  const clientPhoneLine = payload.phone ? `\n${payload.phone}` : "";
  const projectSentence =
    payload.projectType === "existing_site"
      ? `Je souhaiterais obtenir un devis pour la mise a jour d'un site existant (${payload.siteTypeLabel}) pour mon activite (${payload.businessTypeLabel}${businessNameLine}).`
      : `Je souhaiterais obtenir un devis pour la creation d'un ${payload.siteTypeLabel} pour mon activite (${payload.businessTypeLabel}${businessNameLine}).`;

  return [
    "Bonjour,",
    "",
    projectSentence,
    "",
    optionsBlock,
    "",
    "Dans l'attente de votre retour,",
    "Cordialement,",
    payload.clientName,
    "",
    `${payload.email}${clientPhoneLine}`
  ].join("\n");
};

const buildMainEmailText = (payload: {
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  siret: string;
  businessType: string;
  projectType: string;
  siteType: string;
  selectedOptions: string[];
  totalPrice: number;
  totalDays: number;
}): string => {
  const businessTypeLabel = getBusinessTypeLabel(payload.businessType);
  const projectTypeLabel = getProjectTypeLabel(payload.projectType);
  const siteTypeLabel = getSiteTypeLabel(payload.siteType);
  const generatedMessage = buildGeneratedMessageBlock({
    clientName: payload.clientName,
    businessName: payload.businessName,
    email: payload.email,
    phone: payload.phone,
    projectType: payload.projectType,
    businessTypeLabel,
    siteTypeLabel,
    selectedOptions: payload.selectedOptions
  });

  return [
    "INFOS",
    `Client: ${payload.clientName}`,
    `Etablissement: ${payload.businessName}`,
    `Email: ${payload.email}`,
    `Telephone: ${payload.phone || "-"}`,
    `SIRET: ${payload.siret || "-"}`,
    "",
    "BASE",
    `Mode projet: ${projectTypeLabel}`,
    `Type de commerce: ${businessTypeLabel}`,
    `Type de site: ${siteTypeLabel}`,
    "",
    "OPTIONS",
    normalizeInternalOptions(payload.selectedOptions),
    "",
    "ESTIMATION",
    `Total: ${payload.totalPrice} EUR`,
    `Delai: ${payload.totalDays} jours`,
    "",
    "_____________________________________________________________________________",
    "",
    "",
    generatedMessage
  ].join("\n");
};

const buildReceiptEmailText = (payload: {
  clientName: string;
  businessName: string;
  projectType: string;
  selectedOptions: string[];
  totalPrice: number;
  totalDays: number;
}): string => {
  return [
    `Bonjour ${payload.clientName},`,
    "",
    "Nous avons bien recu votre demande de devis.",
    "",
    `Mode projet: ${getProjectTypeLabel(payload.projectType)}`,
    "Recapitulatif:",
    normalizeOptions(payload.selectedOptions),
    `Total estime: ${payload.totalPrice} EUR`,
    `Delai estime: ${payload.totalDays} jours`,
    "",
    "Ce message n'est pas un devis final.",
    "Il s'agit uniquement d'un recapitulatif de votre demande.",
    "Ne pas repondre a ce mail.",
    "",
    "Merci."
  ].join("\n");
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: JSON_HEADERS });
    }

    if (url.pathname !== "/api/quote") {
      return json({ error: "not_found" }, 404);
    }

    if (request.method !== "POST") {
      return json({ error: "method_not_allowed" }, 405);
    }

    try {
      const resendApiKey = env.RESEND_API_KEY?.trim();
      const quoteToEmail = env.QUOTE_TO_EMAIL?.trim();
      const fromEmail = env.FROM_EMAIL?.trim();

      if (!resendApiKey || !quoteToEmail || !fromEmail) {
        console.error("Missing required Worker environment variables.");
        return json({ error: "internal_error" }, 500);
      }

      let body: QuotePayload;
      try {
        body = (await request.json()) as QuotePayload;
      } catch {
        return json({ error: "invalid_json" }, 400);
      }

      if (!isNonEmptyString(body.clientName)) {
        return json({ error: "clientName is required" }, 400);
      }

      if (!isNonEmptyString(body.businessName)) {
        return json({ error: "businessName is required" }, 400);
      }

      if (!isNonEmptyString(body.email) || !EMAIL_REGEX.test(body.email.trim())) {
        return json({ error: "email is invalid" }, 400);
      }

      if (!isNonEmptyString(body.businessType)) {
        return json({ error: "businessType is required" }, 400);
      }

      if (!isNonEmptyString(body.projectType)) {
        return json({ error: "projectType is required" }, 400);
      }

      if (!isNonEmptyString(body.siteType)) {
        return json({ error: "siteType is required" }, 400);
      }

      const selectedOptions = normalizeSelectedOptions(body.selectedOptions);
      if (!selectedOptions) {
        return json({ error: "selectedOptions must be an array of strings or {label}" }, 400);
      }

      if (!isValidNonNegativeNumber(body.totalPrice)) {
        return json({ error: "totalPrice must be a number >= 0" }, 400);
      }

      if (!isValidNonNegativeNumber(body.totalDays)) {
        return json({ error: "totalDays must be a number >= 0" }, 400);
      }

      const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim();
      if (turnstileSecret) {
        if (!isNonEmptyString(body.turnstileToken)) {
          return json({ error: "turnstile_token_required" }, 400);
        }

        const isTurnstileValid = await verifyTurnstile(
          turnstileSecret,
          body.turnstileToken,
          getClientIp(request)
        );

        if (!isTurnstileValid) {
          return json({ error: "turnstile_verification_failed" }, 400);
        }
      }

      const normalizedPayload = {
        clientName: body.clientName.trim(),
        businessName: body.businessName.trim(),
        email: body.email.trim(),
        phone: typeof body.phone === "string" ? body.phone.trim() : "",
        siret: typeof body.siret === "string" ? body.siret.trim() : "",
        businessType: body.businessType.trim(),
        projectType: body.projectType.trim(),
        siteType: body.siteType.trim(),
        selectedOptions,
        totalPrice: body.totalPrice,
        totalDays: body.totalDays,
        message: typeof body.message === "string" ? body.message.trim() : ""
      };

      await sendResendEmail(resendApiKey, {
        from: fromEmail,
        to: [quoteToEmail],
        reply_to: normalizedPayload.email,
        subject: `Nouveau lead devis - ${normalizedPayload.businessName} - ${normalizedPayload.projectType} - ${normalizedPayload.siteType}`,
        text: buildMainEmailText(normalizedPayload)
      });

      if ((env.SEND_CUSTOMER_RECEIPT ?? "false").toLowerCase() === "true") {
        await sendResendEmail(resendApiKey, {
          from: fromEmail,
          to: [normalizedPayload.email],
          subject: `Accuse reception - demande de devis - ${normalizedPayload.businessName}`,
          text: buildReceiptEmailText(normalizedPayload)
        });
      }

      return json({ ok: true }, 200);
    } catch (error) {
      console.error("Worker error on /api/quote", error);
      return json({ error: "internal_error" }, 500);
    }
  }
};
