# AI Usage Log

Please fill this in before submitting. A few honest bullets is all we need.

---

## Tools Used

- Cursor

## What Was AI-Assisted

- Nice-to-have features
- Unit tests setup and test files

## Where You Had to Correct or Override the AI

- Cursor initially used deprecated unit test libraries (`react-test-renderer`, older `act` APIs). I noticed the deprecation warnings and asked Cursor to update the tests to use current approaches (`@testing-library/react`, `renderHook`).

## Any Other Notes

- I worked one feature at a time: implement → review in the app → fix if needed → commit.
- I used a planning-first prompting approach with Cursor so we agreed on scope and order before each feature.
