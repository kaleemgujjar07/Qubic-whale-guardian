import { NextResponse } from "next/server";
import { addEvent } from "@/lib/events";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-webhook-secret",
};

type WebhookPayload = {
  type?: string;
  wallet?: string;
  amount?: number | string;
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    // Quick CORS response headers for clients
    const secretHeader = req.headers.get("x-webhook-secret");
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (expectedSecret && expectedSecret.length > 0) {
      if (!secretHeader || secretHeader !== expectedSecret) {
        console.warn("/api/webhook: invalid or missing secret header");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: CORS_HEADERS });
      }
    }

    let data: WebhookPayload;
    try {
      data = await req.json();
    } catch (e) {
      console.warn("/api/webhook: invalid JSON payload", e);
      return NextResponse.json({ message: "Bad Request - invalid JSON" }, { status: 400, headers: CORS_HEADERS });
    }

    // Basic validation / normalization
    const event: any = {
      id: Date.now(),
      type: data?.type ?? "Unknown",
      wallet: data?.wallet ?? "N/A",
      amount: typeof data?.amount === "string" ? Number(data.amount) : (data?.amount ?? 0),
      timestamp: new Date().toISOString(),
    };

    if (Number.isNaN(event.amount)) {
      console.warn("/api/webhook: amount is not a number", data?.amount);
      return NextResponse.json({ message: "Bad Request - amount must be a number" }, { status: 400, headers: CORS_HEADERS });
    }

    // Store the incoming event in memory (your simple in-memory store)
    try {
      addEvent(event);
    } catch (addErr) {
      console.error("/api/webhook: error storing event", addErr);
      return NextResponse.json({ message: "Failed to store event" }, { status: 500, headers: CORS_HEADERS });
    }

    return NextResponse.json({ message: "OK" }, { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    console.error("/api/webhook POST error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500, headers: CORS_HEADERS });
  }
}

