import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
export async function POST(req: NextRequest) {
  const { tier, liked } = await req.json();

  const prompt = `Suggest 3 movies for a ${tier} tier user who liked: ${liked.join(", ")}.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message?.content;

    return NextResponse.json({ suggestions: content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
