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
  businessType?: unknown;
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

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

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

const buildMainEmailText = (payload: {
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  siteType: string;
  selectedOptions: string[];
  totalPrice: number;
  totalDays: number;
  message: string;
}): string => {
  return [
    "Nouvelle demande de devis",
    "",
    `Client: ${payload.clientName}`,
    `Etablissement: ${payload.businessName}`,
    `Email client: ${payload.email}`,
    `Telephone: ${payload.phone || "Non renseigne"}`,
    `Type de business: ${payload.businessType}`,
    `Type de site: ${payload.siteType}`,
    "",
    "Options selectionnees:",
    normalizeOptions(payload.selectedOptions),
    "",
    `Total estime: ${payload.totalPrice}`,
    `Delai estime: ${payload.totalDays} jours`,
    "",
    "Message client:",
    payload.message
  ].join("\n");
};

const buildReceiptEmailText = (payload: {
  clientName: string;
  businessName: string;
  selectedOptions: string[];
  totalPrice: number;
  totalDays: number;
}): string => {
  return [
    `Bonjour ${payload.clientName},`,
    "",
    "Nous avons bien recu votre demande de devis.",
    "",
    "Recapitulatif:",
    normalizeOptions(payload.selectedOptions),
    `Total estime: ${payload.totalPrice}`,
    `Delai estime: ${payload.totalDays} jours`,
    "",
    "Ce message n'est pas un devis final.",
    "Il s'agit uniquement d'un recapitulatif de votre demande.",
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

      if (!isNonEmptyString(body.siteType)) {
        return json({ error: "siteType is required" }, 400);
      }

      if (!isStringArray(body.selectedOptions)) {
        return json({ error: "selectedOptions must be an array of strings" }, 400);
      }

      if (!isValidNonNegativeNumber(body.totalPrice)) {
        return json({ error: "totalPrice must be a number >= 0" }, 400);
      }

      if (!isValidNonNegativeNumber(body.totalDays)) {
        return json({ error: "totalDays must be a number >= 0" }, 400);
      }

      if (!isNonEmptyString(body.message)) {
        return json({ error: "message is required" }, 400);
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
        businessType: body.businessType.trim(),
        siteType: body.siteType.trim(),
        selectedOptions: body.selectedOptions,
        totalPrice: body.totalPrice,
        totalDays: body.totalDays,
        message: body.message.trim()
      };

      await sendResendEmail(resendApiKey, {
        from: fromEmail,
        to: [quoteToEmail],
        reply_to: normalizedPayload.email,
        subject: `Demande de devis – ${normalizedPayload.siteType} – ${normalizedPayload.businessName}`,
        text: buildMainEmailText(normalizedPayload)
      });

      if ((env.SEND_CUSTOMER_RECEIPT ?? "false").toLowerCase() === "true") {
        await sendResendEmail(resendApiKey, {
          from: fromEmail,
          to: [normalizedPayload.email],
          subject: `Accusé réception – demande de devis – ${normalizedPayload.businessName}`,
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
