import React, { useState } from 'react';
import {
  Alert,
  Card,
  CardBody,
  Form,
  FormGroup,
  Split,
  SplitItem,
  Switch,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';

import { ChunkedCsvTable } from './csv/ChunkedCsvTable';
import { CsvRow } from './csv/csv';
import { ErrorMap } from './csv/validation';

export default function SidebySide({ rows, errors }: { rows: CsvRow[]; errors: ErrorMap }) {
  const [cellClickEnabled, setCellClickEnabled] = useState(true);
  const [selectedCell, setSelectedCell] = useState<{ value: string; error?: ErrorMap } | undefined>();

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <Switch
              id="cell-click-toggle"
              label="Cell selection"
              isChecked={cellClickEnabled}
              onChange={(_, checked) => {
                setCellClickEnabled(checked);
                if (!checked) {
                  setSelectedCell(undefined);
                }
              }}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Split hasGutter>
        {/* 🔹 LEFT: TABLE */}
        <SplitItem isFilled>
          <ChunkedCsvTable
            rows={rows}
            errors={errors}
            //            enableCellClick={cellClickEnabled}
            onCellSelect={(cell) => setSelectedCell(cell)}
          />
        </SplitItem>

        {/* 🔹 RIGHT: INSPECTOR */}
        <SplitItem style={{ width: 320 }}>
          <Card>
            <CardBody>
              <Form>
                <FormGroup
                  label="Selected cell value"
                  fieldId="selected-cell"
                  //                  helperText={selectedCell?.error?.message}
                  //                  validated={selectedCell?.error ? 'error' : 'default'}
                >
                  <TextInput id="selected-cell" value={selectedCell?.value ?? ''} />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </SplitItem>
      </Split>
    </>
  );
}
