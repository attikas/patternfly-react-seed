// VirtualCsvTable.tsx
import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { CellError, CsvRow } from './types';

type Props = {
  columns: string[];
  rows: CsvRow[];
  errors: CellError[];
};

export const VirtualCsvTable: React.FC<Props> = ({ columns, rows, errors }) => {
  const errorMap = React.useMemo(() => {
    const map = new Map<string, string>();
    errors.forEach((e) => {
      map.set(`${e.row}-${e.column}`, e.message);
    });
    return map;
  }, [errors]);

  return (
    <Table aria-label="CSV Preview" variant="compact" height={500}>
      <Thead>
        <Tr>
          {columns.map((col) => (
            <Th key={col}>{col}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {rows.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {columns.map((col) => {
              const error = errorMap.get(`${rowIndex}-${col}`);
              return (
                <Td key={col} className={error ? 'pf-m-danger' : undefined} title={error}>
                  {row[col]}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
