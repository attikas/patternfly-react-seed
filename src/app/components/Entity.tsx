import * as React from 'react';
import { useRef, useState } from 'react';
import {
  ActionGroup,
  Button,
  Checkbox,
  Form,
  FormGroup,
  FormGroupLabelHelp,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Popover,
  TextInput,
} from '@patternfly/react-core';

export const Entity: React.FunctionComponent = () => {
  const [entityName, setEntityName] = useState('');
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const labelHelpRef = useRef(null);
  const handleEntityNameChange = (_event, entityName: string) => {
    setEntityName(entityName);
  };
  const handleCompanyRegistrationNumberChange = (_event, companyRegistrationNumber: string) => {
    setCompanyRegistrationNumber(companyRegistrationNumber);
  };
  const handleNameChange = (_event, name: string) => {
    setName(name);
  };

  const handleEmailChange = (_event, email: string) => {
    setEmail(email);
  };

  const handlePhoneChange = (_event, phone: string) => {
    setPhone(phone);
  };

  return (
    <Form>
      <FormGroup label="Entity name" isRequired fieldId="entity-name">
        <TextInput
          isRequired
          type="text"
          id="entity-name"
          name="entity-name"
          aria-describedby="entity-name-helper"
          value={entityName}
          onChange={handleEntityNameChange}
        />
      </FormGroup>
      <FormGroup label="Company Registration Number" isRequired fieldId="company-registration-number">
        <TextInput
          isRequired
          type="text"
          id="company-registration-number"
          name="company-registration-number"
          aria-describedby="company-registration-number-helper"
          value={companyRegistrationNumber}
          onChange={handleCompanyRegistrationNumberChange}
        />
      </FormGroup>
      <FormGroup label="VAT Number" isRequired fieldId="vat-number">
        <TextInput
          isRequired
          type="text"
          id="vat-number"
          name="vat-number"
          aria-describedby="simple-form-name-01-helper"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup
        label="Full name"
        labelHelp={
          <Popover
            triggerRef={labelHelpRef}
            headerContent={
              <div>
                The{' '}
                <a href="https://schema.org/name" target="_blank" rel="noreferrer">
                  name
                </a>{' '}
                of a{' '}
                <a href="https://schema.org/Person" target="_blank" rel="noreferrer">
                  Person
                </a>
              </div>
            }
            bodyContent={
              <div>
                Often composed of{' '}
                <a href="https://schema.org/givenName" target="_blank" rel="noreferrer">
                  givenName
                </a>{' '}
                and{' '}
                <a href="https://schema.org/familyName" target="_blank" rel="noreferrer">
                  familyName
                </a>
                .
              </div>
            }
          >
            <FormGroupLabelHelp ref={labelHelpRef} aria-label="More info for name field" />
          </Popover>
        }
        isRequired
        fieldId="simple-form-name-01"
      >
        <TextInput
          isRequired
          type="text"
          id="simple-form-name-01"
          name="simple-form-name-01"
          aria-describedby="simple-form-name-01-helper"
          value={name}
          onChange={handleNameChange}
        />
        <FormHelperText>
          <HelperText>
            <HelperTextItem>Include your middle name if you have one.</HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>
      <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
        <TextInput
          isRequired
          type="email"
          id="simple-form-email-01"
          name="simple-form-email-01"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup label="Phone number" isRequired fieldId="simple-form-phone-01">
        <TextInput
          isRequired
          type="tel"
          id="simple-form-phone-01"
          name="simple-form-phone-01"
          placeholder="555-555-5555"
          value={phone}
          onChange={handlePhoneChange}
        />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary">Submit</Button>
        <Button variant="link">Cancel</Button>
      </ActionGroup>
    </Form>
  );
};
