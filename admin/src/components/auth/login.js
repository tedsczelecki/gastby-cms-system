import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from "@react-md/button";
import {
  TextField,
} from 'react-md';

import { AUTH_URLS, LOGIN } from '../../queries/auth';
import { setUserToken } from '../../services/storage';
import { useQuery } from "@apollo/client";
import { useMutationHandled } from 'hooks';

import logo from 'images/logo.svg';
import './login.scss';

const AuthLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, data: authUrls } = useQuery(AUTH_URLS);
  const { doMutation: login } = useMutationHandled({ query: LOGIN });

  const doLogin = async () => {
    try {
      const { data, ...rest } = await login({
        variables: {
          email,
          password
        }
      });

      console.log('DATA', data, rest);
      setUserToken(data.signIn.token);
      window.location.href = '/';
    } catch(e) {

    }
  };

  const handleGoogleClick = () => {
    window.open(authUrls.authUrls.googleUrl, 'google-auth', 'height=700,width=600');
  }

  const handleKeyDown = (evt) => {
    if (evt.which === 13) {
      doLogin();
    }
  };

  return (
    <div className="login">
      <div className="login__form__content">
        <div className="login__form__logo">
          <img src={logo} alt="Amped Framework"/>
        </div>
        <h2 className="login__title">Login</h2>
      </div>
      <div className="login__fields">
        <div className="login__field">
          <TextField
            id="email"
            label="Email or Username"
            value={email}
            onChange={(evt) => setEmail(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="login__field">
          <TextField
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value) }
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="login__actions">
        <Button
          disabled={loading}
          theme="primary"
          themeType="contained"
          onClick={doLogin}
        >
          Login
        </Button>
      </div>

      <div className="login__register">
        <a href="/register">Create an account</a>
        <a href="/forgot-password">Forgot password</a>
      </div>

      <div className="login__or">
        <div>OR</div>
      </div>

      {authUrls && false && (
        <div className="login__auth-urls">
          <div onClick={handleGoogleClick} className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon"
                   alt="Google login"
                   src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p className="btn-text"><b>Sign in with google</b></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(AuthLogin);
