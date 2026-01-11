import * as React from 'react';
import { ActionGroup, Button, Page, PageSection } from '@patternfly/react-core';
import { useState } from 'react';

import { ImportStep } from './components/csv/steps';
import { ImportStepper } from './components/csv/ImportStepper';

import { CsvUploadStep } from './components/csv/CsvUploadStep';
import { CsvValidateStep } from './components/csv/CsvValidateStep';
import { CsvCompleteStep } from './CsvCompleteStep';
import { CsvRow } from './components/csv/csv';
import { ErrorMap } from './components/csv/validation';

export function CsvImportPage() {
  const [step, setStep] = useState(ImportStep.Upload);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [errors, setErrors] = useState<ErrorMap>({});

  const canNext =
    step === ImportStep.Upload
      ? rows.length > 0
      : step === ImportStep.Validate
        ? Object.keys(errors).length === 0
        : false;

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <ActionGroup>
          <Button variant="secondary" isDisabled={step === ImportStep.Upload} onClick={() => setStep(step - 1)}>
            Back
          </Button>

          {step !== ImportStep.Complete && (
            <Button variant="primary" isDisabled={!canNext} onClick={() => setStep(step + 1)}>
              Next
            </Button>
          )}
        </ActionGroup>
      </div>
      <div>
        {step === ImportStep.Upload && (
          <CsvUploadStep
            onLoaded={(r, e) => {
              setRows(r);
              setErrors(e);
              setStep(ImportStep.Validate);
            }}
          />
        )}

        {step === ImportStep.Validate && <CsvValidateStep rows={rows} errors={errors} />}

        {step === ImportStep.Complete && <CsvCompleteStep />}
      </div>
    </div>
  );
}
