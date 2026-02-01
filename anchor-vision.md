# Anchor — Product Vision

> *Scripture for your moment*

## Positioning (How We Sell It)

**NOT:** "AI Faith Companion" (religious people are skeptical of AI companionship)

**YES:** "Anchor" — AI-powered scripture for your specific situation

| What we avoid | What we say |
|---------------|-------------|
| Relationship with AI | Tool that serves you |
| Competing with God | Helping you find God's word |
| "AI companion" | "Find the word you need" |

**Core promise:** Tell us what's heavy — we'll show you what God says about it, and the lie you might be believing.

---

## The Soul of the Product

**"A brief sacred moment — not a conversation, a breath."**

- You arrive
- You share what's heavy
- You receive — scripture, a reflection, hope
- You sit with it
- You leave

Like lighting a candle, not starting a therapy session.

---

## What Makes It Different from ChatGPT

| ChatGPT | Anchor |
|---------|--------|
| Infinite conversation | One moment, complete |
| Generic tone | Worship-like atmosphere |
| Transactional | Sacred |
| "Here's a verse about that" | "You are seen. Here's truth for you." |
| Keeps you scrolling | Sends you back to your life |

---

## Core Principles

1. **Come back often, but don't get addicted** — This is not a chatbot to talk to for hours. It's a short meditation.

2. **No cliche, no judgment** — Someone should be able to type "I'm so angry at God right now" or "I feel nothing when I pray" and not get a sanitized churchy response.

3. **Hopeful about God's character** — Every interaction should leave the user more hopeful about God's unfailing love.

4. **Like stepping into church worship** — The whole experience should feel sacred, not transactional.

---

## AI Listening Framework (How Personalization Works)

**Why NOT dropdowns/categories:**
- Real feelings don't fit boxes
- Forces user to classify their pain before receiving help (feels like paperwork)
- Misses nuance ("anxious about job" vs "anxious about health" need different scriptures)
- Feels transactional, not pastoral

**The AI discerns 3 layers from what user types:**

| Layer | What AI Identifies | Example |
|-------|-------------------|---------|
| **Surface emotion** | What are they feeling? | Loneliness, envy, exhaustion |
| **Underlying need** | What do they need to hear? | To feel seen, valued, not forgotten |
| **The lie they might believe** | What false narrative is running? | "God has passed me over" |

**Example in action:**

> User: *"I'm so tired of being single. Everyone around me is getting married and I feel invisible."*

- Surface: Loneliness, envy, exhaustion
- Underlying need: To feel seen, valued, not forgotten by God
- Possible lie: "God has passed me over" / "Something is wrong with me"
- Scripture direction: God's faithfulness, being known and loved, His timing

---

## Edge Cases & Prompt Design

### Opening prompt to user:
*"What's weighing on your heart today?"*

(Gentle, open, invites honesty without forcing structure)

### Edge Case 1: User gives too little info
**Example:** "I'm sad"

**AI behavior:** Ask ONE gentle clarifying question
- "I hear you. Would you like to share what's behind that sadness?"
- Do NOT ask multiple questions
- If user still gives minimal info, work with what you have — better to offer something than interrogate

### Edge Case 2: User gives a LOT of info
**Example:** 3 paragraphs about work, relationships, family, health...

**AI behavior:** 
- Identify the CORE thread (what feels heaviest)
- Acknowledge the fullness: "You're carrying a lot right now."
- Focus response on one thing — don't try to address everything
- Trust that they can come back for other burdens

### Edge Case 3: User shares something urgent/crisis
**Example:** "I don't want to be here anymore"

**AI behavior:**
- Do NOT just give a scripture
- Respond with care and direct to real help (crisis line, encourage talking to someone)
- This needs specific safety handling in the prompt

### Edge Case 4: User gives very brief responses
**Example:** User says "I'm sad" → Claude asks clarifying question → User says "idk just sad"

**AI behavior:**
- Still provide scripture and reflection
- SKIP the lie reveal — not enough context to guess meaningfully
- Still provide closing affirmation

### Edge Case 5: Controversial/sensitive topics
**Example:** "I'm gay and feel like God hates me" or "I had an abortion and feel guilty"

**AI behavior:**
- DO NOT take a theological stance or debate the topic
- DO NOT refuse to engage or give a cold response
- FOCUS on the person's pain: feeling rejected, unloved, ashamed, unseen by God
- Offer scriptures about God's unfailing love, being fully known and still loved
- Make them feel seen and loved — you are an encouragement app, not a theology debate app

