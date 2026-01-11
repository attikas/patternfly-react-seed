// CsvImportWizard.tsx
import * as React from 'react';
import { Wizard, WizardStep } from '@patternfly/react-core';
import { UploadStep } from './UploadStep';
import { PreviewStep } from './PreviewStep';
import { ValidationResult } from './types';

export const CsvImportWizard: React.FC = () => {
  const [result, setResult] = React.useState<ValidationResult | null>(null);

  return (
    <Wizard>
      <WizardStep name="Upload CSV" component={<UploadStep onParsed={setResult} />} />

      <WizardStep
        name="Validate & Preview"
        isDisabled={!result}
        component={result && <PreviewStep result={result} />}
      />

      <WizardStep
        name="Import"
        isDisabled={!result || result.errors.length > 0}
        component={<div>Ready to import</div>}
      />
    </Wizard>
  );
};
