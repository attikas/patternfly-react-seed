import { CsvRow } from './types';

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;

export function getMaxColumns(rows: CsvRow[]): number {
  return Math.max(...rows.map((r) => r.values.length), 0);
}

export function detectNumericColumns(rows: CsvRow[]): boolean[] {
  const maxCols = getMaxColumns(rows);

  return Array.from({ length: maxCols }, (_, colIndex) =>
    rows.every((row) => {
      const value = row.values[colIndex]?.trim();
      if (!value) return true; // empty is OK
      return NUMBER_REGEX.test(value);
    }),
  );
}
