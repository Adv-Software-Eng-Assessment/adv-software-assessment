import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { formatAmount, generateRandomString } from '../utilities/utils';
import './Transfer.css';

function Transfer({ accoutBalance, onSuccess }) {
  const initialValues = {
    Amount: '',
    Refference: '',
    AccountNumber: '',
    SortCode: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (!formErrors.Amount && !formErrors.AccountNumber && !formErrors.SortCode) {
      transferAmount();
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.Amount) {
      errors.Amount = 'Amount is required!';
    }
    if (!values.AccountNumber) {
      errors.AccountNumber = 'Account Number is required!';
    }
    if (!values.SortCode) {
      errors.SortCode = 'Sort Code is required!';
    } else if (values.Amount && values.AccountNumber && values.SortCode) {
      // alert('Successfully Transfer');
    }

    return errors;
  };

  const customerId = localStorage.getItem('id');

  async function transferAmount() {
    try {
      const response = await axios.put(
        'account/transfer/' + +customerId + '/',
        {
          amount: +formValues.Amount,
          receiverSortCode: formValues.SortCode,
          receiverAccountNo: formValues.AccountNumber
        }
      );

      if (response) {
        toast('Transfer successsful');
        onSuccess();
      }
    } catch (error) {
      // console.log(error.response.data.Failure);
      toast(error.response.data.Failure);
    }
  };

  React.useEffect(() => {
    setFormValues((formValues) => ({
      ...formValues,
      Ref: 'SWEA' + generateRandomString({ length: 6 })
    }));
  }, []);

  return (
    <div className="container">
      <div className="Balance">
        <h1>Account Balance: {formatAmount(accoutBalance)}</h1>
        <div>
          <form className="form" onSubmit={handleSubmit} autoComplete={'off'}>
            <div className="Transfer">
              <h1>Accout Number</h1>
              <input
                type="number"
                className={`Block`}
                id="AccountNumber"
                name="AccountNumber"
                value={formValues.AccountNumber}
                placeholder="Account Number"
                onChange={handleChange}
              />

              <p className="error">{formErrors.AccountNumber}</p>

              <h1>Sort Code (£)</h1>
              <input
                type="number"
                className={`Block`}
                id="SortCode"
                name="SortCode"
                value={formValues.SortCode}
                placeholder="Sort Code"
                onChange={handleChange}
              />

              <p className="error">{formErrors.SortCode}</p>

              <h1>Amount (£)</h1>
              <input
                type="number"
                className={`Block`}
                id="Amount"
                name="Amount"
                value={formValues.Amount}
                placeholder="Amount (£)"
                onChange={handleChange}
              />

              <p className="error">{formErrors.Amount}</p>

              <h1>Refference</h1>
              <input
                type="text"
                className={`Block`}
                id="Ref"
                name="Ref"
                value={formValues.Ref}
                placeholder="Refference"
                onChange={handleChange}
                disabled
                readOnly
              />
            </div>
            <div className="text-center">
              <div className="btn1">
                <button>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
