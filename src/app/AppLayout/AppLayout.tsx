import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { IAppRoute, IAppRouteGroup, routes } from '@app/routes';
import { BarsIcon } from '@patternfly/react-icons';
import { KebabDropdownWithIconsV6 } from './KebabMenu';

interface IAppLayout {
  children: React.ReactNode;
}

import { Fragment, useRef, useState } from 'react';
import {
  Brand,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Content,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerHead,
  DrawerPanelContent,
  Flex,
  Masthead,
  MastheadBrand,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSectionTypes,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  SkipToContent,
  Wizard,
  WizardStep,
} from '@patternfly/react-core';
import pfLogo from '@patternfly/react-core/src/demos/assets/PF-HorizontalLogo-Color.svg';

export const AppLayout: React.FunctionComponent = () => {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const drawerRef = useRef<HTMLSpanElement | null>(null);

  const onExpand = () => {
    if (drawerRef.current) {
      drawerRef.current.focus();
    }
  };

  const onOpenClick = () => {
    setIsDrawerExpanded(true);
  };

  const onCloseClick = () => {
    setIsDrawerExpanded(false);
  };

  const onNavSelect = (_event: any, result: any) => {
    setActiveItem(result.itemId);
  };

  const PageNav = (
    <Nav onSelect={onNavSelect} aria-label="Nav">
      <NavList>
        <NavItem itemId={0} isActive={activeItem === 0}>
          VAT
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1}>
          Returns Due
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2}>
          Submitted Returns
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3}>
          Liabilities
        </NavItem>
        <NavItem itemId={4} isActive={activeItem === 4}>
          Payments
        </NavItem>
      </NavList>
    </Nav>
  );

  const masthead = (
    <Masthead id="basic">
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton isHamburgerButton aria-label="Global navigation" />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo>
            <Brand src={pfLogo} alt="PatternFly" heights={{ default: '36px' }} />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  const Sidebar = (
    <PageSidebar>
      <PageSidebarBody>{PageNav}</PageSidebarBody>
    </PageSidebar>
  );

  const pageId = 'main-content-page-layout-default-nav';

  const handleClick = (event) => {
    event.preventDefault();

    const mainContentElement = document.getElementById(pageId);
    if (mainContentElement) {
      mainContentElement.focus();
    }
  };

  const PageSkipToContent = (
    <SkipToContent onClick={handleClick} href={`#${pageId}`}>
      Skip to content
    </SkipToContent>
  );

  const PageBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbItem>Section home</BreadcrumbItem>
      <BreadcrumbItem to="#">Section title</BreadcrumbItem>
      <BreadcrumbItem to="#">Section title</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive>
        Section landing
      </BreadcrumbItem>
    </Breadcrumb>
  );

  const createStepContentWithDrawer = (stepName: string) => (
    <Drawer isInline isExpanded={isDrawerExpanded} onExpand={onExpand}>
      <DrawerContent
        panelContent={
          <DrawerPanelContent widths={{ default: 'width_33' }}>
            <DrawerHead>
              <span tabIndex={isDrawerExpanded ? 0 : -1} ref={drawerRef}>
                Drawer content: {stepName}
              </span>
              <DrawerActions>
                <DrawerCloseButton onClick={onCloseClick} />
              </DrawerActions>
            </DrawerHead>
          </DrawerPanelContent>
        }
      >
        <Flex
          className="pf-v6-c-wizard__main-body"
          direction={{ default: 'column' }}
          spaceItems={{ default: 'spaceItemsLg' }}
          height="100%"
        >
          <Content>
            <p>
              <b>{stepName}</b>
            </p>
            <p>
              Wizard description goes here. If you need more assistance,{' '}
              <Button isInline variant="link" onClick={onOpenClick}>
                see more information
              </Button>{' '}
              in the side drawer.{' '}
            </p>
          </Content>
        </Flex>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Page
      masthead={masthead}
      sidebar={Sidebar}
      isManagedSidebar
      skipToContent={PageSkipToContent}
      breadcrumb={PageBreadcrumb}
      mainContainerId={pageId}
    >
      <PageSection aria-labelledby="main-title">
        <Content>
          <h1 id="main-title">File VAT</h1>
          <p>Load file</p>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false} type={PageSectionTypes.wizard} aria-label="Wizard container">
        <Wizard>
          <WizardStep body={{ hasNoPadding: true }} name="Load file" id="wizard-step-1">
            {createStepContentWithDrawer('Load file')}
          </WizardStep>
          <WizardStep
            name="Assign values to VAT Form"
            id="wizard-step-2"
            steps={[
              <WizardStep body={{ hasNoPadding: true }} name="Box 1" id="wizard-step-2a" key="wizard-step-2a">
                {createStepContentWithDrawer('Assign Values Box 1 - VAT due in the period on sales and other outputs')}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 2" id="wizard-step-2b" key="wizard-step-2b">
                {createStepContentWithDrawer(
                  'Assign Values to Box 2 - VAT due in the period on acquisitions of goods made in Northern Ireland from EU Member States',
                )}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 3" id="wizard-step-3b" key="wizard-step-3b">
                {createStepContentWithDrawer('Values for VAT Form Box 3 - Total VAT due (boxes 1 + 2)')}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 4" id="wizard-step-4b" key="wizard-step-4b">
                {createStepContentWithDrawer(
                  'Assign Values for VAT Form Box 4 - VAT reclaimed in the period on purchases and other inputs (including acquisitions in Northern Ireland from EU member states) ',
                )}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 5" id="wizard-step-5b" key="wizard-step-5b">
                {createStepContentWithDrawer(
                  'Values for VAT Form Box 5 - Net VAT to pay to HMRC or reclaim (difference between boxes 3 and 4)',
                )}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 6" id="wizard-step-6b" key="wizard-step-6b">
                {createStepContentWithDrawer(
                  'Assign Values for VAT Form Box 6 - Total value of sales and all other outputs excluding any VAT',
                )}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 7" id="wizard-step-7b" key="wizard-step-7b">
                {createStepContentWithDrawer(
                  'Assign Values for VAT Form Box 7 - The total value of purchases and all other inputs excluding any VAT',
                )}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 8" id="wizard-step-8b" key="wizard-step-8b">
                {createStepContentWithDrawer(
                  'Assign Values for VAT Form Box 8 - Total value of dispatches of goods and related costs (excluding VAT) from Northern Ireland to EU Member States',
                )}
              </WizardStep>,
              <WizardStep body={{ hasNoPadding: true }} name="Box 9" id="wizard-step-9b" key="wizard-step-9b">
                {createStepContentWithDrawer(
                  'Assign Values for VAT Form Box 9 - Total value of acquisitions of goods and related costs (excluding VAT) made in Northern Ireland from EU Member States',
                )}
              </WizardStep>,
            ]}
          />
          <WizardStep body={{ hasNoPadding: true }} name="Submit VAT Form to HMRC" id="wizard-step-3">
            {createStepContentWithDrawer('Submitting to HMRC')}
          </WizardStep>
          <WizardStep
            body={{ hasNoPadding: true }}
            name="Finished"
            id="wizard-step-4"
            footer={{ nextButtonText: 'Finished' }}
          >
            {createStepContentWithDrawer('Finished')}
          </WizardStep>
        </Wizard>
      </PageSection>
    </Page>
  );
};
