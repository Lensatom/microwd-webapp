import { ACCESS_TOKEN_KEY } from "@/shared/config/api/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  const cookieStore = await cookies()
  cookieStore.set(ACCESS_TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  return NextResponse.json({ token });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: ACCESS_TOKEN_KEY, path: "/" });
  return NextResponse.json({ success: true });
}