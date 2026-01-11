import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Tooltip } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { useEffect, useRef, useState } from 'react';
import { CsvRow, ROW_INDEX } from './csv';
import { ErrorMap } from './validation';
import { SelectedCell } from './selection';

const CHUNK_SIZE = 500;

export function ChunkedCsvTable1({
  rows,
  errors,
  onCellSelect,
}: Readonly<{
  rows: CsvRow[];
  errors: ErrorMap;
  onCellSelect?: (cell: SelectedCell) => void;
}>) {
  const [visible, setVisible] = useState(CHUNK_SIZE);
  const [selected, setSelected] = useState<SelectedCell>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
        setVisible((v) => Math.min(v + CHUNK_SIZE, rows.length));
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [rows.length]);

  const cols = rows[0]?.values.length ?? 0;

  return (
    <>
      {/*   <Alert isInline variant="info" title={`Showing ${visible} of ${rows.length} rows`} />*/}

      <div ref={ref} style={{ maxHeight: 'calc(100vh - 240px)', maxWidth: '100vw', overflow: 'auto' }}>
        <Table variant="compact" isStickyHeader>
          <Thead>
            <Tr>
              {Array.from({ length: cols }).map((_, i) => (
                <Th key={i}>Col {i + 1}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {rows.slice(0, visible).map((row, r) => (
              <Tr key={row.id}>
                {row.values.map((value, c) => {
                  const error = errors[r]?.[c];
                  const isSelected = selected?.row === r && selected?.col === c;

                  return (
                    <Td
                      key={c}
                      tabIndex={0}
                      role="button"
                      onClick={() => {
                        const cell = {
                          row: row[ROW_INDEX],
                          col: c,
                          value,
                          error,
                        };
                        setSelected(cell);
                        onCellSelect?.(cell);
                      }}
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        onCellSelect?.({
                          row: r,
                          col: c,
                          value,
                          error,
                        })
                      }
                      style={{
                        cursor: 'pointer',
                        background: isSelected
                          ? 'var(--pf-v6-global--primary-color--100)'
                          : error
                            ? 'var(--pf-v6-global--danger-color--100)'
                            : undefined,
                      }}
                    >
                      {error ? (
                        <Tooltip content={error.message}>
                          <span className="pf-v6-u-color-danger">
                            <ExclamationCircleIcon /> {value}
                          </span>
                        </Tooltip>
                      ) : (
                        value
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </>
  );
}
