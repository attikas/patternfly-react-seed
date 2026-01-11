import * as React from 'react';
import { ProgressStepper, ProgressStep } from '@patternfly/react-core';
import { ImportStep } from './steps';

export function ImportStepper({ step }: { readonly step: ImportStep }) {
  return (
    <ProgressStepper>
      <ProgressStep variant={step > 0 ? 'success' : 'info'} isCurrent={step === ImportStep.Upload}>
        Upload
      </ProgressStep>

      <ProgressStep variant={step > 1 ? 'success' : 'pending'} isCurrent={step === ImportStep.Validate}>
        Validate
      </ProgressStep>

      <ProgressStep variant="pending" isCurrent={step === ImportStep.Complete}>
        Complete
      </ProgressStep>
    </ProgressStepper>
  );
}
