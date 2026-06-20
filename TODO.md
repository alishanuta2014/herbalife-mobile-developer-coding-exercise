# TODO

Features are grouped by priority. **Must** items are the core of the exercise. **Should** and **Nice-to-have** are for candidates who move quickly and want to show more depth.

You don't need to complete everything. Scope thoughtfully: a polished Must list is better than a rushed Nice-to-have.

---

## Must Have

- [ ] **Log a food**: tapping `+` on a food in the Search screen adds it to today's log (default: 1 serving, Breakfast slot)
- [ ] **Daily Log screen**: display today's logged entries, grouped by meal slot (Breakfast / Lunch / Dinner / Snack)
- [ ] **Remove an entry**: allow the user to delete a logged entry
- [ ] **Summary screen**: show real calorie and macro (protein, carbs, fat) totals computed from today's log
- [ ] **Progress toward goals**: the pre-built goal defaults are in `SummaryScreen.tsx`; wire the progress bars to real data

---

## Should Have

- [ ] **Cross-platform validation**: verify the app renders correctly on both iOS and Android (Simulator/Emulator or physical device). Note any platform-specific adjustments you made and why.
- [ ] **Serving size picker**: let the user choose how many servings when adding a food (e.g., 0.5, 1, 1.5, 2)
- [ ] **Meal slot picker**: let the user choose which meal slot to log to (Breakfast / Lunch / Dinner / Snack)
- [ ] **Persist the log**: use `AsyncStorage` (or similar) so the log survives app restarts
- [ ] **Remaining macros**: show how much is left before hitting each goal, not just how much has been consumed
- [ ] **Per-meal-slot totals**: on the Log screen, show a calorie sub-total per meal slot
- [ ] **Unit tests**: add at least one test for a custom hook or utility function (e.g., the totals calculation). Show us how you think about testability.

---

## Nice to Have

- [ ] **Daily goal editing**: let the user change their calorie and macro targets
- [ ] **Multi-day history**: keep logs for previous days and let the user browse them
- [ ] **Macro split visualization**: a pie chart, donut, or stacked bar showing the protein/carbs/fat ratio
- [ ] **Custom food entry**: let the user add a food that isn't in the database
- [ ] **Animations**: subtle animations when adding/removing log entries

---

## Notes

- Start with `FoodSearchScreen.tsx`: the `handleAddToLog` callback is your entry point into state management.
- You'll likely want a custom hook (or Context + hooks) to manage the log. The `src/hooks/` directory is ready for you.
- The `Food`, `LogEntry`, `DailyLog`, `MealSlot`, and `NutritionTotals` types in `src/types/index.ts` are ready to use.

## Before You Submit

- Check off the items you completed in the lists above.
- Run `npm run verify` (lint, typecheck, and formatting). We recommend getting it green before you send your work back. See `EXERCISE.md` for the full submission steps.
