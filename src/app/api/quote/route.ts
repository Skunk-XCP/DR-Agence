import { NextResponse } from "next/server";

type QuotePayload = {
  clientName?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  siret?: unknown;
  businessType?: unknown;
  siteType?: unknown;
  selectedOptions?: unknown;
  totalPrice?: unknown;
  totalDays?: unknown;
  message?: unknown;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const quoteMessageRegex = /^(?!.*[<>])[\s\S]{20,3000}$/;

export async function POST(request: Request) {
  let body: QuotePayload;

  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
  }

  if (!isNonEmptyString(body.clientName)) {
    return NextResponse.json({ error: "Le nom du client est requis." }, { status: 400 });
  }

  if (!isNonEmptyString(body.businessName)) {
    return NextResponse.json({ error: "Le nom de l'établissement est requis." }, { status: 400 });
  }

  if (!isNonEmptyString(body.email) || !emailRegex.test(body.email.trim())) {
    return NextResponse.json({ error: "L'email est invalide." }, { status: 400 });
  }

  if (!isNonEmptyString(body.businessType)) {
    return NextResponse.json({ error: "Le type de commerce est requis." }, { status: 400 });
  }

  if (!isNonEmptyString(body.siteType)) {
    return NextResponse.json({ error: "Le type de site est requis." }, { status: 400 });
  }

  if (!Array.isArray(body.selectedOptions)) {
    return NextResponse.json({ error: "selectedOptions doit être un tableau." }, { status: 400 });
  }

  if (typeof body.totalPrice !== "number" || Number.isNaN(body.totalPrice)) {
    return NextResponse.json({ error: "totalPrice doit être un nombre." }, { status: 400 });
  }

  if (typeof body.totalDays !== "number" || Number.isNaN(body.totalDays)) {
    return NextResponse.json({ error: "totalDays doit être un nombre." }, { status: 400 });
  }

  if (typeof body.message !== "string") {
    return NextResponse.json({ error: "message doit être une chaîne." }, { status: 400 });
  }

  const trimmedMessage = body.message.trim();
  if (!quoteMessageRegex.test(trimmedMessage)) {
    return NextResponse.json(
      { error: "Le message doit contenir 20 à 3000 caractères et ne pas inclure < ou >." },
      { status: 400 }
    );
  }

  const payload = {
    clientName: body.clientName.trim(),
    businessName: body.businessName.trim(),
    email: body.email.trim(),
    phone: typeof body.phone === "string" ? body.phone.trim() : "",
    siret: typeof body.siret === "string" ? body.siret.trim() : "",
    businessType: body.businessType.trim(),
    siteType: body.siteType.trim(),
    selectedOptions: body.selectedOptions,
    totalPrice: body.totalPrice,
    totalDays: body.totalDays,
    message: trimmedMessage
  };

  console.log("[API_QUOTE]", payload);

  return NextResponse.json({ ok: true }, { status: 200 });
}

