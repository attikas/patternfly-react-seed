import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormGroup,
  HelperText,
  HelperTextItem,
  Radio,
  Split,
  SplitItem,
  TextInput,
  Tooltip,
} from '@patternfly/react-core';
import { useState } from 'react';
import { ChunkedCsvTable } from './ChunkedCsvTable';
import { CsvRow } from './csv';
import { ErrorMap } from './validation';
import { SelectedCell } from './selection';
import { UndoIcon } from '@patternfly/react-icons';
import { VATBoxes } from '@app/constants/VatBox';
//import { BoxInputs } from '@app/constants/VatBox';
//import { BoxKey } from '@app/constants/VatBox';
//import { BoxKey } from '@app/constants/VatBox';
//import { detectHeaderRow } from '@app/components/csv/headerDetection';

export function CsvValidateStep({ rows, errors }: { rows: CsvRow[]; errors: ErrorMap }) {
  // const [headerRow, setHeaderRow] = useState<number | undefined>(() => detectHeaderRow(rows.map((r) => r.values)));
  const [selectedCell, setSelectedCell] = useState<SelectedCell>();

  const [activeRadio, setActiveRadio] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<TargetKey, string>>({
    box1: '0.00',
    box2: '0.00',
    box3: '0.00',
    box4: '0.00',
    box5: '0.00',
    box6: '0.00',
    box7: '0.00',
    box8: '0.00',
    box9: '0.00',
  });

  type TargetKey = 'box1' | 'box2' | 'box3' | 'box4' | 'box5' | 'box6' | 'box7' | 'box8' | 'box9';

  return (
    <Split hasGutter>
      <SplitItem style={{ flex: '0 0 70%' }}>
        <ChunkedCsvTable
          rows={rows}
          errors={errors}
          // enableCellClick={cellClickEnabled}
          onCellSelect={(cell) => {
            setSelectedCell(cell);

            if (!activeRadio) return;

            setInputs((prev) => ({
              ...prev,
              [activeRadio]: cell.value,
            }));
          }}
        />
      </SplitItem>

      <SplitItem style={{ flex: '0 0 30%' }}>
        <div style={{ padding: 16 }}>
          <Card
            style={{
              backgroundColor: 'var(--pf-v6-global--palette--blue-50)',
            }}
          >
            <CardHeader>
              <CardTitle component="h4">VAT Form</CardTitle>
            </CardHeader>
            <CardBody>
              <Form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label>
                  (Row:{selectedCell?.row}, Col:{selectedCell?.col}) Value: {selectedCell?.value}
                </label>
                {VATBoxes.map((vatbox) => (
                  <FormGroup key={vatbox.id} label={vatbox.box}>
                    <HelperText>
                      <HelperTextItem>{vatbox.boxText}</HelperTextItem>
                    </HelperText>
                    <div style={{ display: 'flex', gap: 12 }} className="pf-v6-u-background-color-200">
                      {Boolean(vatbox.input) && (
                        <Radio name="mapping" id={`radio-${vatbox.id}`} onChange={() => setActiveRadio(vatbox.id)} />
                      )}
                      <TextInput
                        readOnlyVariant="default"
                        id={`input-${vatbox.id}`}
                        value={inputs[vatbox.id]}
                        onChange={(_, value) => setInputs((prev) => ({ ...prev, [vatbox.id]: value }))}
                        placeholder={vatbox.inputInit}
                      />
                      <Tooltip content={`Reset Box to £0.00`}>
                        <Button
                          id={`clear-${vatbox.id}`}
                          variant="control"
                          icon={<UndoIcon />}
                          onClick={() => setInputs((prev) => ({ ...prev, [vatbox.id]: vatbox.inputInit }))}
                        />
                      </Tooltip>
                    </div>
                  </FormGroup>
                ))}

                <Checkbox
                  label="I understand that by submitting this VAT information, I am making a legal declaration to HMRC that it is accurate and complete. False declarations may result in prosecution."
                  id="confirm-checkbox"
                />
                <Button variant="primary">Submit VAT to HMRC</Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </SplitItem>
    </Split>
  );
}
