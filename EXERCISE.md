# Nutrition Tracker: Coding Exercise

## Overview

Welcome! This is a take-home coding exercise for a mobile developer role at Herbalife.

You'll be working inside a partially-built React Native app: a simple nutrition tracker. The project already has navigation, a food database, types, a theme, and a working search screen. Your job is to bring the app to life by implementing the core logging and summary features.

**Time estimate:** 90 minutes to 3 hours, depending on how deep you go. Scope intentionally; it's better to deliver a polished core than an incomplete kitchen sink.

---

## What We're Looking For

- **Code quality and architecture:** How do you structure state, components, and logic? We want to see your judgment, not just something that works.
- **React Native fluency:** Hooks, Context, performance patterns, list handling.
- **Problem-solving:** There are deliberate gaps in the starter. How you fill them tells us a lot.
- **Communication through code:** Clear naming, purposeful comments where needed, thoughtful component decomposition.
- **Engineering hygiene:** Small, coherent commits with messages that explain the why; tests where they earn their keep; a clean `lint` and `typecheck`. The scripts below are already set up for you.
- **Ownership:** Treat this as your codebase, not a sealed test. Lean on the existing patterns and conventions where they serve you, and refactor the ones that get in your way. When you change direction, a sentence on the why is all we ask.

We will review this in a follow-up session and talk through your decisions: why you built things the way you did, what you'd do differently with more time, and where you'd take the app next.

---

## Setup

### Prerequisites

- Node.js 18+
- The [Expo Go](https://expo.dev/client) app on a physical iOS or Android device, **or** a configured iOS Simulator (Xcode) or Android Emulator (Android Studio)

### Install and run

```bash
npm install
npx expo start
```

From the Expo CLI menu:

- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with Expo Go on a physical device (iOS or Android)

Any of these is fine. If you have access to multiple platforms, great, but you're not required to test on all of them.

### Quality checks

This project comes set up with ESLint, Prettier, and TypeScript. Use them as you work:

```bash
npm run lint        # ESLint (expo config)
npm run typecheck   # tsc --noEmit
npm run format      # Prettier write (format:check to verify only)
npm run verify      # lint + typecheck + format:check, all at once
```

Please keep `lint` and `typecheck` green in what you submit. Running `npm run verify` before you submit is a quick way to confirm. If you deliberately disable a rule, that is fine, just say why (a comment or a commit message).

---

## Project Structure

```
src/
  data/
    foods.ts          ← food database + search helper (pre-built, read-only)
  types/
    index.ts          ← TypeScript types: Food, LogEntry, DailyLog, etc.
  theme/
    index.ts          ← colors, spacing, typography constants
  components/
    FoodItem.tsx      ← renders a single food row with macros (pre-built)
  screens/
    FoodSearchScreen.tsx  ← search works; "Add to Log" fires an Alert (your entry point)
    DailyLogScreen.tsx    ← stub, implement this
    SummaryScreen.tsx     ← stub with placeholder zeros, implement this
  navigation/
    AppNavigator.tsx  ← bottom tab navigator (pre-built)
  hooks/
    (empty, add yours here)
```

---

## The Exercise

See `TODO.md` for a prioritized list of features. The short version:

1. **Connect search to the log:** when the user taps `+` on a food, it should be added to today's log.
2. **Build the Daily Log screen:** show logged entries grouped by meal (Breakfast, Lunch, Dinner, Snack). Allow removing entries.
3. **Build the Summary screen:** show calorie and macro totals vs. daily goals. Make the progress indicators reflect real data.

Everything beyond that is up to you. See `TODO.md` for ideas.

---

## Ground Rules

- Use any libraries you find appropriate. Just add them with `npm install` and explain the choice briefly in a commit message or comment.
- The food database and types are pre-built and meant to be used as-is, but you can extend them if needed.
- Ask questions if something is unclear. Reach out via the recruiter.

---

## Notes on the Starter Code

A few things are deliberately incomplete or left as stubs:

- `FoodSearchScreen.tsx`: the `handleAddToLog` callback fires an `Alert` instead of updating state. This is your starting point.
- `DailyLogScreen.tsx`: renders an empty state with placeholder text.
- `SummaryScreen.tsx`: renders zero values for all macros.

The `src/hooks/` directory is empty. You'll likely want to add at least one custom hook here.

---

## Make It Your Own

We built this starter to give you a solid place to begin, but it is not sacred. You are welcome to refactor it: restructure a component, change how something is organized, adjust a pattern, or improve the tooling, wherever you genuinely think it makes the code better. The existing structure and conventions are there to build on, so work with them where they serve you and change them where they do not. We are not looking for change for its own sake, and we have not hidden a checklist of things to fix. What we want to see is your judgment about what is worth changing and what is fine as it is.

Two things help us read your intent:

- Make the improvements you believe in, and keep them in their own commits where it is practical, so the refactor is easy to follow.
- Where you chose not to change something, or where you would go further with more time, a few lines (in a commit message, the README, or a short `NOTES.md`) tell us as much as the code does.

---

## Submitting Your Work

1. Work in this repo as-is (the initial commit is already here).
2. Commit your work regularly. We want to see your commit history, not just the end state.
3. Before submitting, check off the items you completed in `TODO.md`.
4. We recommend running `npm run verify` (lint, typecheck, formatting) and getting it green before you submit.
5. If you used any AI tools during the exercise, fill in `AI-USAGE.md` (see the section below).
6. When finished, zip the entire project folder (including the `.git` directory) and name the file with your name:

```bash
# From the parent directory (excludes node_modules and Expo cache, keeps .git):
zip -r firstname-lastname-herbalife-exercise.zip herbalife-mobile-developer-coding-exercise \
  -x '*/node_modules/*' '*/.expo/*'
```

7. Upload the zip file back to the same OneDrive folder where you downloaded this exercise.

**Commit message style:** write commit messages that explain the _why_, not just the _what_. This is part of the exercise.

---

## AI Usage

Using AI tools is entirely your call. Use whatever you normally use. If you do, fill in the `AI-USAGE.md` file that's already in the repo before submitting:

- What tool(s) you used and how
- Which parts of your submission were AI-assisted
- At least one example where you had to correct or override the output

Come ready to discuss your AI setup and workflow during the code review session.

**Commit message convention for AI-assisted commits:**

```
feat: implement food log context

Co-authored-by: Claude <noreply@anthropic.com>
```

or note it in the message body: `(AI-assisted, reviewed and validated)`
