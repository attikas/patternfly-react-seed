import * as React from 'react';
import { Alert, AlertGroup } from '@patternfly/react-core';
import { VirtualCsvTable } from './VirtualCsvTable';
import { ValidationResult } from './types';

type Props = {
  result: ValidationResult;
};

export const PreviewStep: React.FC<Props> = ({ result }) => {
  const { rows, errors } = result;
  const columns = React.useMemo(() => (rows.length > 0 ? Object.keys(rows[0]) : []), [rows]);

  return (
    <>
      {errors.length > 0 && (
        <AlertGroup>
          <Alert variant="danger" title={`${errors.length} validation errors found`} />
        </AlertGroup>
      )}

      {rows.length > 0 && <VirtualCsvTable columns={columns} rows={rows} errors={errors} />}
    </>
  );
};
