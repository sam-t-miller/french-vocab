import { describe, expect, it } from 'vitest';
import { appError } from './app-error';

describe('appError', () => {
  it('creates a typed error with optional diagnostic context', () => {
    expect(appError('DATA_NOT_FOUND', 'Vocabulary entry was not found', { lemma: 'aller' })).toEqual({
      code: 'DATA_NOT_FOUND',
      message: 'Vocabulary entry was not found',
      context: { lemma: 'aller' },
    });
  });
});
