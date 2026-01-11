import Papa from 'papaparse';
import { CsvParseResult, CsvRow, ROW_INDEX } from './types';
import { CSV_LIMITS } from './csvLimits';

export function parseCsv(
  file: File,
  onComplete: (result: CsvParseResult) => void,
  onError: (message: string) => void,
): void {
  /* ================= FILE SIZE ================= */
  if (file.size > CSV_LIMITS.MAX_FILE_SIZE_BYTES) {
    onError(`File too large. Maximum allowed size is ${CSV_LIMITS.MAX_FILE_SIZE_BYTES / 1024} KB`);
    return;
  }

  Papa.parse<string[]>(file, {
    worker: true,
    skipEmptyLines: true,

    complete: (res) => {
      const rawRows = res.data.filter(Array.isArray);

      /* ================= ROW COUNT ================= */
      if (rawRows.length > CSV_LIMITS.MAX_ROWS) {
        onError(`Too many rows. Maximum allowed is ${CSV_LIMITS.MAX_ROWS}`);
        return;
      }

      const columnCount = Math.max(0, ...rawRows.map((r) => r.length));

      /* ================= COLUMN COUNT ================= */
      if (columnCount > CSV_LIMITS.MAX_COLUMNS) {
        onError(`Too many columns. Maximum allowed is ${CSV_LIMITS.MAX_COLUMNS}`);
        return;
      }

      const headers = resolveHeaders(rawRows, columnCount);
      const rows = mapRows(rawRows, columnCount);

      onComplete({ headers, rows });
    },

    error: (err) => {
      onError(err.message);
    },
  });
}

/* ================= Helpers ================= */

function resolveHeaders(rawRows: readonly string[][], columnCount: number): readonly string[] {
  const firstRow = rawRows[0] ?? [];
  const hasHeader = firstRow.some((c) => c?.trim());

  return hasHeader
    ? firstRow.map((c, i) => c?.trim() || `Column ${i + 1}`)
    : Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`);
}

function mapRows(rawRows: readonly string[][], columnCount: number): readonly CsvRow[] {
  const skipHeader = rawRows[0]?.some((c) => c?.trim());
  const dataRows = skipHeader ? rawRows.slice(1) : rawRows;

  return dataRows.map((values, rowIndex) => ({
    id: crypto.randomUUID(),
    values: normalize(values, columnCount),
    [ROW_INDEX]: rowIndex,
  }));
}

function normalize(values: readonly string[], length: number): readonly string[] {
  return Array.from({ length }, (_, i) => values[i] ?? '');
}
