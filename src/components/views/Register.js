/*
 Copyright (c) 2021 Christer Johansson of Sweden Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { useState } from 'react';
import { toast } from 'react-toastify';

import Form from '../../utilities/Forms';
import { BsBank2 } from 'react-icons/bs';
import './Register.css';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import LoadingOverlay from '../common/LoadingOverlay';

const Register = () => {
  const [name, setName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [DoB, setDoB] = useState('');
  const [Address, setAddress] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  const [postcode, setpostcode] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true
      },
      email: {
        value: email,
        isRequired: true,
        isEmail: true
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6
      }
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors
      });

      isValid = false;
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      // setName('');
      // setLastName('');
      // setAddress('');
      // setDoB('');
      // setcity('');
      // setPassword('');
      // setcountry('');
      // setpostcode('');
      // setEmail('');
      // setPassword('');
      // setconfirmPassword('');
      // setmobilenumber('');

      setIsLoading(true);
      createUser();
    }
  };

  const history = useHistory();

  async function createUser() {
    try {
      const response = await axios.post('/customers/', {
        firstName: name,
        lastName: Lastname,
        email: email,
        mobileNo: mobilenumber,
        city: city,
        country: country,
        address: Address,
        zipCode: postcode,
        password: password
      });

      setTimeout(() => {
        setIsLoading(false);
        toast('Customer account created succssfully');
        history.push('/login');
      }, 2000);
      console.log(response.data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="position-relative">
      {isLoading && <LoadingOverlay />}
      <div className="header">
        <div className="container">
          <div className="logo-container">
            <h1>
              <BsBank2 /> WELCOME TO SWEA BANK
            </h1>
          </div>

          <div className="auth-main-col text-center">
            <div className="d-flex flex-column align-content-end">
              <div className="auth-body mx-auto">
                <h1>Create an account online</h1>
                <p>
                  It only takes a few minutes to create an account. Please
                  follow the steps below.
                </p>
                <div className="auth-form-container text-start">
                  <form
                    className="auth-form"
                    method="POST"
                    onSubmit={register}
                    autoComplete={'off'}>
                    <div className="name mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validate.validate && validate.validate.name
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.name
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.name
                          ? validate.validate.name[0]
                          : ''}
                      </div>
                    </div>

                    <div className="Lastname mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validate.validate && validate.validate.Lastname
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="Lastname"
                        name="Lastname"
                        value={Lastname}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.Lastname
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.Lastname
                          ? validate.validate.Lastname[0]
                          : ''}
                      </div>
                    </div>

                    <div className="DoB mb-3">
                      <input
                        type="DOB"
                        className={`form-control ${
                          validate.validate && validate.validate.DoB
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="DoB"
                        name="D0B"
                        value={DoB}
                        placeholder="Date of Birth (DD/MM/YYYY)"
                        onChange={(e) => setDoB(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.DoB
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.DoB
                          ? validate.validate.DoB[0]
                          : ''}
                      </div>
                    </div>

                    <div className="Address mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validate.validate && validate.validate.Address
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="Address"
                        name="Address"
                        value={Address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.Address
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.Address
                          ? validate.validate.Address[0]
                          : ''}
                      </div>
                    </div>

                    <div className="city mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validate.validate && validate.validate.city
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="city"
                        name="city"
                        value={city}
                        placeholder="City"
                        onChange={(e) => setcity(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.city
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.city
                          ? validate.validate.city[0]
                          : ''}
                      </div>
                    </div>

                    <div className="country mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validate.validate && validate.validate.country
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="country"
                        name="country"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setcountry(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.country
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.country
                          ? validate.validate.country[0]
                          : ''}
                      </div>
                    </div>

                    <div className="postcode mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validate.validate && validate.validate.postcode
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="postcode"
                        name="postcode"
                        value={postcode}
                        placeholder="Postcode"
                        onChange={(e) => setpostcode(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.postcode
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.postcode
                          ? validate.validate.name[0]
                          : ''}
                      </div>
                    </div>

                    <div className="mobilenumber mb-3">
                      <input
                        type="number"
                        className={`form-control ${
                          validate.validate && validate.validate.mobilenumber
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="mobilenumber"
                        name="mobilenumber"
                        value={mobilenumber}
                        placeholder="Mobile Number"
                        onChange={(e) => setmobilenumber(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.mobilenumber
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.mobilenumber
                          ? validate.validate.mobilenumber[0]
                          : ''}
                      </div>
                    </div>

                    <div className="email mb-3">
                      <input
                        type="email"
                        className={`form-control ${
                          validate.validate && validate.validate.email
                            ? 'is-invalid '
                            : ''
                        }`}
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.email
                            ? 'd-block'
                            : 'd-none'
                        }`}>
                        {validate.validate && validate.validate.email
                          ? validate.validate.email[0]
                          : ''}
                      </div>
                    </div>

                    <div className="password mb-3">
                      <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`form-control ${
                            validate.validate && validate.validate.password
                              ? 'is-invalid '
                              : ''
                          }`}
                          name="password"
                          id="password"
                          value={password}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={(e) => togglePassword(e)}>
                          <i
                            className={
                              showPassword ? 'far fa-eye' : 'far fa-eye-slash'
                            }></i>{' '}
                        </button>

                        <div
                          className={`invalid-feedback text-start ${
                            validate.validate && validate.validate.password
                              ? 'd-block'
                              : 'd-none'
                          }`}>
                          {validate.validate && validate.validate.password
                            ? validate.validate.password[0]
                            : ''}
                        </div>
                      </div>
                    </div>

                    <div className="confirmpassword mb-3">
                      <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`form-control ${
                            validate.validate &&
                            validate.validate.confirmpassword
                              ? 'is-invalid '
                              : ''
                          }`}
                          name="confirmpassword"
                          id="confirmpassword"
                          value={confirmpassword}
                          placeholder="Confirm-Password"
                          onChange={(e) => setconfirmPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={(e) => togglePassword(e)}>
                          <i
                            className={
                              showPassword ? 'far fa-eye' : 'far fa-eye-slash'
                            }></i>{' '}
                        </button>

                        <div
                          className={`invalid-feedback text-start ${
                            validate.validate &&
                            validate.validate.confirmpassword
                              ? 'd-block'
                              : 'd-none'
                          }`}>
                          {validate.validate &&
                          validate.validate.confirmpassword
                            ? validate.validate.password[0]
                            : ''}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 theme-btn mx-auto">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
