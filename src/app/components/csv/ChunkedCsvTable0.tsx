import * as React from 'react';
import { CsvRow } from './csv';
import { ErrorMap } from './validation';
import { SelectedCell } from './selection';

interface ChunkedCsvTableProps {
  rows: CsvRow[];
  errors: ErrorMap;
  onCellSelect?: (cell: SelectedCell) => void;
}

export function ChunkedCsvTable0({ rows, errors, onCellSelect }: ChunkedCsvTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {rows[0] &&
            Object.keys(rows[0])
              .filter((key) => key !== '__rowIndex')
              .map((col) => (
                <th key={col} style={{ border: '1px solid #ccc', padding: 4 }}>
                  {col}
                </th>
              ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.__rowIndex}>
            {Object.entries(row)
              .filter(([key]) => key !== '__rowIndex')
              .map(([col, value]) => (
                <td
                  key={col}
                  style={{
                    border: '1px solid #ccc',
                    padding: 4,
                    backgroundColor: errors?.[row.__rowIndex]?.[col] ? '#fdd' : undefined,
                    cursor: 'pointer',
                  }}
                  onClick={() => onCellSelect?.({ row: row.__rowIndex, col, value })}
                >
                  {value}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
