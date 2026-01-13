import * as React from 'react';
//import { useState } from 'react';
//import { Card, CardBody, CardHeader, CardTitle, Checkbox, Gallery } from '@patternfly/react-core';
import { PageSection, Title } from '@patternfly/react-core';
import VATFiller from '@app/components/VATFiller';
export const Entity: React.FunctionComponent = () => (
  <PageSection hasBodyWrapper={false}>
    <Title headingLevel="h1" size="lg">
      VAT Filing
    </Title>
    <VATFiller />
  </PageSection>
);
