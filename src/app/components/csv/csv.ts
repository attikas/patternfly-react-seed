import Papa from 'papaparse';

export const ROW_INDEX = Symbol('rowIndex');

export type CsvRow = {
  [key: string]: string;
  [ROW_INDEX]: number;
};

export function parseCsv(file: File, onComplete: (rows: CsvRow[]) => void) {
  Papa.parse<string[]>(file, {
    worker: true,
    skipEmptyLines: true,
    complete: (res) => {
      const [headers, ...dataRows] = res.data;

      const rows: CsvRow[] = dataRows.map((values, rowIndex) => {
        const row = {} as CsvRow;

        headers.forEach((header, colIndex) => {
          row[header] = values[colIndex] ?? '';
        });

        row[ROW_INDEX] = rowIndex;
        return row;
      });

      onComplete(rows);
    },
  });
}

export function resolveHeaders(rows: CsvRow[], headerRow?: number): string[] {
  // If explicit header row exists → use it
  if (headerRow !== undefined && rows[headerRow] && Array.isArray(rows[headerRow].values)) {
    return rows[headerRow].values.map((v, i) => v?.trim() || `Column ${i + 1}`);
  }

  // Otherwise generate default headers
  const maxCols = rows.reduce((max, r) => Math.max(max, r.values?.length ?? 0), 0);

  return Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`);
}
