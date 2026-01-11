import Papa from 'papaparse';
import { CsvParseResult, CsvRow, ROW_INDEX } from './types';

export function parseCsv(
  file: File,
  onComplete: (result: CsvParseResult) => void,
  onError?: (err: Error) => void,
): void {
  Papa.parse<string[]>(file, {
    worker: true,
    skipEmptyLines: true,

    complete: (res) => {
      if (!Array.isArray(res.data) || res.data.length === 0) {
        onError?.(new Error('Empty or invalid CSV'));
        return;
      }

      const rawRows = res.data.filter(Array.isArray);
      const columnCount = Math.max(0, ...rawRows.map((r) => r.length));

      const headers = resolveHeaders(rawRows, columnCount);
      const rows = mapRows(rawRows, headers.length);

      onComplete({ headers, rows });
    },

    error: (err) => onError?.(err),
  });
}

function resolveHeaders(rawRows: readonly string[][], columnCount: number): readonly string[] {
  const firstRow = rawRows[0];

  const looksLikeHeader = firstRow.some((c) => c && c.trim().length > 0);

  if (looksLikeHeader) {
    return firstRow.map((c, i) => c?.trim() || `Column ${i + 1}`);
  }

  return Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`);
}

function mapRows(rawRows: readonly string[][], columnCount: number): readonly CsvRow[] {
  const skipHeader = hasHeaderRow(rawRows);
  const startIndex = skipHeader ? 1 : 0;

  return rawRows.slice(startIndex).map((values, rowIndex) => ({
    id: crypto.randomUUID(),
    values: normalize(values, columnCount),
    [ROW_INDEX]: rowIndex,
  }));
}

function normalize(values: readonly string[], length: number): readonly string[] {
  return Array.from({ length }, (_, i) => values[i] ?? '');
}

function hasHeaderRow(rawRows: readonly string[][]): boolean {
  return rawRows[0].some((c) => c && c.trim().length > 0);
}
