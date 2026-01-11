import { CsvRow } from './csv';

export type ErrorMap = {
  [row: number]: {
    [col: number]: { message: string };
  };
};

export function validateRows(rows: CsvRow[]): ErrorMap {
  const errors: ErrorMap = {};

  rows.forEach((row, r) =>
    row.values.forEach((cell, c) => {
      if (c === 0 && !cell.trim()) {
        errors[r] ??= {};
        errors[r][c] = { message: 'Required' };
      }
      if (c === 2 && Number.isNaN(Number(cell))) {
        errors[r] ??= {};
        errors[r][c] = { message: 'Must be numeric' };
      }
    }),
  );

  return errors;
}
