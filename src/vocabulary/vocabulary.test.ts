import { describe, expect, it } from 'vitest';
import { sampleVocabulary } from './sample-data';
import { findLemma, findLemmaById, validateVocabulary } from './vocabulary';

describe('vocabulary model', () => {
  it('validates the curated sample', () => {
    expect(validateVocabulary(sampleVocabulary).isOk()).toBe(true);
  });

  it('rejects malformed entries with a useful typed error', () => {
    const result = validateVocabulary([{ id: 'chat:noun', lemma: 'chat', partOfSpeech: 'noun' }]);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.code).toBe('DATA_INVALID');
      expect(result.error.message).toContain('English gloss');
      expect(result.error.context).toEqual({ index: 0 });
    }
  });

  it('requires nouns to include gender and an article', () => {
    const result = validateVocabulary([{
      id: 'chat:noun', lemma: 'chat', partOfSpeech: 'noun',
      glosses: [{ text: 'cat' }], writingPrompts: [], forms: [], sources: [],
    }]);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error.message).toBe('Nouns need a gender and article');
  });

  it('keeps same-spelling entries distinct by lemma and part of speech', () => {
    const noun = findLemma(sampleVocabulary, 'livre', 'noun');
    const verb = findLemma(sampleVocabulary, 'livrer', 'verb');

    expect(noun._unsafeUnwrap().id).toBe('livre:noun');
    expect(verb._unsafeUnwrap().id).toBe('livrer:verb');
    expect(findLemmaById(sampleVocabulary, 'livrer:verb')._unsafeUnwrap().lemma).toBe('livrer');
  });

  it('returns a typed error for missing entries', () => {
    const result = findLemma(sampleVocabulary, 'inconnu', 'noun');

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error.code).toBe('DATA_NOT_FOUND');
  });
});
