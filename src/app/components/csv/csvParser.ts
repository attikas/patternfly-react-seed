import Papa from 'papaparse';
import { validators } from './Validators';
import { CsvRow, ValidationResult } from './types';

export function parseAndValidateCsv(file: File, onComplete: (result: ValidationResult) => void): void {
  const rows: CsvRow[] = [];
  const errors: ValidationResult['errors'] = [];

  Papa.parse<CsvRow>(file, {
    header: true,
    skipEmptyLines: true,
    step: (result, parser) => {
      const rowIndex = rows.length;
      const row = result.data;

      Object.entries(validators).forEach(([column, validate]) => {
        const value = row[column];
        const error = (validate as (value: unknown) => string | undefined)(value);
        if (error) {
          errors.push({
            row: rowIndex,
            column,
            message: error,
          });
        }
      });

      rows.push(row);

      if (rows.length > 200_000) {
        parser.abort();
      }
    },
    complete: () => onComplete({ rows, errors }),
  });
}
