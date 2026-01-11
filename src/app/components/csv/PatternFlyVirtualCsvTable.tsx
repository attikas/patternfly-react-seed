import * as React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Tooltip } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { CsvRow } from './csv';
import { ErrorMap } from './validation';

export function PatternFlyVirtualCsvTable({ rows, errors }: { rows: CsvRow[]; errors: ErrorMap }) {
  const cols = rows[0]?.values.length ?? 0;

  return (
    <Grid columnCount={cols} rowCount={rows.length} columnWidth={180} rowHeight={40} height={520} width={1100}>
      {({ rowIndex, columnIndex, style }) => {
        const value = rows[rowIndex].values[columnIndex];
        const error = errors[rowIndex]?.[columnIndex];

        return (
          <div
            style={style}
            className={`pf-v5-u-p-sm pf-v5-u-border-bottom pf-v5-u-border-right
              ${error ? 'pf-v5-u-background-color-danger-100' : ''}`}
          >
            {error ? (
              <Tooltip content={error.message}>
                <span className="pf-v5-u-color-danger">
                  <ExclamationCircleIcon /> {value}
                </span>
              </Tooltip>
            ) : (
              value
            )}
          </div>
        );
      }}
    </Grid>
  );
}