### Edge Case 6: Harmful intent (violence, revenge, illegal actions)
**Example:** "I want to hurt someone" / "I want to make a bomb" / "I want revenge"

**The Christian approach:** Don't run away. Don't just refuse. Pursue with truth and love.

**AI behavior — the STAY framework:**

1. **REFUSE** — Don't help with the harmful action (clear boundary)
2. **STAY** — Don't abandon them. Remain present.
3. **SEE** — Look for the heart issue underneath (anger? pain? despair? desire for control?)
4. **CONFRONT** — Name that this path is wrong, clearly but gently
5. **POINT** — Scripture that speaks to the heart issue + God's better way
6. **INVITE** — Call to repentance, offer hope of change

**Example response for "I want to make a bomb":**

> I'm not going to help you hurt people. But I'm also not going to walk away from you.
>
> Whatever is driving this — anger, pain, a feeling that no one sees you — that's what matters. Because this path leads to destruction. Not just for others, but for you.
>
> *"The thief comes only to steal and kill and destroy; I have come that they may have life, and have it abundantly."* — John 10:10
>
> This isn't who you have to be. God has something different for you. What's really going on underneath this?

### Edge Case 7: Active sin (not just pain, but wrong choices)
**Example:** "I'm having an affair" / "I want to lie to get what I want" / "I hate my parents"

**AI behavior:**
- DO NOT just comfort and encourage (this isn't merely pain — there's a choice involved)
- DO NOT condemn, preach, or lecture
- Meet with love FIRST — they're not rejected, God still pursues them
- But also point toward truth and repentance
- Frame guilt as an invitation, not condemnation

**Example response for "I'm having an affair and feel guilty":**

> That guilt you're feeling? It's not there to crush you — it's an invitation. God doesn't want you carrying this. He wants you free.
>
> *"If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness."* — 1 John 1:9
>
> You don't have to stay here. There's a way back.

**The principle:**

| Situation | Response |
|-----------|----------|
| Pain/struggle | Comfort + hope |
| Harmful intent | Refuse action. Stay present. Confront with love. Call to repentance. |
| Active sin with guilt | Love + truth + invitation to repent |
| Active sin seeking validation | Don't validate. Gently confront. Point to God's way. |

---

## Conversation Flow (Final Design)

### Interface Model: Cards, not Chat

| Chat (like ChatGPT) | Cards (like Bible app) |
|---------------------|------------------------|
| Wall of text | One idea per screen |
| Feels like conversation | Feels like experience |
| Easy to skim/miss things | Forces you to be present |
| Desktop-native | Mobile-native |
| "AI tool" feeling | "Sacred moment" feeling |

**Mobile-first. Each screen is a breath.**

**7 screens total:**
1. Welcome + Input (with ambient scripture background)
2. Clarifying Question
3. Loading
4. **Validation** — "I hear you" screen (with feedback rating)
5. **Encouragement** — Promise + purpose screen
6. Lie Reveal (conditional)
7. Closing Affirmation

---

### Screen-by-Screen Flow (MVP)

```
┌─────────────────────────────────────────┐
│  1. WELCOME + INPUT (Combined)          │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │        A N C H O R              │    │
│  │  Find the right scripture for   │    │
│  │     what you're carrying        │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│  ░                                 ░    │
│  ░   "Draw near to God and He     ░    │
│  ░      will draw near to you"    ░    │
│  ░                                 ░    │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│                                         │
│  (Giant verses float/fade in background)│
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  What's weighing on your heart? │    │
│  │                                 │    │
│  │  [Text input area.............. │    │
│  │   ............................] │    │
│  │                                 │    │
│  │           [Begin →]            │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

### Screen 1 Design Spec: Welcome + Input

**Layout (top to bottom):**

1. **Header**
   - "ANCHOR" (logo/wordmark)
   - Tagline: "Find the right scripture for what you're carrying"

2. **Background: Ambient Scripture (the "worship" feel)**
   - Giant scripture fragments floating/fading in the background
   - One verse visible at a time, slowly transitioning
   - Text is large, semi-transparent, blends into background
   - Creates atmosphere of being "surrounded by the Word"

3. **Input Section (bottom, above fold)**
   - Prompt: "What's weighing on your heart?" or "Tell us what's on your mind"
   - Text input area (multi-line, comfortable size for mobile thumbs)
   - "Begin" button

**Ambient Scripture Verses (rotate/fade):**

| Reference | Short Fragment |
|-----------|----------------|
| James 4:8 | "Draw near to God and He will draw near to you" |
| Ephesians 3:12 | "Come boldly into God's presence" |
| Romans 12:2 | "Be transformed by the renewing of your mind" |
| Psalm 46:10 | "Be still and know that I am God" |
| Isaiah 41:10 | "Fear not, for I am with you" |
| Matthew 11:28 | "Come to me, all who are weary" |
| Hebrews 4:16 | "Approach the throne of grace with confidence" |
| Psalm 119:105 | "Your word is a lamp to my feet" |

**Animation behavior:**
- One verse at a time
- Slow fade in (2-3 seconds)
- Hold (5-6 seconds)
- Slow fade out, next verse fades in
- Continuous loop
- Verses are GIANT (fills most of background)
- Low opacity (20-30%) so it doesn't distract from input
- Subtle, ambient — like background music, not foreground

**The feeling we want:**
- Walking into a quiet church during worship
- Being surrounded by truth before you even share
- "I'm in the right place"

---

```
         ↓
