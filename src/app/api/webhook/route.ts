import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  // This is the event EasyConnect will send
  addEvent({
    id: Date.now(),
    type: data.type || "Unknown",
    wallet: data.wallet || "N/A",
    amount: data.amount || 0,
    timestamp: new Date().toISOString()
  });

  return NextResponse.json({ message: "OK" });
}
function addEvent(arg0: { id: number; type: any; wallet: any; amount: any; timestamp: string; }) {
    throw new Error("Function not implemented.");
}

