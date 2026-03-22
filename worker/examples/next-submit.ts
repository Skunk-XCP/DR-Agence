// Exemple de submit cote Next.js (client-side)
// WORKER_QUOTE_ENDPOINT peut etre expose via NEXT_PUBLIC_WORKER_QUOTE_ENDPOINT

export async function submitQuoteToWorker(input: {
  clientName: string;
  businessName: string;
  email: string;
  phone?: string;
  businessType: string;
  projectType: string;
  siteType: string;
  selectedOptions: string[];
  totalPrice: number;
  totalDays: number;
  message: string;
  turnstileToken?: string;
}) {
  const endpoint = process.env.NEXT_PUBLIC_WORKER_QUOTE_ENDPOINT;
  if (!endpoint) {
    throw new Error("Missing NEXT_PUBLIC_WORKER_QUOTE_ENDPOINT");
  }

  const response = await fetch(`${endpoint}/api/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      clientName: input.clientName,
      businessName: input.businessName,
      email: input.email,
      phone: input.phone,
      businessType: input.businessType,
      projectType: input.projectType,
      siteType: input.siteType,
      selectedOptions: input.selectedOptions,
      totalPrice: input.totalPrice,
      totalDays: input.totalDays,
      message: input.message,
      turnstileToken: input.turnstileToken
    })
  });

  const data = (await response.json()) as { ok?: boolean; error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "quote_submit_failed");
  }

  return data;
}
