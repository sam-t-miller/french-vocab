export type ErrorCode =
  | 'DATA_INVALID'
  | 'DATA_NOT_FOUND'
  | 'STORAGE_UNAVAILABLE'
  | 'STORAGE_INVALID'
  | 'STORAGE_UNSUPPORTED'
  | 'UNEXPECTED';

export interface AppError {
  readonly code: ErrorCode;
  readonly message: string;
  readonly context?: Readonly<Record<string, string | number | boolean>>;
}

export function appError(
  code: ErrorCode,
  message: string,
  context?: AppError['context'],
): AppError {
  return { code, message, ...(context ? { context } : {}) };
}
