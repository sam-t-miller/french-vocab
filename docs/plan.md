# Build Plan

Keep this plan current as decisions are made. Hosting comes after the local quality gate.

The detailed incremental sequence and coding conventions are in the [implementation plan](implementation-plan.md) and [implementation principles](implementation-principles.md).

## Now

- [x] Record the product brief and engineering preferences.
- [x] Choose lemmas as the vocabulary unit, support both quiz directions, and prioritize missed words.
- [x] Keep concise list/reading glosses separate from precise English-to-French writing prompts; ignore case and minor punctuation in typed answers while preserving accents.
- [x] Add a short sense cue to writing prompts when needed to disambiguate the intended lemma.
- [x] Select Lexique film-dialogue lemma frequency for tier ranking.
- [x] Include all common parts of speech but exclude proper names; keep progress on the phone without backup/export in v1.
- [x] Show part of speech for each entry and a gendered article with nouns.
- [x] Keep English glosses visible by default in the side-by-side vocabulary list.
- [x] Practice irregular verb, noun, and adjective forms; start irregular verbs with common present forms and include both form production and lemma recognition.
- [x] Track mastery per inflected form and summarize it at the lemma level.
- [x] Track seen/unseen status per inflected form, independently from other forms of the same lemma.
- [x] Weight recent and lifetime error rates equally; keep practice mostly focused on weak items, with some new items.
- [x] Keep a rolling recent-answer window plus lifetime correct/attempt counts per form.
- [x] Use 8 weak items and 2 new/unseen items in a 10-question weak-word quiz.
- [x] Fill a short weak/new group from the other group, without duplicate items in one quiz.
- [x] Key vocabulary entries by lemma and part of speech so same-spelling entries remain distinct.
- [x] Use multiple choice for reading recognition and accept curated alternative French writing answers.
- [x] Use four answer choices in multiple-choice quizzes.
- [x] Give immediate feedback and show the correct answer after a miss.
- [x] Move on after showing a missed answer's correction; use misses in later weak-word practice.
- [x] End quizzes with a score, missed items, and an option to practice misses again in the same tier.
- [x] Scope each quiz to one selected tier, focus mostly on weak items with some new ones, and default to 10 questions in one selected mode and direction.
- [x] Use Wiktionary/Kaikki as source material for reviewed English glosses, writing prompts, and answer alternatives; cue irregular forms explicitly.
- [x] Accept CC BY-SA 4.0 for adapted vocabulary data, with attribution and share-alike licensing.
- [x] Use Lexique observed inflections plus conjugaison.app CC0 data for common irregular verb forms.
- [ ] Document the final combined data format and source attribution.
- [x] Choose Node 22.12 or newer and Vitest 5 for the test setup.
- [x] Choose neverthrow for typed synchronous and asynchronous `Result` values.
- [x] Store progress as versioned JSON in localStorage on the phone.
- [x] Preserve malformed or unsupported saved progress and ask before resetting it.
- [x] Keep v1 frontend-only: bundle vocabulary data and use no backend or API.
- [ ] Set up TypeScript, unit testing, and neverthrow.
- [ ] Model vocabulary tiers and write unit tests for tier membership and lookup.
- [ ] Represent irregular verb, noun, and adjective forms under lemmas and include useful forms in practice. Production prompts specify person and tense for verbs; recognition maps inflected forms back to their lemma.

## Core learning loop

- [ ] Build a phone-first side-by-side vocabulary list with tier selection and translation reveal.
- [ ] Implement reading and writing quiz modes.
- [ ] Track per-form attempts and mastery, summarize at the lemma level, and allow quizzes that blend frequently missed and new items.
- [ ] Persist progress locally and handle unavailable or invalid stored data through `Result` values.
- [ ] Add installable PWA support and verify the core flow works offline.

## After checks pass

- [ ] Host the checked static build and use that PWA on the phone.

## Quality bar

- Before hosting, pass the TypeScript check, unit test suite, and production build; smoke-check the core flow and offline behavior.
- Unit-test pure domain logic first: tier selection, quiz answer checking, mastery updates, and missed-word selection.
- Test persistence boundaries and error cases; add a small number of UI/end-to-end tests for the main learning loop.
- Keep the app usable on a phone viewport and make local development the default workflow.

## Decisions to record

- List glosses, writing prompts, irregular-form data, and licensing.
