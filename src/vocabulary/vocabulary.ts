import { err, ok, type Result } from 'neverthrow';
import { appError, type AppError } from '../shared/app-error';
import type { VocabularyLemma } from './types';

const partsOfSpeech = new Set([
  'adjective', 'adverb', 'conjunction', 'determiner', 'interjection',
  'noun', 'preposition', 'pronoun', 'verb',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function invalid(message: string, index?: number): Result<never, AppError> {
  return err(appError('DATA_INVALID', message, index === undefined ? undefined : { index }));
}

/** Validate untrusted JSON at the vocabulary boundary before it reaches the UI. */
export function validateVocabulary(input: unknown): Result<readonly VocabularyLemma[], AppError> {
  if (!Array.isArray(input) || input.length === 0) {
    return invalid('Vocabulary data must be a non-empty array');
  }

  const ids = new Set<string>();
  for (const [index, value] of input.entries()) {
    if (!isRecord(value)) return invalid('Each vocabulary entry must be an object', index);
    if (!isNonEmptyString(value.id) || !isNonEmptyString(value.lemma)) {
      return invalid('Each entry needs a non-empty id and lemma', index);
    }
    if (!partsOfSpeech.has(String(value.partOfSpeech))) {
      return invalid('Entry has an unsupported part of speech', index);
    }
    if (ids.has(value.id)) return invalid(`Duplicate vocabulary id: ${value.id}`, index);
    ids.add(value.id);

    if (!Array.isArray(value.glosses) || value.glosses.length === 0 ||
        !value.glosses.every((gloss) => isRecord(gloss) && isNonEmptyString(gloss.text))) {
      return invalid('Each entry needs at least one non-empty English gloss', index);
    }
    if (!Array.isArray(value.writingPrompts) || !value.writingPrompts.every(isValidWritingPrompt)) {
      return invalid('Entry has an invalid writing prompt', index);
    }
    if (!Array.isArray(value.forms) || !value.forms.every(isValidForm)) {
      return invalid('Entry has an invalid inflected form', index);
    }
    if (!Array.isArray(value.sources) || !value.sources.every(isValidSource)) {
      return invalid('Entry has invalid source attribution', index);
    }
    if (value.partOfSpeech === 'noun' &&
        (!['feminine', 'masculine'].includes(String(value.gender)) || !isNonEmptyString(value.article))) {
      return invalid('Nouns need a gender and article', index);
    }
  }

  return ok(input as readonly VocabularyLemma[]);
}

function isValidWritingPrompt(value: unknown): boolean {
  return isRecord(value) && isNonEmptyString(value.english) &&
    Array.isArray(value.acceptedAnswers) && value.acceptedAnswers.length > 0 &&
    value.acceptedAnswers.every((answer) => isRecord(answer) && isNonEmptyString(answer.text));
}

function isValidForm(value: unknown): boolean {
  return isRecord(value) && isNonEmptyString(value.form) &&
    isNonEmptyString(value.grammaticalCue) &&
    (value.writingPrompt === undefined || isValidWritingPrompt(value.writingPrompt));
}

function isValidSource(value: unknown): boolean {
  return isRecord(value) && isNonEmptyString(value.name) &&
    isNonEmptyString(value.url) && isNonEmptyString(value.license);
}

export function findLemma(
  vocabulary: readonly VocabularyLemma[],
  lemma: string,
  partOfSpeech: VocabularyLemma['partOfSpeech'],
): Result<VocabularyLemma, AppError> {
  const match = vocabulary.find((entry) =>
    entry.lemma === lemma && entry.partOfSpeech === partOfSpeech,
  );
  return match
    ? ok(match)
    : err(appError('DATA_NOT_FOUND', 'Vocabulary lemma was not found', { lemma, partOfSpeech }));
}

export function findLemmaById(
  vocabulary: readonly VocabularyLemma[],
  id: string,
): Result<VocabularyLemma, AppError> {
  const match = vocabulary.find((entry) => entry.id === id);
  return match
    ? ok(match)
    : err(appError('DATA_NOT_FOUND', 'Vocabulary entry was not found', { id }));
}
