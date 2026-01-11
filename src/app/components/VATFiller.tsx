import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { Button, TextInput } from '@patternfly/react-core';
import { ProgressStepperComponent, Step } from './ProgressStepperComponent';
import { CsvImportPage } from '../CsvImportPage';

//import './index.css';
const initialSteps: Step[] = [
  { id: 'create', label: 'Load file', status: 'current' },
  { id: 'validate', label: 'Create VAT Return', status: 'pending' },
  { id: 'submit', label: 'Submit', status: 'pending' },
  { id: 'process', label: 'Processing', status: 'pending' },
  { id: 'complete', label: 'Complete', status: 'pending' },
];

export default function VATFiller() {
  const [steps] = useState<Step[]>(initialSteps);
  const advance = () =>
    setSteps((prev) =>
      prev.map((s, i) =>
        i === prev.findIndex((x) => x.status === 'current')
          ? { ...s, status: 'complete' }
          : i === prev.findIndex((x) => x.status === 'current') + 1
            ? { ...s, status: 'complete' }
            : s,
      ),
    );

  return <CsvImportPage />;
}
