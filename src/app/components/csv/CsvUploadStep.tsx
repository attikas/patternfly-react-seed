import React from 'react';
import { parseCsv } from './csv';
import { validateRows } from './validation';

export function CsvUploadStep({ onLoaded }: Readonly<{ onLoaded: Function }>) {
  return (
    <input
      type="file"
      accept=".csv"
      onChange={(e) => e.target.files && parseCsv(e.target.files[0], (rows) => onLoaded(rows, validateRows(rows)))}
    />
  );
}
