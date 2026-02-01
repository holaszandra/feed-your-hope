# Claude Code Starter Prompt for Anchor

Copy everything below the line and paste it into Claude Code:

---

## What I'm Building

**Anchor** — A web app that helps Christians find personalized scripture for what they're going through. It's not a chatbot — it's a "sacred moment" experience with a card-based UI.

**Tagline:** "Find the right scripture for what you're carrying"

## The 3 Spec Documents

I have 3 detailed spec documents that describe everything:

1. **anchor-vision.md** — Full product spec with 7-screen flow, edge cases, technical decisions, analytics requirements
2. **anchor-system-prompt.md** — The Claude API system prompt (copy this exactly when calling the API)
3. **anchor-problem-positioning.md** — Problem statement, positioning, success metrics

Please read all 3 documents carefully before starting.

## Tech Stack (MVP)

- **Frontend:** Simple web app, mobile-first responsive design
- **Framework:** Your choice — React, Next.js, or even vanilla HTML/CSS/JS if simpler
- **API:** Claude API (Anthropic) — use Haiku model for cost efficiency
- **Data storage:** localStorage (no backend needed for MVP)
- **Hosting:** Will deploy to Vercel (keep this in mind for structure)
- **Analytics:** Simple event tracking (can start with localStorage, upgrade to Plausible/Mixpanel later)

## The 7-Screen Flow

1. **Welcome + Input** — Logo, tagline, ambient floating scripture in background, text input at bottom
2. **Clarifying Question** — Claude asks one deepening question with biblical context
3. **Loading** — "Finding the word for your moment"
4. **Scripture** — 2 verses + 🙏 rating (1-5 scale)
5. **Reflection** — Short personalized reflection
6. **Lie Reveal** — (conditional) The lie they might be believing
7. **Closing Affirmation** — Strong sendoff: "Be sure of this..."

## Key Features to Implement

### Screen 1: Ambient Scripture Background
- Giant scripture fragments floating/fading in background
- Low opacity (20-30%), one verse at a time
- Slow transitions: fade in (2-3s) → hold (5-6s) → fade out
- 8 verses rotating (list in spec)

### localStorage Data Structure
```javascript
{
  "seenVerses": ["Isaiah 43:1", "Isaiah 49:15"],
  "liesIdentified": [
    { "date": "2026-01-25", "lie": "God has forgotten me" }
  ],
  "feedbackHistory": [
    { "date": "2026-01-25", "versesShown": [...], "rating": 4 }
  ],
  "analytics": [
    { "event": "session_started", "timestamp": "..." }
  ]
}
```

### Claude API Integration
- Use the system prompt from anchor-system-prompt.md exactly
- First API call: Send user's initial input → Get clarifying question
- Second API call: Send user's initial input + their answer → Get scripture, reflection, lie, affirmation
- Include seenVerses and liesIdentified in the prompt so Claude avoids repeats

### Scripture Rating
- 🙏 🙏 🙏 🙏 🙏 (1-5 scale)
- If rating is 1-2, show: "Would you like to see a different verse?" [Yes] [No]

## Design Direction

- **Mobile-first** — Cards should feel good on phone
- **Sacred, not transactional** — Soft colors, breathing room, gentle animations
- **Worship-app inspired** — Think Bible app meditation mode, not ChatGPT
- **Warm color palette** — Consider soft pinks, warm whites, gentle gradients (like the Bible app screenshots I shared)

## What to Build First

Start with a working prototype in this order:

1. **Screen 1 (Welcome + Input)** with ambient scripture animation
2. **Basic card navigation** (swipe or button to move between screens)
3. **Claude API integration** (get the conversation flow working)
4. **All 7 screens** with content from Claude
5. **localStorage** for seenVerses, lies, feedback
6. **Analytics events** tracking
7. **Polish** — transitions, mobile responsiveness, final styling

## Environment Setup

I'll need to add my Claude API key. Please set up the project so the API key can be stored in an environment variable (.env file).

## Let's Start!

Please begin by:
1. Reading the 3 spec documents
2. Proposing the file structure
3. Starting with Screen 1 (Welcome + Input with ambient scripture)

Ask me any clarifying questions before you start coding.
