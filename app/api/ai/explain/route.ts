import { NextResponse } from "next/server";

const fallback = {
  answer:
    "We'll map your gig income into Schedule C line 1, compute self-employment tax on Schedule SE, and surface the results on Form 1040 lines 8 and 23. Federal withholding and California SDI credits flow to their respective payment lines.",
  references: [
    "IRS Form 1040 Instructions (2023) — Schedule 1",
    "Schedule SE Instructions (2023)",
    "California Form 540 Booklet (2023)"
  ],
  model: "mock"
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const question = typeof body.question === "string" ? body.question : "";

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(fallback);
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://www.taxhelp.ai",
        "X-Title": "TaxHelp AI Demo"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content:
              "You are a U.S. tax assistant. Answer succinctly, cite IRS or FTB references, and never request or echo PII."
          },
          {
            role: "user",
            content: question || "Explain how gig income flows through the return."
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const payload = await response.json();
    const message = payload?.choices?.[0]?.message?.content as string | undefined;

    if (!message) {
      throw new Error("No message returned");
    }

    return NextResponse.json({
      answer: message,
      references: fallback.references,
      model: payload.model || "anthropic/claude-3-haiku"
    });
  } catch (error) {
    console.error("OpenRouter proxy failed", error);
    return NextResponse.json(fallback, { status: 200 });
  }
}
