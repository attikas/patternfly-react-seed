import React from 'react';
import { Button, TextInput } from '@patternfly/react-core';

import './index.css';

export default function VATInfo() {
  const handleSubmit = (e) => {
    fetchData();
    e.preventDefault();
  };
  function fetchData() {
    async function init() {
      try {
        const furl = `organisations/vat/check-vat-number/lookup/`;

        console.log(`Fetching data from ${furl}`);
      } catch (e) {
        console.log(e);
      } finally {
        console.log(`finally`);
      }
    }
    init();

    return () => {};
  }

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit} method="POST" className="form">
          <div className="form-element">
            <label htmlFor="username" className="label">
              VAT
            </label>
            <TextInput className="input" placeholder="Enter VAT number" type="text" id="vrn" name="vrn" width="150" />
          </div>
          <div className="form-element">
            <Button type="submit" className="button">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div>JSONGrid:</div>
    </div>
  );
}
