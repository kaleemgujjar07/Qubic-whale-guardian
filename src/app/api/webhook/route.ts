import { NextResponse } from "next/server";
import { addEvent } from "@/lib/events";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // This is the event EasyConnect will send
    addEvent({
      id: Date.now(),
      type: data?.type ?? "Unknown",
      wallet: data?.wallet ?? "N/A",
      amount: data?.amount ?? 0,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    console.error("/api/webhook POST error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

