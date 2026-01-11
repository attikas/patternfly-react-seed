/*
import * as React from 'react';
import { parseCsv } from './csv';
import { CsvRow, SelectedCell } from './types';
import { ChunkedCsvTable } from './ChunkedCsvTable';
import { TextInput } from '@patternfly/react-core';

export function CsvUploadStep() {
  const [rows, setRows] = React.useState<readonly CsvRow[] | undefined>(undefined);
  const [selectedCell, setSelectedCell] = React.useState<SelectedCell | undefined>(undefined);
  const [selectedValue, setSelectedValue] = React.useState<string>('');

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
      {selectedCell && (
        <div style={{ marginTop: 16 }}>
          <strong>Selected cell</strong>
          <div>Row: {selectedCell.rowIndex + 1}</div>
          <div>Column: {selectedCell.colIndex + 1}</div>
          <div>Value:</div>

          <TextInput value={selectedValue} readOnly aria-label="Selected cell value" />
        </div>
      )}
      <a>ChunkedCsvTable in CsvUploadStep.tsx</a>
      <ChunkedCsvTable
        rows={rows}
        selectedCell={selectedCell}
        onCellSelect={(rowIndex, colIndex, value) => {
          setSelectedCell({ rowIndex, colIndex });
          setSelectedValue(value);
        }}
      />
    </>
  );
}
*/

import * as React from 'react';
import { Alert, TextInput } from '@patternfly/react-core';
import { parseCsv } from './csv';
import { CsvRow, SelectedCell } from './types';
import { ChunkedCsvTable } from './ChunkedCsvTable';

export function CsvUploadStep() {
  const [rows, setRows] = React.useState<readonly CsvRow[]>();
  const [error, setError] = React.useState<string | undefined>();
  const [selectedCell, setSelectedCell] = React.useState<SelectedCell | undefined>();
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  function onFileSelected(file: File) {
    setError(undefined);

    parseCsv(
      file,
      (result) => {
        setRows(result.rows);
      },
      (message) => {
        setRows(undefined);
        setError(message);
      },
    );
  }

  return (
    <>
      {/* Selected cell display */}
      {selectedCell && (
        <div style={{ marginTop: 16 }}>
          <strong>Selected cell</strong>
          <div>Row: {selectedCell.rowIndex + 1}</div>
          <div>Column: {selectedCell.colIndex + 1}</div>
          <div>Value:</div>

          <TextInput value={selectedValue} readOnly aria-label="Selected cell value" />
        </div>
      )}
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

      {error && (
        <Alert variant="danger" title="CSV upload error" isInline>
          {error}
        </Alert>
      )}

      <ChunkedCsvTable
        rows={rows}
        selectedCell={selectedCell}
        onCellSelect={(rowIndex, colIndex, value) => {
          setSelectedCell({ rowIndex, colIndex });
          setSelectedValue(value);
        }}
      />
    </>
  );
}
