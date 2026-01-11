import * as React from 'react';
import {
  Alert,
  AlertGroup,
  EmptyState,
  EmptyStateBody,
  List,
  ListItem,
  Split,
  SplitItem,
  Title,
} from '@patternfly/react-core';
import { VirtualCsvTable } from './csv/VirtualCsvTable';
import { ValidationResult } from './csv/types';

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
          <Alert variant="danger" title={`${errors.length} validation errors found`} isInline />
        </AlertGroup>
      )}

      <Split hasGutter>
        {/* LEFT — CSV TABLE */}
        <SplitItem isFilled>
          <VirtualCsvTable columns={columns} rows={rows} errors={errors} />
        </SplitItem>

        {/* RIGHT — ERROR PANEL */}
        <SplitItem style={{ width: 320 }}>
          <Title headingLevel="h4">Errors</Title>

          {errors.length === 0 ? (
            <EmptyState>
              <EmptyStateBody>No validation errors 🎉</EmptyStateBody>
            </EmptyState>
          ) : (
            <List isPlain>
              {errors.slice(0, 100).map((e, i) => (
                <ListItem key={i}>
                  <strong>Row {e.row + 1}</strong> – {e.column}
                  <br />
                  <small>{e.message}</small>
                </ListItem>
              ))}
            </List>
          )}
        </SplitItem>
      </Split>
    </>
  );
};
