import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type ReminderSubscriber } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

// Verify cron secret to prevent unauthorized access
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET not configured");
    return false;
  }

  return authHeader === `Bearer ${cronSecret}`;
}

// Generate 2 additional verses for the user's topic using Claude
async function generateAdditionalVerses(
  userTopic: string,
  clarifyingAnswer: string | null,
  originalVerse: string,
  language: string
): Promise<Array<{ text: string; reference: string }>> {
  const anthropic = new Anthropic();

  const languageInstruction =
    language === "hu"
      ? "Respond entirely in Hungarian. Use Hungarian Bible translations (Károli or SZIT) and Hungarian book names."
      : "";

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: `You are Feed Your Hope — a gentle presence that helps people encounter God's love through scripture.

Generate 2 additional Bible verses that would encourage someone dealing with the topic below. These should complement (not repeat) the original verse they received.

${languageInstruction}

Respond with ONLY valid JSON in this format:
{
  "verses": [
    { "text": "Full verse text", "reference": "Book Chapter:Verse" },
    { "text": "Full verse text", "reference": "Book Chapter:Verse" }
  ]
}`,
    messages: [
      {
        role: "user",
        content: `Topic: "${userTopic}"
${clarifyingAnswer ? `Additional context: "${clarifyingAnswer}"` : ""}
Original verse they received: ${originalVerse}

Generate 2 different but thematically related verses of comfort and hope.`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from Claude");
  }

  let jsonString = textContent.text.trim();
  const jsonMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonString = jsonMatch[1].trim();
  }

  const parsed = JSON.parse(jsonString);
  return parsed.verses;
}

// Build the email HTML
function buildEmailHtml(
  originalVerse: { text: string; reference: string },
  additionalVerses: Array<{ text: string; reference: string }>,
  language: string
): string {
  const isHungarian = language === "hu";

  const greeting = isHungarian ? "Jó reggelt!" : "Good morning!";
  const intro = isHungarian
    ? "Itt vannak a mai igéid, hogy megerősítsenek a napodon."
    : "Here are your verses to carry with you today.";
  const yesterdayLabel = isHungarian ? "Tegnapi igéd:" : "Yesterday's verse:";
  const todayLabel = isHungarian ? "Mai új igék:" : "Fresh verses for today:";
  const closingLine = isHungarian
    ? "Menj békével. Isten veled van."
    : "Go in peace. God is with you.";
  const linkText = isHungarian ? "Vissza az imádsághoz" : "Return to prayer";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feed Your Hope</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FDF8F3; font-family: 'Georgia', serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; color: #4A6741; font-size: 24px; font-weight: normal;">
                ${greeting}
              </h1>
              <p style="margin: 10px 0 0; color: #6B6B6B; font-size: 14px;">
                ${intro}
              </p>
            </td>
          </tr>

          <!-- Yesterday's Verse -->
          <tr>
            <td style="padding-bottom: 24px;">
              <p style="margin: 0 0 8px; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                ${yesterdayLabel}
              </p>
              <div style="background: #FDF0E8; border-radius: 12px; padding: 20px; border-left: 3px solid #E8A849;">
                <p style="margin: 0; color: #D2691E; font-size: 16px; line-height: 1.6; font-style: italic;">
                  "${originalVerse.text}"
                </p>
                <p style="margin: 10px 0 0; color: #E8A849; font-size: 13px;">
                  — ${originalVerse.reference}
                </p>
              </div>
            </td>
          </tr>

          <!-- Today's New Verses -->
          <tr>
            <td style="padding-bottom: 24px;">
              <p style="margin: 0 0 8px; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                ${todayLabel}
              </p>

              ${additionalVerses
                .map(
                  (verse) => `
              <div style="background: #EEF4EE; border-radius: 12px; padding: 20px; margin-bottom: 12px; border-left: 3px solid #4A6741;">
                <p style="margin: 0; color: #2D4A3E; font-size: 16px; line-height: 1.6; font-style: italic;">
                  "${verse.text}"
                </p>
                <p style="margin: 10px 0 0; color: #7A9A7A; font-size: 13px;">
                  — ${verse.reference}
                </p>
              </div>
              `
                )
                .join("")}
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td align="center" style="padding: 20px 0 30px;">
              <p style="margin: 0; color: #4A6741; font-size: 16px; font-weight: 500;">
                ${closingLine}
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <a href="https://feedyourhopewithbible.vercel.app"
                 style="display: inline-block; background: #E8956A; color: white; text-decoration: none;
                        padding: 14px 28px; border-radius: 12px; font-size: 14px; font-family: sans-serif;">
                ${linkText}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 20px; border-top: 1px solid #E6C4B8;">
              <p style="margin: 0; color: #6B6B6B; font-size: 11px;">
                Feed Your Hope
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron request
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Find subscribers from ~24 hours ago who haven't been sent yet
    // Window: 23-25 hours ago to account for timing variance
    const now = new Date();
    const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString();
    const twentyFiveHoursAgo = new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString();

    const { data: subscribers, error: fetchError } = await supabase
      .from("reminder_subscribers")
      .select("*")
      .is("email_sent_at", null)
      .gte("subscribed_at", twentyFiveHoursAgo)
      .lte("subscribed_at", twentyThreeHoursAgo)
      .limit(50); // Process in batches

    if (fetchError) {
      console.error("Failed to fetch subscribers:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers to process", count: 0 });
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const subscriber of subscribers as ReminderSubscriber[]) {
      try {
        // Generate additional verses
        const additionalVerses = await generateAdditionalVerses(
          subscriber.user_topic,
          subscriber.clarifying_answer,
          subscriber.encouragement_verse_reference,
          subscriber.language
        );

        // Build email
        const emailHtml = buildEmailHtml(
          {
            text: subscriber.encouragement_verse_text,
            reference: subscriber.encouragement_verse_reference,
          },
          additionalVerses,
          subscriber.language
        );

        // Send email
        const { error: emailError } = await resend.emails.send({
          from: "Feed Your Hope <noreply@feedyourhope.com>",
          to: subscriber.email,
          subject:
            subscriber.language === "hu"
              ? "Mai igéid - Feed Your Hope"
              : "Your morning verses - Feed Your Hope",
          html: emailHtml,
        });

        if (emailError) {
          throw emailError;
        }

        // Mark as sent
        await supabase
          .from("reminder_subscribers")
          .update({ email_sent_at: new Date().toISOString() })
          .eq("id", subscriber.id);

        results.sent++;
      } catch (err) {
        results.failed++;
        results.errors.push(
          `Failed for ${subscriber.email}: ${err instanceof Error ? err.message : "Unknown error"}`
        );
        console.error(`Failed to process subscriber ${subscriber.id}:`, err);
      }
    }

    return NextResponse.json({
      message: "Cron job completed",
      ...results,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
