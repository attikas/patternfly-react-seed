import * as React from 'react';
import { ProgressStep, ProgressStepper } from '@patternfly/react-core';
import { CheckCircleIcon, ExclamationCircleIcon, InProgressIcon, PendingIcon } from '@patternfly/react-icons';

export type StepStatus = 'pending' | 'current' | 'complete' | 'error';

export type Step = {
  id: string;
  label: string;
  status: StepStatus;
};

type Props = {
  steps: Step[];
  onStepClick?: (id: string) => void;
  isVertical?: boolean;
};

export const ProgressStepperComponent = ({ steps, onStepClick, isVertical = false }: Props) => (
  <ProgressStepper isVertical={isVertical} aria-label="Progress">
    {steps.map((step) => {
      const isFinished = step.status === 'complete';
      const isCurrent = step.status === 'current';
      return (
        <ProgressStep
          key={step.id}
          id={step.id}
          titleId={`${step.id}-title`}
          variant={isFinished ? 'success' : isCurrent ? 'info' : 'pending'}
          isCurrent={step.status === 'current'}
          icon={
            step.status === 'complete' ? (
              <CheckCircleIcon />
            ) : step.status === 'current' ? (
              <InProgressIcon />
            ) : step.status === 'error' ? (
              <ExclamationCircleIcon color="var(--pf-v5-global--danger-color--100)" />
            ) : (
              <PendingIcon />
            )
          }
          onClick={onStepClick ? () => onStepClick(step.id) : undefined}
        >
          <span id={`${step.id}-title`}>{step.label}</span>
        </ProgressStep>
      );
    })}
  </ProgressStepper>
);
