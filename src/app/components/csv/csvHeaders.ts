import { CsvRow } from './types';

export function resolveHeaders(rows?: CsvRow[]): string[] {
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }

  const maxCols = rows.reduce((max, r) => Math.max(max, r.values?.length ?? 0), 0);

  return Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`);
}
