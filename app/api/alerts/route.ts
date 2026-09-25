import { NextResponse } from "next/server";
import { alertsQueue } from "@/data/alerts";

export async function GET() {
  return NextResponse.json(
    alertsQueue.map((alert) => ({
      ...alert,
      time: alert.time,
    })),
  );
}
