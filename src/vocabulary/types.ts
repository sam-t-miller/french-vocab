export type PartOfSpeech =
  | 'adjective'
  | 'adverb'
  | 'conjunction'
  | 'determiner'
  | 'interjection'
  | 'noun'
  | 'preposition'
  | 'pronoun'
  | 'verb';

export type GrammaticalGender = 'feminine' | 'masculine';

export interface EnglishGloss {
  readonly text: string;
  readonly senseCue?: string;
}

export interface AcceptedAnswer {
  readonly text: string;
  readonly note?: string;
}

export interface WritingPrompt {
  readonly english: string;
  readonly acceptedAnswers: readonly AcceptedAnswer[];
}

export interface SourceAttribution {
  readonly name: string;
  readonly url: string;
  readonly license: string;
  readonly note?: string;
}

export interface InflectedForm {
  readonly form: string;
  readonly grammaticalCue: string;
  readonly writingPrompt?: WritingPrompt;
}

export interface VocabularyLemma {
  /** Stable key derived from lemma and part of speech; same spellings may coexist. */
  readonly id: string;
  readonly lemma: string;
  readonly partOfSpeech: PartOfSpeech;
  readonly gender?: GrammaticalGender;
  readonly article?: string;
  readonly glosses: readonly EnglishGloss[];
  readonly writingPrompts: readonly WritingPrompt[];
  readonly forms: readonly InflectedForm[];
  readonly sources: readonly SourceAttribution[];
}
