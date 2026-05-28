import { NextResponse } from "next/server";

import { transferSuccessTotal } from "@/lib/metrics";

export function POST() {
  transferSuccessTotal.inc();
  return NextResponse.json({ ok: true });
}
