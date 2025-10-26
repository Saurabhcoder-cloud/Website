import crypto from "node:crypto";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function timingSafeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");
  if (bufferA.length !== bufferB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufferA, bufferB);
}

function verifyStripeSignature(payload: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader) return false;

  const parts = signatureHeader
    .split(",")
    .map((segment) => segment.split("="))
    .filter((segment): segment is [string, string] => segment.length === 2);

  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return signatures.some((candidate) => timingSafeEqual(candidate, expectedSignature));
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook secret missing" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = headers().get("stripe-signature");

  const isValid = verifyStripeSignature(rawBody, signature, webhookSecret);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { type: string; data?: Record<string, unknown> };

  try {
    event = JSON.parse(rawBody);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
    case "checkout.session.async_payment_failed":
      // Handlers can be connected later; acknowledgement keeps Stripe happy for now.
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
