import * as React from 'react';
import { ProgressStep, ProgressStepper } from '@patternfly/react-core';
import { ImportStep } from './steps';

export function ImportStepper({ step }: { step: ImportStep }) {
  return (
    <ProgressStepper>
      <ProgressStep isCurrent={step === ImportStep.Upload} variant={step > ImportStep.Upload ? 'success' : 'info'}>
        Upload
      </ProgressStep>

      <ProgressStep
        isCurrent={step === ImportStep.Validate}
        variant={step > ImportStep.Validate ? 'success' : 'pending'}
      >
        Validate
      </ProgressStep>

      <ProgressStep isCurrent={step === ImportStep.Complete} variant="pending">
        Complete
      </ProgressStep>
    </ProgressStepper>
  );
}
