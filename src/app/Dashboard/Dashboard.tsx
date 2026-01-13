import * as React from 'react';
//import { useState } from 'react';
//import { Card, CardBody, CardHeader, CardTitle, Checkbox, Gallery } from '@patternfly/react-core';
import { PageSection, Title } from '@patternfly/react-core';
import VATFiller from '@app/components/VATFiller';
export const Dashboard: React.FunctionComponent = () => (
  <PageSection hasBodyWrapper={false}>
    <Title headingLevel="h1" size="lg">
      VAT Filing
    </Title>
    <VATFiller />
  </PageSection>
);

/*
export const Dashboard: React.FunctionComponent = () => {
  const [isSecondary, setIsSecondary] = useState<boolean>(false);

  const toggleVariant = (checked: boolean) => {
    setIsSecondary(checked);
  };

  return (
    <>
      <Checkbox
        label="secondary styling"
        isChecked={isSecondary}
        onChange={(_event, checked) => toggleVariant(checked)}
        aria-label="add secondary styling"
        id="toggle-variant-clickable"
        name="toggle-variant"
      />
      <div style={{ marginTop: '15px' }}>
        <Gallery hasGutter>
          <Card isClickable variant={isSecondary ? 'secondary' : 'default'}>
            <CardHeader
              selectableActions={{
                // eslint-disable-next-line no-console
                onClickAction: () => console.log(`First card in actionable example clicked`),
                selectableActionAriaLabelledby: 'clickable-card-example-title-1',
              }}
            >
              <CardTitle id="clickable-card-example-title-1">MTD VAT</CardTitle>
            </CardHeader>
            <CardBody>
              <VATFiller />
            </CardBody>
          </Card>

          <Card isClickable variant={isSecondary ? 'secondary' : 'default'}>
            <CardHeader
              selectableActions={{
                to: '#',
                selectableActionAriaLabelledby: 'clickable-card-example-title-2',
              }}
            >
              <CardTitle id="clickable-card-example-title-2">Returns Due</CardTitle>
            </CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card isClickable variant={isSecondary ? 'secondary' : 'default'}>
            <CardHeader
              selectableActions={{
                to: '#',
                selectableActionAriaLabelledby: 'clickable-card-example-title-2',
              }}
            >
              <CardTitle id="clickable-card-example-title-2">Submitted Returns</CardTitle>
            </CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card isClickable variant={isSecondary ? 'secondary' : 'default'}>
            <CardHeader
              selectableActions={{
                to: '#',
                selectableActionAriaLabelledby: 'clickable-card-example-title-2',
              }}
            >
              <CardTitle id="clickable-card-example-title-2">Liabilities</CardTitle>
            </CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card isClickable variant={isSecondary ? 'secondary' : 'default'}>
            <CardHeader
              selectableActions={{
                to: '#',
                selectableActionAriaLabelledby: 'clickable-card-example-title-2',
              }}
            >
              <CardTitle id="clickable-card-example-title-2">Payments</CardTitle>
            </CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card isClickable isDisabled variant={isSecondary ? 'secondary' : 'default'}>
            <CardHeader
              selectableActions={{
                // eslint-disable-next-line no-console
                onClickAction: () => console.log(`Third card in actionable example clicked`),
                selectableActionAriaLabelledby: 'clickable-card-example-title-3',
              }}
            >
              <CardTitle id="clickable-card-example-title-3">Third card in the actionable example</CardTitle>
            </CardHeader>
            <CardBody>This card is clickable but disabled.</CardBody>
          </Card>
        </Gallery>
      </div>
    </>
  );
};
*/
