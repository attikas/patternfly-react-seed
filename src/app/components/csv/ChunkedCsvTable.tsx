import * as React from 'react';
import { Table, Tbody, Td, Tr } from '@patternfly/react-table';

export function ChunkedCsvTable({
  rows,
  cellErrors,
  onCellSelect,
}: {
  rows: CsvRow[];
  cellErrors: CellErrorMap;
  onCellSelect: (rowIndex: number, columnIndex: number, value: string) => void;
}) {
  return (
    <Table aria-label="CSV preview (no headers)">
      <Tbody>
        {rows.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {/* Row number */}
            <Td modifier="nowrap">{rowIndex + 1}</Td>

            {/* Cells */}
            {row.values.map((value, columnIndex) => {
              const key = `${rowIndex}:${columnIndex}`;
              const hasError = !!cellErrors[key];

              return (
                <Td
                  key={key}
                  isDanger={hasError}
                  role="button"
                  tabIndex={0}
                  onClick={() => onCellSelect(rowIndex, columnIndex, value)}
                >
                  {value}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