┌─────────────────────┐
│  2. CLARIFYING Q    │
│                     │
│  "Even David felt   │
│   that way..."      │
│                     │
│  "What's making it  │
│   heavy right now?" │
│                     │
│  [Text box]         │
│                     │
│     [Next →]        │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  3. LOADING         │
│                     │
│  "Finding the word  │
│   for your moment"  │
│                     │
└─────────────────────┘
         ↓
┌─────────────────────┐       ┌─────────────────────┐
│  4. VALIDATION      │       │  5. ENCOURAGEMENT   │
│                     │       │                     │
│  "Feeling like you  │       │  "Never will I      │
│   don't belong is   │       │   leave you..."     │
│   real pain..."     │       │   — Hebrews 13:5    │
│                     │       │                     │
│  "I am forgotten    │       │  You're not alone   │
│   as though I were  │       │  in that office.    │
│   dead..."          │       │                     │
│   — Psalm 31:12     │       │  You weren't called │
│                     │       │  to fit in. You     │
│  David felt this.   │       │  were called to     │
│                     │       │  carry His presence.│
│  But here's what's  │       │                     │
│  different for you..│       │     [→ swipe]       │
│                     │       │                     │
│  How fitting is     │       └─────────────────────┘
│  this for you?      │
│                     │
│  🙏 🙏 🙏 🙏 🙏      │
│  1  2  3  4  5      │
│                     │
│     [→ swipe]       │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  6. LIE REVEAL      │
│    (conditional)    │
│                     │
│  "Maybe I'm wrong.  │
│   😊 But based on   │
│   what you shared,  │
│   I wonder if this  │
│   lie might be      │
│   sitting in your   │
│   heart:"           │
│                     │
│  "God has forgotten │
│   about me."        │
│                     │
│  "Just something to │
│   think about —     │
│   don't let it stay │
│   unchallenged."    │
│                     │
│     [→ swipe]       │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  7. CLOSING         │
│     AFFIRMATION     │
│                     │
│  "Be sure of this—  │
│   Jesus is with you │
│   till the end.     │
│   He died so He     │
│   could be with     │
│   you forever."     │
│                     │
│     [Done]          │
└─────────────────────┘
```

---

### Screen 4: Validation ("I Hear You")

**Purpose:** Make the user feel SEEN and not alone in their struggle.

**Structure:**
1. Empathetic acknowledgment (1-2 sentences)
2. Scripture that LEGITIMIZES their feeling (often a Psalm of lament, or biblical figure who felt the same)
3. Brief note on who else felt this (David, Elijah, etc.)
4. Bridge phrase that creates forward momentum

**Example:**
> Feeling like you don't belong is real pain. You're not the first to feel like an outsider.
>
> *"I am forgotten as though I were dead; I have become like broken pottery."*
> — Psalm 31:12
>
> David wrote this. A king. A man after God's own heart.
>
> But here's what's different for you...

**Tone:** Warm, validating. No rush to fix. Sit with them first.

**Bridge phrases (vary these, don't repeat):**
- "But here's what's different for you..."
- "And yet, there's something God wants you to know..."
- "Here's the truth that changes everything..."
- "But that's not the end of the story..."

---

### Screen 5: Encouragement (Promise + Purpose)

**Purpose:** Move them from pain to truth. Give them something to carry.

**Structure:**
1. Scripture of PROMISE or CALLING (God's presence, purpose, or power)
2. Personal application (2-3 sentences connecting the verse to their situation)
3. Purpose statement (what they're called to, not just how they feel)

**Example:**
> *"Never will I leave you; never will I forsake you."*
> — Hebrews 13:5
>
> You're not alone in that office. Jesus is with you — today, tomorrow, in every awkward meeting.
>
> You weren't called to fit in. You were called to carry His presence into rooms that need it.

**Tone:** Warm but strong. This is where we lift their eyes.

---

### Scripture Selection: Validation → Encouragement Journey

**The 2 verses create an emotional journey, not just match a topic.**

| Screen | Verse Type | Purpose | Examples |
|--------|-----------|---------|----------|
| **Validation (Screen 4)** | Psalms of lament, struggles of biblical figures | "You're not alone in this feeling" | Psalm 31:12, Psalm 42:11, Psalm 69:1-3, 1 Kings 19:4 (Elijah) |
| **Encouragement (Screen 5)** | Promises, presence, purpose, calling | "Here's the truth to carry forward" | Hebrews 13:5, Isaiah 41:10, 1 Peter 2:9, Jeremiah 29:11 |

**Anti-pattern:** Don't use two "encouragement" verses. The validation verse should sit in the struggle WITH them, not rush past it.

**Vary widely** — draw from the full breadth of the Bible, not just commonly quoted verses. Surprise users with lesser-known passages that speak powerfully.

**No repeats (MVP approach):** Use browser localStorage to track which verses each user has seen. Pass this list to Claude with each request so it avoids repeating verses.

**Example for someone feeling like they don't belong:**
- **Validation:** *"I am forgotten as though I were dead; I have become like broken pottery."* — Psalm 31:12
- **Encouragement:** *"Never will I leave you; never will I forsake you."* — Hebrews 13:5

The first verse says "You're not alone in this pain." The second says "Here's the truth to carry forward."

---

### Closing Affirmation

After the lie reveal (if shown), end with a short, strong affirmation matched to the user's need.

**Note:** Lie reveal is CONDITIONAL — only show it if you have enough context. If user gave very brief responses, skip straight to closing affirmation.

**Examples:**

| User's struggle | Closing affirmation |
|-----------------|---------------------|
| Impatient / God seems silent | "Be sure of this — God is at work. Even now." |
| Feels alone | "Be sure of this — Jesus is with you till the end. He died so He could be with you forever." |
| Painful waiting | "Be sure of this — God has chosen this season to work out something more valuable than you can imagine." |
| Feels defeated | "God's Word is your weapon. Take it. Stand in the victory you were called to." |

**Pattern:**
- Start with "Be sure of this" or similar anchor phrase
- 1-2 sentences max
- Speak directly to their specific situation
- End with strength and hope, not softness

---

### Tone Guidelines

| Quality | How it shows up |
|---------|-----------------|
| **Warmth** | "You are seen. You are loved. Right here." |
| **"Not alone"** | Always remind them others have felt this, God is present |
| **Slow pacing** | Short sentences. Space. Let words breathe. |
| **Morning-appropriate** | Gentle, not intense. A hand on the shoulder, not a lecture. |

---

### The Clarifying Question

**Should feel like:**
- "It sounds like you're carrying [X]. What feels heaviest right now?"
- "That's a lot. When you sit with this, what's the feeling underneath?"
- "I hear you. Is there something specific you're hoping God would say to you?"

**Should NOT feel like:**
- "Can you provide more context?"
- "What category would you put this in?"
- "Tell me more about that."

### When to SKIP the clarifying question

If the user has already shared something deeply specific and emotionally raw, go straight to scripture + reflection.

**Example — ask a question:**
> "I'm feeling anxious lately."

**Example — go straight to response:**
> "I just found out my mom has cancer and I don't know how to pray anymore."

The test: Has the user already shown you their wound? If yes, hold them. Don't ask them to expose more.

---

## Technical Decisions (MVP)

### Data Storage: localStorage

**What we're storing (MVP):**
- List of scripture verses the user has already seen
- List of lies identified in previous sessions (for pattern detection)

**Why localStorage (not cookies, not database):**

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **localStorage** | Simple, 5-10MB storage, no server needed, persists until cleared | Doesn't sync across devices, clears if user clears browser | ✅ Perfect for MVP |
| Cookies | Works across requests | Only 4KB limit, more complex, designed for server communication | ❌ Too limited |
| Database + accounts | Syncs everywhere, never loses data | Requires backend, user auth, hosting costs, complexity | ❌ Overkill for MVP |

**Data structure:**
```javascript
{
  "seenVerses": ["Isaiah 43:1", "Isaiah 49:15", "Psalm 34:17"],
  "liesIdentified": [
    { "date": "2026-01-25", "lie": "God has forgotten me" },
    { "date": "2026-01-28", "lie": "God doesn't hear my prayers" }
  ]
}
```

**What this enables:**
- Avoid repeating scriptures → better variety
- Spot patterns in lies → "User has previously struggled with feeling forgotten by God"
- More personalized lie detection over time

**What we're NOT storing (privacy decision):**
- Raw user input (emotional text is sensitive)
- Full conversation history

**How it's used in the API call:**
```javascript
// Build context for Claude
const seenVerses = JSON.parse(localStorage.getItem('seenVerses') || '[]');
const liesHistory = JSON.parse(localStorage.getItem('liesIdentified') || '[]');

