import React, {useState} from 'react';
import logo from "../../images/logo.svg";
import {cleanErrorMessage} from "../../libs/errors";
import {TextField} from "@react-md/form";
import {Button} from "@react-md/button";
import {useMutation} from "@apollo/client";
import {FORGOT_PASSWORD} from "../../queries/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { data, error: errorMessage, loading }] = useMutation(FORGOT_PASSWORD);

  const doForgotPassword = () => {
    forgotPassword({
      variables: {
        email,
      }
    })
  };

  const handleKeyDown = (evt) => {
    if (evt.which === 13) {
      doForgotPassword();
    }
  };

  const message = data && data.forgotPassword && data.forgotPassword.message;

  return (
    <div className="login">
      <div className="login__form__content">
        <div className="login__form__logo">
          <img src={logo} alt="Amped Framework"/>
        </div>
        <h2 className="login__title">Forgot password</h2>
        <p>
          { message || 'Type in your email and we will send you a reset password link to the email address associated with your account.'}
        </p>
      </div>
      {errorMessage && (
        <div className="login__error">
          {cleanErrorMessage({ error: errorMessage})}
        </div>
      )}
      { !message && (
        <div>
          <div className="login__fields">
            <div className="login__field">
              <TextField
                label="Email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value) }
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
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
