import React, {useState} from 'react';
import logo from "../../images/logo.svg";
import {cleanErrorMessage} from "../../libs/errors";
import {TextField} from "@react-md/form";
import {Button} from "@react-md/button";
import {useMutation} from "@apollo/client";
import { useHistory } from 'react-router-dom';
import {RESET_PASSWORD} from "../../queries/auth";
import qs from 'query-string';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { data, error: _errorMessage, loading }] = useMutation(RESET_PASSWORD);
  const history = useHistory();
  const token = qs.parse(window.location.search).token;

  if (data && data.resetPassword && data.resetPassword.success) {
    history.push('/login');
    return null
  }

  const doForgotPassword = () => {
    resetPassword({
      variables: {
        password,
        confirmPassword,
        token,
      }
    })
  };

  const handleKeyDown = (evt) => {
    if (evt.which === 13) {
      doForgotPassword();
    }
  };

  const errorMessage = _errorMessage || ( data && !data.resetPassword.success && data.resetPassword.message);

  return (
    <div className="login">
      <div className="login__form__content">
        <div className="login__form__logo">
          <img src={logo} alt="Amped Framework"/>
        </div>
        <h2 className="login__title">Reset password</h2>
        <p>
          Type in a new password and confirm it to reset your password.
        </p>
      </div>
      {errorMessage && (
        <div className="login__error">
          {cleanErrorMessage({ error: errorMessage})}
        </div>
      )}
      <div className="login__fields">
        <div className="login__field">
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="login__field">
          <TextField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(evt) => setConfirmPassword(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="login__actions">
        <Button
          disabled={loading}
          theme="primary"
          themeType="contained"
          onClick={doForgotPassword}
        >
          Reset
        </Button>
      </div>

      <div className="login__register">
        Don't have an account?&nbsp;<a href="/register">Create One</a>
      </div>
    </div>
  );
};

export default ResetPassword;
