/*
import * as React from 'react';
import { Table, Tbody, Td, Tr } from '@patternfly/react-table';
import { CsvRow, SelectedCell } from './types';

type Props = Readonly<{
  rows?: readonly CsvRow[];
  selectedCell?: SelectedCell;
  onCellSelect?: (rowIndex: number, colIndex: number, value: string) => void;
}>;

export function ChunkedCsvTable({ rows, selectedCell, onCellSelect }: Props) {
  const tableId = React.useId();

  if (!rows || rows.length === 0) {
    return <div>No CSV data loaded</div>;
  }

  const columnCount = Math.max(0, ...rows.map((r) => r.values.length));

  return (
    <Table aria-label="CSV preview" variant="compact" role="grid" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <Tbody>
        {rows.map((row, rowIndex) => {
          if (!row.id) {
            throw new Error(`CsvRow missing id at rowIndex=${rowIndex}`);
          }

          return (
            <Tr key={`${tableId}-row-${row.id}`}>
              <Td
                className="pf-v6-u-text-align-right"
                style={{
                  width: 48,
                  fontWeight: 600,
                  background: 'var(--pf-v6-global--palette--black-150)',
                  border: '1px solid var(--pf-v6-global--BorderColor--100)',
                  userSelect: 'none',
                }}
              >
                {rowIndex + 1}
              </Td>

              {Array.from({ length: columnCount }, (_, colIndex) => {
                const value = row.values[colIndex] ?? '';
                const isSelected = selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;

                return (
                  <Td
                    key={`${tableId}-${row.id}-${colIndex}`}
                    onClick={() => onCellSelect?.(rowIndex, colIndex, value)}
                    style={{
                      border: '1px solid var(--pf-v6-global--BorderColor--100)',
                      cursor: 'cell',
                      padding: '4px 8px',
                      whiteSpace: 'nowrap',
                      background: isSelected ? 'var(--pf-v6-global--palette--blue-100)' : undefined,
                      outline: isSelected ? '2px solid var(--pf-v6-global--primary-color--100)' : undefined,
                      outlineOffset: -2,
                    }}
                  >
                    {value}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
*/

import * as React from 'react';
import { Table, Tbody, Td, Tr } from '@patternfly/react-table';
import { CsvRow, SelectedCell } from './types';

type Props = Readonly<{
  rows?: readonly CsvRow[];
  selectedCell?: SelectedCell;
  onCellSelect?: (rowIndex: number, colIndex: number, value: string) => void;
}>;

export function ChunkedCsvTable({ rows, selectedCell, onCellSelect }: Props) {
  const tableId = React.useId();

  if (!rows || rows.length === 0) {
    return <div>No CSV data loaded</div>;
  }

  const columnCount = Math.max(0, ...rows.map((r) => r.values.length));

  return (
    <Table
      aria-label="CSV preview"
      variant="compact"
      role="grid"
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        tableLayout: 'fixed',
      }}
    >
      <Tbody>
        {rows.map((row, rowIndex) => {
          if (!row.id) {
            throw new Error(`CsvRow missing id at rowIndex=${rowIndex}`);
          }

          return (
            <Tr key={`${tableId}-row-${row.id}`}>
              {/* Row number */}
              <Td
                key={`${tableId}-${row.id}-rownum`}
                className="pf-v6-u-text-align-right"
                style={{
                  width: 64,
                  maxWidth: 64,
                  fontWeight: 600,
                  background: 'var(--pf-v6-global--palette--black-150)',
                  border: '1px solid var(--pf-v6-global--BorderColor--100)',
                  userSelect: 'none',
                }}
              >
                {rowIndex + 1}
              </Td>

              {Array.from({ length: columnCount }, (_, colIndex) => {
                const value = row.values[colIndex] ?? '';
                const isSelected = selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;

                return (
                  <Td
                    key={`${tableId}-${row.id}-col-${colIndex}`}
                    role="gridcell"
                    tabIndex={0}
                    onClick={() => onCellSelect?.(rowIndex, colIndex, value)}
                    style={{
                      border: '1px solid var(--pf-v6-global--BorderColor--100)',
                      cursor: 'cell',
                      padding: '4px 8px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      background: isSelected ? 'var(--pf-v6-global--palette--blue-100)' : undefined,
                      outline: isSelected ? '2px solid var(--pf-v6-global--primary-color--100)' : undefined,
                      outlineOffset: -2,
                    }}
                  >
                    {value}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
