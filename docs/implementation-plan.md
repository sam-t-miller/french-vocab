# Implementation Plan

Build the app in small local slices. Each phase should leave a runnable app that can be tried in a browser. Pause for hands-on review after each meaningful slice and incorporate feedback before expanding the next one. Use a small, reviewed sample dataset early; grow it toward the full 1,000 lemmas as the data model and learning flows settle.

## 1. Foundation

- [x] Convert the starter app to TypeScript and add the Node version, type-check, Vitest, and neverthrow setup.
- [x] Add a small structured logger and shared error types.
- [x] Keep a local development command and add scripts for type-checking and unit tests.
- [x] **Try it:** start the app locally and confirm the shell renders; run the type-check and a tiny example unit test.

## 2. Vocabulary model and sample data

- Define typed lemma, inflected-form, English gloss, writing-prompt, accepted-answer, and source-attribution records.
- Keep an entry distinct by lemma and part of speech. Store forms under the lemma they belong to, including target cues for irregular forms.
- Add runtime validation and lookup helpers that return `Result` values for invalid or missing data.
- Start with a small curated sample that covers function words, gendered nouns, an ambiguous spelling, and irregular forms.
- **Try it:** inspect a sample entry and its forms in a temporary data view; check that invalid sample data produces a useful error.

## 3. Vocabulary list

- Build the phone-first side-by-side list with visible English glosses, noun articles, part-of-speech labels, and the 100/250/500/1000 tier selector.
- Keep the list responsive and usable with the English column on a narrow screen.
- **Try it:** browse sample entries, change tiers, and check that duplicate spellings remain distinguishable.

## 4. Quiz domain and grading rules

- Implement pure functions to build a 10-question session, generate four distinct choices, select weak and new items, normalize typed answers, and grade them.
- Keep question generation deterministic when given a seeded random source so edge cases are reproducible in tests.
- Separate answer normalization from the content's curated accepted-answer list; never use broad fuzzy matching as a substitute for curation.
- Test realistic answers and boundaries: case, whitespace, Unicode accents, harmless outer/final punctuation, internal apostrophes and hyphens, curated alternatives, missing accents, wrong forms, and ambiguous prompts.
- **Try it:** run a local quiz in both directions and inspect each prompt, choices, and grade before polishing the UI.

## 5. Mastery and local persistence

- Track attempts and seen/unseen status per inflected form, a bounded recent-answer window, and lifetime correct/attempt counts; calculate lemma summaries from their forms.
- Blend recent and lifetime error rates equally. Keep weak-item selection scoped to the chosen tier and target 8 weak plus 2 new/unseen items in a 10-question weak quiz. If one group is short, fill from the other group without duplicating a question in the session.
- Save a versioned progress record in localStorage. Validate and migrate it at the storage boundary; return typed errors for unavailable, malformed, or unsupported data. Preserve invalid saved data and require explicit confirmation before reset.
- **Try it:** answer several questions, reload, and confirm progress remains; exercise a deliberately malformed saved record and review the recovery message.

## 6. Quiz experience

- Add mode and direction selection, immediate grading, correction after a miss, and move to the next question.
- Add an end screen with score, missed forms, and a same-tier practice-misses action.
- **Try it:** complete reading and writing sessions, including at least one accepted alternative and one wrong answer.

## 7. Expand content and add PWA behavior

- Prepare and ship the sourced, curated top 100 first, then expand the usable dataset to 250, 500, and 1,000 lemmas. Include useful irregular forms and attribution/share-alike notices as each batch is added.
- Add installable PWA support and offline caching for the app shell and bundled learning data.
- **Try it:** install/open on a phone, browse and quiz offline, and verify progress persists after closing and reopening.

## 8. Local quality gate, then hosting

- Pass TypeScript checking, the unit suite, and the production build; complete the phone-sized and offline smoke checks.
- Host the static build only after this gate, then repeat the core walkthrough on the hosted phone PWA.

## Test emphasis

- Keep most tests as fast unit tests for data validation, lookups, answer normalization/grading, quiz generation, mastery, and storage migrations/errors.
- Add a small number of UI-level tests for the full quiz flow and manual phone checks for install/offline behavior.

See [implementation principles](implementation-principles.md) for logging, error, grading, and review conventions.
