import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GoogleAuth from './google';

import ForgotPassword from './forgot-password';
import Login from './login';
import Register from './register';
import ResetPassword from './reset-password';

import './layout.scss';

const AuthRouter = () => (
  <div className="auth-layout">
    <div className="auth-layout__form">
      <div className="auth-layout__form__inner">
        <Switch>
          <Route exact path="/google-auth" component={GoogleAuth} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
        </Switch>
      </div>
    </div>
    <div className="auth-layout__background" />
  </div>
);

export default AuthRouter;
