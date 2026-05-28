import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { getUserById } from "@/services/mockAuthService";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = getUserById(payload.id);

  return NextResponse.json({ user: user ?? null });
}
