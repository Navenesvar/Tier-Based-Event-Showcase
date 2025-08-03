import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth(); // ✅ Do NOT await this
  const { tier } = await req.json();

  if (!userId || !tier) {
    return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 401 });
  }

  const res = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      public_metadata: { tier },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}