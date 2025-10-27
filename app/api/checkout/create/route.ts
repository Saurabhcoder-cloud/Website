import { NextResponse } from "next/server";

type CheckoutItem = {
  name: string;
  amount: number;
  quantity?: number;
  currency?: string;
  description?: string;
};

type CreateCheckoutBody = {
  lineItems?: CheckoutItem[];
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  locale?: string;
  metadata?: Record<string, string>;
};

const STRIPE_API_BASE = "https://api.stripe.com/v1";

function resolveOrigin(request: Request) {
  const headerOrigin = request.headers.get("origin");
  if (headerOrigin) return headerOrigin;
  try {
    return new URL(request.url).origin;
  } catch (error) {
    console.error("Failed to resolve request origin", error);
    return "https://www.taxhelp.ai";
  }
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe secret key missing" }, { status: 500 });
  }

  let body: CreateCheckoutBody;

  try {
    body = (await request.json()) as CreateCheckoutBody;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { lineItems = [], successUrl, cancelUrl, customerEmail, locale, metadata } = body;

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "At least one line item is required" }, { status: 400 });
  }

  const origin = resolveOrigin(request);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", successUrl ?? `${origin}/receipt/{CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", cancelUrl ?? `${origin}/checkout/canceled`);
  params.set("automatic_tax[enabled]", "false");
  params.set("payment_intent_data[setup_future_usage]", "off_session");

  if (customerEmail) {
    params.set("customer_email", customerEmail);
  }

  if (locale) {
    params.set("locale", locale);
  }

  if (metadata) {
    Object.entries(metadata)
      .filter(([key, value]) => Boolean(key) && typeof value === "string")
      .forEach(([key, value]) => {
        params.append(`metadata[${key}]`, value ?? "");
      });
  }

  lineItems.forEach((item, index) => {
    const unitAmount = Math.max(0, Math.round(item.amount * 100));
    const quantity = Math.max(1, Math.floor(item.quantity ?? 1));
    params.set(`line_items[${index}][price_data][currency]`, (item.currency ?? "usd").toLowerCase());
    params.set(`line_items[${index}][price_data][unit_amount]`, unitAmount.toString());
    params.set(`line_items[${index}][price_data][product_data][name]`, item.name);
    if (item.description) {
      params.set(`line_items[${index}][price_data][product_data][description]`, item.description);
    }
    params.set(`line_items[${index}][quantity]`, quantity.toString());
  });

  try {
    const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message ?? "Stripe error" }, { status: response.status });
    }

    return NextResponse.json({ id: data.id, url: data.url, status: data.status });
  } catch (error) {
    console.error("Stripe checkout session creation failed", error);
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 502 });
  }
}
