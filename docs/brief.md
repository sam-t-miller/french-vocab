# French Vocabulary PWA — Brief

## Goal

Build a mobile-first Svelte PWA for learning French vocabulary. Develop on a laptop; use the hosted PWA on the phone after the app passes its checks.

## Learning features

- A ranked list of the 1,000 most common French lemmas (dictionary headwords), organized into cumulative tiers: top 100, 250, 500, and 1,000.
- Include common words from all parts of speech, including function words; exclude proper names.
- Show a part-of-speech label for each entry and include the gendered article with nouns (for example, *le livre*).
- Rank tiers by French film-dialogue frequency.
- Include irregular verb, noun, and adjective forms under their lemma and test those forms too. Start with common irregular present-tense verb forms: production prompts supply person and tense (for example, “we are” → *nous sommes*), and recognition quizzes ask which lemma a form belongs to. Include useful irregular plurals and gender forms such as *cheval → chevaux* and *beau → belle*.
- Side-by-side French and English lists for first exposure and review, with the English gloss visible by default.
- Keep a concise English gloss for lists and French-to-English reading quizzes, plus a more precise English prompt for English-to-French writing quizzes. Add a short cue when needed to disambiguate the intended lemma or sense.
- Curate the English gloss, writing prompt, and accepted answers using open dictionary material. Give explicit target cues for irregular forms, such as number and gender.
- Reading quizzes use four-option multiple choice for recognition; writing quizzes test recall. Both support French-to-English and English-to-French directions.
- Show whether each answer is correct immediately and reveal the correct answer after a miss.
- After showing a correction for a miss, continue to the next question; missed items can return in later weak-word practice.
- End each quiz with the score, missed words/forms, and a one-tap option to practice misses again in the same tier.
- Each quiz run targets one selected cumulative tier, focuses mostly on weak items within that tier with some new items, uses one chosen mode and direction, and defaults to 10 questions.
- Treat identical surface forms that map to different lemmas or parts of speech as separate entries (for example, noun *livre* versus the verb form *livre* from *livrer*), keyed by lemma and part of speech.
- Typed answers ignore capitalization and minor punctuation, while preserving accents. Accept curated alternate French answers when more than one answer is valid.
- After normalization, require an exact match to the canonical answer or a curated alternative; do not guess typos.
- Track quiz outcomes and seen/unseen status per inflected form, and summarize mastery at the lemma level. Keep a rolling window of recent answers plus lifetime correct/attempt counts; weight recent and lifetime error rates equally when prioritizing practice. A 10-question weak-word quiz contains 8 weak items and 2 new/unseen items.

## Product and engineering preferences

- Svelte with TypeScript; design for phone screens first.
- Frontend-only static app: bundle vocabulary data with the app, use no backend or API, and keep progress in versioned localStorage on this phone.
- If saved progress is malformed or has an unsupported version, preserve it and ask before resetting it.
- Make the core learning flow usable offline as a PWA.
- Use explicit `Result`-style return values for expected errors in domain, storage, and import/export code. Avoid using exceptions as routine control flow.
- Build a solid test suite, prioritizing fast unit tests for vocabulary, quiz, and mastery logic. Add UI or end-to-end coverage where it protects important user flows.
- Use Node 22.12 or newer with Vitest 5 for tests; the app and build tooling remain Vite-based.
- Use neverthrow for typed synchronous and asynchronous `Result` values.

## Not in scope yet

- Hosting before the app passes its quality checks, or release automation.
- Accounts or cloud synchronization.
- Backend services or runtime APIs; host the built frontend as static files after checks pass.
- Progress export/import or backup in v1; progress stays on the phone.
- Audio, pronunciation scoring, or social features.

## Source research

- **Frequency source selected:** Lexique 4.10's film-dialogue lemma frequencies will define the tiers. The database also provides book-corpus counts and is licensed CC BY-SA 4.0.
- **English gloss source selected:** use Wiktionary data extracted by Kaikki.org as source material, then curate the concise gloss, precise prompt, and accepted alternatives for the app. Wiktionary-derived data is CC BY-SA 4.0.
- **Inflection sources selected:** use Lexique for observed inflected forms and lemma links, with conjugaison.app's CC0 data to supplement common irregular verb forms.
- **License decision:** CC BY-SA 4.0 is acceptable for adapted vocabulary data; include attribution and preserve share-alike licensing.
- **Progress storage selected:** versioned JSON in localStorage; progress stays on this phone in v1.
- Keep source attribution with the vocabulary data and preserve CC BY-SA terms for adapted material.
