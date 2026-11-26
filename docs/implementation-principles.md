# Implementation Principles

## Small, reviewable slices

- Make each phase runnable locally and pause for the user's short hands-on walkthrough before expanding the next phase.
- Prefer plain domain functions and data over framework-specific logic; keep quiz rules testable without mounting Svelte components.
- Use the small sample dataset to validate screens and rules before investing in all 1,000 curated entries.

## Errors and `Result`

- Use neverthrow `Result`/`ResultAsync` for expected failures at data, parsing, storage, and quiz boundaries.
- Define stable error codes and useful context; show a calm, actionable message in the UI while retaining diagnostic detail in local logs.
- Validate data loaded from JSON and localStorage at runtime. Treat saved state and bundled source files as inputs that can be malformed.
- Never overwrite malformed or unsupported saved progress automatically; preserve it and require explicit confirmation before resetting.
- Reserve thrown exceptions for unexpected programmer/runtime faults. Catch them at a clear app boundary, log them, and show a recoverable error state; don't use throws as routine branching.
- Keep domain grading total: every supported answer produces a grade, rather than throwing for malformed user input.

## Logging

- Use one small logger with levels (`debug`, `info`, `warn`, `error`) and consistent fields such as area, event, error code, and relevant IDs.
- Log meaningful lifecycle events: app start, data validation/load, quiz start/finish, answer grade, progress load/save/migration, and failures. Log answers as correct/incorrect and identify the form; do not dump full progress records or raw typed text by default.
- Make verbose diagnostic logs available during local development. Keep production logs local to the browser; never send them to a service in this frontend-only app.
- Use the browser console for diagnostics; v1 does not need an in-app log viewer.
- Avoid duplicate logs: the layer that handles an error logs it once with context, then returns the typed error to callers.

## Quiz answer fairness

- Grade against the prompt's intended target and an explicit curated set of accepted answers. A prompt should provide enough context to identify the intended lemma, sense, person, tense, number, or gender.
- Normalize Unicode to NFC; ignore case, leading/trailing whitespace, repeated spaces, and harmless punctuation around the answer. Keep accents significant. Keep internal apostrophes and hyphens meaningful; normalize common curly/straight apostrophe variants.
- Do not silently accept missing accents, arbitrary synonyms, partial answers, or fuzzy typos. Add legitimate variants explicitly as accepted answers. If a question can reasonably have multiple answers, fix the prompt or curate the alternatives before shipping it.
- After the agreed normalization, require an exact match to the canonical answer or a curated alternative; do not apply typo tolerance.
- For a conjugation prompt that specifies subject/person, require the answer form stated by the prompt (for example, `nous sommes`); don't silently accept another person or an unprompted infinitive.
- Make four-choice questions have exactly one correct choice after considering curated alternatives. Do not use another valid answer as a distractor. For same-spelling entries, include enough part-of-speech or sense context to make the choice fair.
- Record a wrong answer as wrong even when the correction is shown; don't count an immediate retry as a separate exposure unless retry behavior is deliberately added later.

## Tests and review

- Write unit tests alongside each domain slice, especially for boundaries and plausible learner responses, not only happy paths.
- Keep answer-checker tests table-driven and explicit about why each response is accepted or rejected.
- After each phase, present a local walkthrough with what to click/type and the behavior to verify. Incorporate feedback before expanding scope.
- Before hosting, use the documented quality gate: type-check, unit suite, production build, and offline/mobile smoke checks.
