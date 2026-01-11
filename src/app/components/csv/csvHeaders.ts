import { CsvRow } from './types';

export function resolveHeaders(rows: CsvRow[], headerRow?: number): string[] {
  if (headerRow !== undefined && rows[headerRow]?.values) {
    return rows[headerRow].values.map((v, i) => v?.trim() || `Column ${i + 1}`);
  }

  const maxCols = rows.reduce((m, r) => Math.max(m, r.values?.length ?? 0), 0);

  return Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`);
}