// Include in prompt:
// "User has already seen these verses: [list]. Choose different ones."
// "In previous sessions, user has struggled with these lies: [list]. Look for patterns."
```

**After each session, save:**
```javascript
// Add new verses
seenVerses.push("Isaiah 43:1", "Isaiah 49:15");
localStorage.setItem('seenVerses', JSON.stringify(seenVerses));

// Add identified lie (if one was shown)
liesHistory.push({ date: new Date().toISOString(), lie: "God has forgotten me" });
localStorage.setItem('liesIdentified', JSON.stringify(liesHistory));
```

**Limitations (acceptable for MVP):**
- Clears if user clears browser data
- Doesn't sync across devices (phone vs laptop)
- Resets in incognito/private mode

**Future (V2):** 
- Add user accounts for cross-device sync
- Optional: Store full session history with explicit user consent + "clear my history" button

---

### Analytics & Feedback (MVP Requirements)

**1. Behavioral Analytics**

Track how users interact with the app to understand usage patterns and drop-off points.

**Events to track:**

| Event | What it tells us |
|-------|------------------|
| `session_started` | User opened the app |
| `input_submitted` | User shared their burden |
| `clarifying_answered` | User answered the follow-up question |
| `scripture_viewed` | User reached the scripture screen |
| `reflection_viewed` | User swiped to reflection |
| `lie_viewed` | User swiped to lie reveal |
| `affirmation_viewed` | User completed the full flow |
| `session_completed` | User clicked "Done" |
| `return_visit` | User came back (with timestamp) |

**Key metrics to derive:**

| Metric | How to calculate | Target |
|--------|------------------|--------|
| Completion rate | `session_completed / session_started` | >70% |
| Drop-off points | Where users leave the flow | Identify & fix |
| Return rate (7-day) | Users who come back within 7 days | >30% |
| Sessions per user | Average sessions per unique user | Track trend |

**Implementation:** Use a lightweight analytics tool like:
- Plausible (privacy-friendly, simple)
- Mixpanel (more detailed, free tier)
- PostHog (open source option)
- Or simple custom events to localStorage + periodic review

**2. Scripture Feedback (User Rating)**

Let users rate how fitting the scripture was for their situation.

**Where:** On the Scripture screen (screen 4), after showing the verses

**UI:** 5-point scale with prayer emojis

```
How fitting is this for you?

