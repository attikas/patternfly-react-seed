import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import VATFiller from '@app/components/VATFiller';
const Dashboard: React.FunctionComponent = () => (
  <PageSection hasBodyWrapper={false}>
    <Title headingLevel="h1" size="lg">
      VAT Filing
    </Title>
    <VATFiller />
  </PageSection>
);

export { Dashboard };
