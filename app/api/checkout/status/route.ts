import { NextResponse } from "next/server";

const STRIPE_API_BASE = "https://api.stripe.com/v1";

export async function GET(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe secret key missing" }, { status: 500 });
  }

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message ?? "Stripe error" }, { status: response.status });
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      paymentStatus: data.payment_status,
      currency: data.currency,
      amountTotal: data.amount_total,
      customerEmail: data.customer_details?.email ?? null,
      created: data.created,
      metadata: data.metadata ?? {},
    });
  } catch (error) {
    console.error("Failed to retrieve Stripe session", error);
    return NextResponse.json({ error: "Unable to fetch checkout status" }, { status: 502 });
  }
}
