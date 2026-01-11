// types.ts
export type CsvRow = Record<string, string>;

export type CellError = {
  row: number;
  column: string;
  message: string;
};

export type ValidationResult = {
  rows: CsvRow[];
  errors: CellError[];
};
