import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { COOKIE_NAME } from "@/lib/auth";

export function POST() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
