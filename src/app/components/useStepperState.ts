import * as React from 'react';
import { Step } from './ProgressStepperComponent';

export const useStepperState = (initialSteps: Step[], setSteps: React.Dispatch<React.SetStateAction<Step[]>>) => {
  const getCurrentIndex = (steps: Step[]) => steps.findIndex((s) => s.status === 'current');

  const advance = () =>
    setSteps((prev) => {
      const i = getCurrentIndex(prev);
      if (i === -1 || i === prev.length - 1) return prev;

      return prev.map((s, idx) =>
        idx === i ? { ...s, status: 'complete' } : idx === i + 1 ? { ...s, status: 'current' } : s,
      );
    });

  const rewind = () =>
    setSteps((prev) => {
      const i = getCurrentIndex(prev);
      if (i <= 0) return prev;

      return prev.map((s, idx) =>
        idx === i ? { ...s, status: 'pending' } : idx === i - 1 ? { ...s, status: 'current' } : s,
      );
    });

  const fail = () => setSteps((prev) => prev.map((s) => (s.status === 'current' ? { ...s, status: 'error' } : s)));

  const retry = () => setSteps((prev) => prev.map((s) => (s.status === 'error' ? { ...s, status: 'current' } : s)));

  return { advance, rewind, fail, retry };
};
