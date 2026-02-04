import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface SubscribeRequest {
  email: string;
  userTopic: string;
  clarifyingAnswer?: string;
  encouragementVerseText: string;
  encouragementVerseReference: string;
  language?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const {
      email,
      userTopic,
      clarifyingAnswer,
      encouragementVerseText,
      encouragementVerseReference,
      language = "en",
    } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!userTopic || !encouragementVerseText || !encouragementVerseReference) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if this email already subscribed in the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: existing } = await supabase
      .from("reminder_subscribers")
      .select("id")
      .eq("email", email.toLowerCase())
      .gte("subscribed_at", twentyFourHoursAgo)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "You've already signed up for a reminder today" },
        { status: 400 }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("reminder_subscribers")
      .insert({
        email: email.toLowerCase(),
        user_topic: userTopic,
        clarifying_answer: clarifyingAnswer || null,
        encouragement_verse_text: encouragementVerseText,
        encouragement_verse_reference: encouragementVerseReference,
        language,
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
