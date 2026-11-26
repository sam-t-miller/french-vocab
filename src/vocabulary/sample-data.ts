import type { VocabularyLemma } from './types';

/**
 * Small domain fixture for validating the model before importing a sourced
 * frequency-ranked vocabulary release. Entries are hand-authored examples.
 */
export const sampleVocabulary: readonly VocabularyLemma[] = [
  {
    id: 'être:verb',
    lemma: 'être',
    partOfSpeech: 'verb',
    glosses: [{ text: 'to be' }],
    writingPrompts: [{ english: 'to be', acceptedAnswers: [{ text: 'être' }] }],
    forms: [
      {
        form: 'suis',
        grammaticalCue: 'present, first-person singular',
        writingPrompt: {
          english: 'I am',
          acceptedAnswers: [{ text: 'je suis' }],
        },
      },
      {
        form: 'sommes',
        grammaticalCue: 'present, first-person plural',
        writingPrompt: {
          english: 'we are',
          acceptedAnswers: [{ text: 'nous sommes' }],
        },
      },
    ],
    sources: [],
  },
  {
    id: 'livre:noun',
    lemma: 'livre',
    partOfSpeech: 'noun',
    gender: 'masculine',
    article: 'le',
    glosses: [{ text: 'book' }],
    writingPrompts: [{ english: 'book', acceptedAnswers: [{ text: 'livre' }] }],
    forms: [
      {
        form: 'livres',
        grammaticalCue: 'plural',
        writingPrompt: {
          english: 'books',
          acceptedAnswers: [{ text: 'livres' }],
        },
      },
    ],
    sources: [],
  },
  {
    id: 'livrer:verb',
    lemma: 'livrer',
    partOfSpeech: 'verb',
    glosses: [{ text: 'to deliver' }],
    writingPrompts: [{ english: 'to deliver', acceptedAnswers: [{ text: 'livrer' }] }],
    forms: [
      {
        form: 'livre',
        grammaticalCue: 'present, first-person singular or third-person singular',
      },
    ],
    sources: [],
  },
  {
    id: 'beau:adjective',
    lemma: 'beau',
    partOfSpeech: 'adjective',
    glosses: [{ text: 'beautiful', senseCue: 'masculine singular' }],
    writingPrompts: [{ english: 'beautiful (masculine singular)', acceptedAnswers: [{ text: 'beau' }] }],
    forms: [
      {
        form: 'belle',
        grammaticalCue: 'feminine singular',
        writingPrompt: {
          english: 'beautiful (feminine singular)',
          acceptedAnswers: [{ text: 'belle' }],
        },
      },
      {
        form: 'beaux',
        grammaticalCue: 'masculine plural',
        writingPrompt: {
          english: 'beautiful (masculine plural)',
          acceptedAnswers: [{ text: 'beaux' }],
        },
      },
    ],
    sources: [],
  },
  {
    id: 'et:conjunction',
    lemma: 'et',
    partOfSpeech: 'conjunction',
    glosses: [{ text: 'and' }],
    writingPrompts: [{ english: 'and', acceptedAnswers: [{ text: 'et' }] }],
    forms: [],
    sources: [],
  },
];
