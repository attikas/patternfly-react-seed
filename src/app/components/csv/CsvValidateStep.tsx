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
import { UndoIcon } from '@patternfly/react-icons';

import { ChunkedCsvTable } from './ChunkedCsvTable';
import { CsvRow } from './csv';
import { ErrorMap } from './validation';
import { SelectedCell } from './selection';
import { BoxKey, VATBoxValue, VATBoxes, boxInputs } from '@app/constants/VatBox';

export function CsvValidateStep({ rows, errors }: { rows: CsvRow[]; errors: ErrorMap }) {
  const [selectedCell, setSelectedCell] = useState<SelectedCell>();
  const [activeRadio, setActiveRadio] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<BoxKey, VATBoxValue>>(boxInputs);
  const [confirmed, setConfirmed] = useState(false);

  const updateInput = (id: number, value: string) => {
    setInputs((prev) => {
      const key = `box${id}` as BoxKey;
      const next = {
        ...prev,
        [key]: {
          ...prev[key],
          value,
          datetime: Date.now(),
        },
      };

      if ([1, 2, 4].includes(id)) {
        const v1 = Number.parseFloat(next.box1.value) || 0;
        const v2 = Number.parseFloat(next.box2.value) || 0;
        const v4 = Number.parseFloat(next.box4.value) || 0;

        next.box3 = { ...next.box3, value: (v1 + v2).toFixed(2), datetime: Date.now() };
        next.box5 = { ...next.box5, value: (v1 + v2 - v4).toFixed(2), datetime: Date.now() };
      }
      return next;
    });
  };

  return (
    <Split hasGutter>
      <SplitItem style={{ flex: '0 0 70%' }}>
        <ChunkedCsvTable
          rows={rows}
          errors={errors}
          onCellSelect={(cell) => {
            setSelectedCell(cell);
            if (!activeRadio) return;
            updateInput(activeRadio, String(cell.value));
          }}
        />
      </SplitItem>

      <SplitItem style={{ flex: '0 0 30%' }}>
        <div className="pf-v6-u-p-md">
          <Card className="pf-v6-u-background-color-info-50">
            <CardHeader>
              <CardTitle component="h4">VAT Form</CardTitle>
            </CardHeader>

            <CardBody>
              <Form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label>
                  (Row:{selectedCell?.row}, Col:{selectedCell?.col}) Value: {selectedCell?.value}
                </label>

                {VATBoxes.map((vatbox) => (
                  <FormGroup key={vatbox.id} label={vatbox.box} fieldId={`input-${vatbox.id}`}>
                    <HelperText id={`helper-${vatbox.id}`}>
                      <HelperTextItem>{vatbox.boxText}</HelperTextItem>
                    </HelperText>

                    <div style={{ display: 'flex', gap: 12 }} className="pf-v6-u-background-color-200">
                      {vatbox.input && (
                        <Radio
                          name="mapping"
                          id={`radio-${vatbox.id}`}
                          isChecked={activeRadio === vatbox.id}
                          onChange={() => setActiveRadio(vatbox.id)}
                        />
                      )}

                      <TextInput
                        id={`input-${vatbox.id}`}
                        aria-describedby={`helper-${vatbox.id}`}
                        value={inputs[`box${vatbox.id}` as BoxKey].value}
                        onChange={(_, value) => updateInput(vatbox.id, value)}
                        readOnly
                        readOnlyVariant={'default'}
                        className={!vatbox.input ? 'pf-v6-u-font-weight-bold' : undefined}
                        placeholder={vatbox.inputInit}
                        style={{ fontWeight: 500 }}
                        type="number"
                        step="0.01"
                      />

                      {vatbox.input && (
                        <Tooltip content="Reset Box to £0.00">
                          <Button
                            variant="control"
                            icon={<UndoIcon />}
                            onClick={() => updateInput(vatbox.id, vatbox.inputInit || '0.00')}
                            isDisabled={inputs[`box${vatbox.id}` as BoxKey].value === vatbox.inputInit}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </FormGroup>
                ))}

                <Checkbox
                  id="confirm-checkbox"
                  label="I understand that by submitting this VAT information, I am making a legal declaration to HMRC that it is accurate and complete. False declarations may result in prosecution."
                  isChecked={confirmed}
                  onChange={(_, checked) => setConfirmed(checked)}
                />

                <Button variant="primary" isDisabled={!confirmed}>
                  Submit VAT to HMRC
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </SplitItem>
    </Split>
  );
}