🙏 🙏 🙏 🙏 🙏
1  2  3  4  5
```

(Tapping a number fills in all prayers up to that point — like a star rating)

**What to store:**

```javascript
{
  "feedbackHistory": [
    {
      "date": "2026-01-25",
      "versesShown": ["Isaiah 43:1", "Isaiah 49:15"],
      "userContext": "feeling forgotten", // short summary, not full text
      "rating": 4 // 1-5 scale
    }
  ]
}
```

**What this enables:**
- See which scripture pairings resonate vs. miss
- Identify patterns in low ratings (certain topics? certain verses?)
- Calculate average "fit score" over time
- Improve prompt engineering based on real feedback

**Key metrics from ratings:**

| Metric | How to calculate | Target |
|--------|------------------|--------|
| Average fit score | Mean of all ratings | >4.0 |
| Low-fit rate | % of ratings 1-2 | <15% |
| High-fit rate | % of ratings 4-5 | >70% |

**Optional prompt after low rating (1-2):**
> "Thanks for letting us know. Would you like to see a different verse?"
> [Yes, show another] [No, continue]

This turns a miss into a recovery opportunity.

---

### API: Claude API (Anthropic)

**Model:** Claude Haiku 3 (cheapest, good enough for MVP)
**Estimated cost:** ~€2-5/month for 100 daily active users

---

### Hosting: TBD

Options to evaluate:
- Vercel (free tier, easy deploy)
- Netlify (free tier)
- Railway (simple, cheap)

---

### Tech Stack: TBD

To be decided when building with Claude Code. Likely:
- Frontend: React or simple HTML/CSS/JS
- API calls: Direct to Claude API
- No backend needed for MVP (all logic in frontend + Claude)
