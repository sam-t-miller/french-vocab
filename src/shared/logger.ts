type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogFields = Readonly<Record<string, string | number | boolean | undefined>>;

const levels: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const minimumLevel: LogLevel = import.meta.env.DEV ? 'debug' : 'info';

function write(level: LogLevel, area: string, event: string, fields: LogFields = {}): void {
  if (levels[level] < levels[minimumLevel]) return;

  const details = Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined));
  const message = `[${area}] ${event}`;

  if (level === 'debug') console.debug(message, details);
  else if (level === 'info') console.info(message, details);
  else if (level === 'warn') console.warn(message, details);
  else console.error(message, details);
}

export const logger = {
  debug: (area: string, event: string, fields?: LogFields) => write('debug', area, event, fields),
  info: (area: string, event: string, fields?: LogFields) => write('info', area, event, fields),
  warn: (area: string, event: string, fields?: LogFields) => write('warn', area, event, fields),
  error: (area: string, event: string, fields?: LogFields) => write('error', area, event, fields),
};
