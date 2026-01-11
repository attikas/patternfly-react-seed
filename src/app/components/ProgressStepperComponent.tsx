import * as React from 'react';
import { ProgressStep, ProgressStepper } from '@patternfly/react-core';
import { CheckCircleIcon, InProgressIcon, PendingIcon } from '@patternfly/react-icons';

export type Step = {
  id: string;
  label: string;
  status: 'complete' | 'current' | 'pending';
  isDisabled?: boolean;
};

type Props = {
  steps: Step[];
  onStepClick?: (id: string) => void;
  isVertical?: boolean;
};

export const ProgressStepperComponent = ({ steps, onStepClick, isVertical = false }: Props) => (
  <ProgressStepper isVertical={isVertical} aria-label="Progress stepper">
    {steps.map((step) => {
      const isFinished = step.status === 'complete';
      const isCurrent = step.status === 'current';

      return (
        <ProgressStep
          key={step.id}
          id={step.id}
          titleId={`${step.id}-title`}
          variant={isFinished ? 'success' : isCurrent ? 'info' : 'pending'}
          icon={isFinished ? <CheckCircleIcon /> : isCurrent ? <InProgressIcon /> : <PendingIcon />}
          onClick={onStepClick && !step.isDisabled ? () => onStepClick(step.id) : undefined}
        >
          <span id={`${step.id}-title`}>{step.label}</span>
        </ProgressStep>
      );
    })}
  </ProgressStepper>
);
