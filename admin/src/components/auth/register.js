import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from "@react-md/button";
import {
  TextField,
} from "@react-md/form";

import { REGISTER_USER } from '../../queries/auth';
import { setUserToken } from '../../services/storage';
import { useMutation } from "@apollo/client";
import { cleanErrorMessage } from 'libs/errors';

import logo from 'images/logo.svg';
import './login.scss';

const AuthLogin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { data: token, error: errorMessage, loading }] = useMutation(REGISTER_USER);

  if (token) {
    setUserToken(token.register.token);
    window.location.href = '/';
    return;
  }

  const doRegister = async () => {
    try {
      await register({
        variables: {
          input: {
            username,
            name: username,
            email,
            password
          }
        }
      })
    } catch(e) {

    }
  };

  const handleKeyDown = (evt) => {
    if (evt.which === 13) {
      doRegister();
    }
  };

  return (
    <div className="login">
      <div className="login__form__content">
        <div className="login__form__logo">
          <img src={logo} alt="Amped Framework"/>
        </div>
        <h2 className="login__title">Register</h2>
      </div>
      {errorMessage && (
        <div className="login__error">
          {cleanErrorMessage({ error: errorMessage})}
        </div>
      )}
      <form autoComplete={false} className="login__fields">
        <div className="login__field">
          <TextField
            autocomplete="off"
            label="Username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="login__field">
          <TextField
            autocomplete="random-email"
            label="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="login__field">
          <TextField
            autocomplete="random-password"
            label="password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>

      <div className="login__actions">
        <Button
          disabled={loading}
          theme="primary"
          themeType="contained"
          onClick={doRegister}
        >
          Register
        </Button>
      </div>

      <div className="login__register">
        Already have an account?&nbsp;<a href="/login">Login</a>
      </div>
    </div>
  );
}

export default withRouter(AuthLogin);

