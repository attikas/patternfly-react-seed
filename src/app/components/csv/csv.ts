import Papa from 'papaparse';

export type CsvRow = {
  id: number;
  values: string[];
};

export function parseCsv(file: File, onComplete: (rows: CsvRow[]) => void) {
  Papa.parse<string[]>(file, {
    worker: true,
    skipEmptyLines: true,
    complete: (res) =>
      onComplete(
        res.data.map((values, i) => ({
          id: i,
          values,
        })),
      ),
  });
}
