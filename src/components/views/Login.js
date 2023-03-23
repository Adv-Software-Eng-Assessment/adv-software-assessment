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
import { Link, useHistory } from 'react-router-dom';
import Form from '../../utilities/Forms';
import './Header.css';
import { BsBank2 } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai';
import { Redirect, useLocation } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingOverlay from '../common/LoadingOverlay';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
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

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin();

    if (validate) {
      setValidate({});
      // setEmail("");
      // setPassword("");
      // alert("Successfully Login");
      setIsLoading(true);
      login();
    }
  };

  const history = useHistory();

  async function login() {
    try {
      const response = await axios.post('/login/', {
        email: email,
        password: password
      });

      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('id', response.data.id);
        history.push('/dashboard');
      }, 2000);
      console.log(response.data);
    } catch (error) {
      setIsLoading(false);
      toast('Invalid email or password');
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
    <div className="header">
      <div className="container">
      {isLoading && <LoadingOverlay />}
        {/* <div className='logo-container'>
                    <h1><BsBank2/> WELCOME TO SWEA BANK</h1>
                </div> */}
                <Header />
      <div className="col-12 col-md-12 col-lg-12 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <h1 className="login"><AiFillLock/> Login to your bank account </h1>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={authenticate}
                autoComplete={"off"}
              >
                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
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
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
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

                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6"></div>
                      <div className="col-6"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto">
                      Log In
                    </button>
                  </div>
                  </div>
                </form>

                <hr />
                <div className="auth-option text-center pt-2">
                  If you don't already have an account,{' '}
                  <Link className="text-link" to="/register">
                    register online{' '}
                  </Link>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
