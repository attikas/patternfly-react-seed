import * as React from 'react';
import { parseCsv } from './csv';
import { CsvRow, SelectedCell } from './types';
import { ChunkedCsvTable } from './ChunkedCsvTable';

export function CsvUploadStep() {
  const [rows, setRows] = React.useState<readonly CsvRow[] | undefined>(undefined);

  const [selectedCell, setSelectedCell] = React.useState<SelectedCell | undefined>(undefined);

  function onFileSelected(file: File) {
    parseCsv(file, (result) => {
      setRows(result.rows);
      setSelectedCell(undefined);
    });
  }

  return (
    <>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileSelected(file);
          }
        }}
      />

      <ChunkedCsvTable
        rows={rows}
        selectedCell={selectedCell}
        onCellSelect={(rowIndex, colIndex) => setSelectedCell({ rowIndex, colIndex })}
      />
    </>
  );
}
