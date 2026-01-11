// UploadStep.tsx
import * as React from 'react';
import { FileUpload } from '@patternfly/react-core';
import { parseAndValidateCsv } from './csvParser';
import { ValidationResult } from './types';

type Props = {
  onParsed: (result: ValidationResult) => void;
};

export const UploadStep: React.FC<Props> = ({ onParsed }) => {
  const onFileChange = (_: string, file: File) => {
    parseAndValidateCsv(file, onParsed);
  };

  return <FileUpload id="csv-upload" browseButtonText="Upload CSV" onFileInputChange={onFileChange} />;
};
