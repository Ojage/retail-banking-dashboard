import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createToken, COOKIE_NAME, SESSION_DURATION } from "@/lib/auth";
import { signup } from "@/services/mockAuthService";

export async function POST(request: Request) {
  try {
    const { email, password, name } = (await request.json()) as {
      email: string;
      password: string;
      name: string;
    };

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required." },
        { status: 400 }
      );
    }

    const result = await signup(email, password, name);

    if (!result.success || !result.user) {
      return NextResponse.json({ error: result.error ?? "Signup failed." }, { status: 409 });
    }

    const token = await createToken(result.user);
    const cookieStore = cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
