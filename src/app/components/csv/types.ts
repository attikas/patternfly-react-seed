/*
export type SelectedCell = {
  rowIndex: number;
  colIndex: number;
  value: string;
};
*/

export const ROW_INDEX = Symbol('rowIndex');

export type CsvRow = Readonly<{
  id: string;
  values: readonly string[];
  [ROW_INDEX]: number;
}>;

export type CsvParseResult = Readonly<{
  headers: readonly string[];
  rows: readonly CsvRow[];
}>;

export type SelectedCell = Readonly<{
  rowIndex: number;
  colIndex: number;
}>;
