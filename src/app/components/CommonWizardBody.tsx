import * as React from 'react';
import { Alert, PageSection, Stack, StackItem } from '@patternfly/react-core';

export const CommonWizardBody: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <PageSection isFilled>
    <Stack hasGutter>
      {/* Common content */}
      <StackItem>
        <Alert isInline variant="info" title="All changes are autosaved" />
      </StackItem>

      {/* Step-specific content */}
      <StackItem isFilled>{children}</StackItem>
    </Stack>
  </PageSection>
);
