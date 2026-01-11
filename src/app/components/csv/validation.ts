import { CsvRow } from './csv';
import { CellErrorMap, RowErrorMap, ValidationResult } from './types';
/*
export function validateRows(rows?: CsvRow[], headerRow?: number): ValidationResult {
  if (!Array.isArray(rows)) {
    return { rowErrors: {}, cellErrors: {} };
  }

  const rowErrors: RowErrorMap = {};
  const cellErrors: CellErrorMap = {};

  rows.forEach((row, rowIndex) => {
    if (!row || !Array.isArray(row.values)) {
      return;
    }

    // Skip header row
    if (headerRow !== undefined && rowIndex === headerRow) {
      return;
    }

    row.values.forEach((value, colIndex) => {
      if (!value || value.trim() === '') {
        cellErrors[`${rowIndex}:${colIndex}`] = 'Value is required';
      }
    });
  });

  return { rowErrors, cellErrors };
}
*/
export function validateRows(rows?: CsvRow[], headerRow?: number): ValidationResult {
  const rowErrors: RowErrorMap = {};
  const cellErrors: CellErrorMap = {};

  if (!Array.isArray(rows)) {
    return { rowErrors, cellErrors };
  }

  rows.forEach((row, rowIndex) => {
    if (!row || !Array.isArray(row.values)) return;

    if (headerRow !== undefined && rowIndex === headerRow) return;

    let rowHasError = false;

    row.values.forEach((value, colIndex) => {
      if (!value || value.trim() === '') {
        cellErrors[`${rowIndex}:${colIndex}`] = 'Value is required';
        rowHasError = true;
      }
    });

    if (rowHasError) {
      rowErrors[rowIndex] = 'Row contains validation errors';
    }
  });

  return { rowErrors, cellErrors };
}
