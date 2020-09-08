import React, { useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import Sidebar from '../sidebar';
import { appRoutes, sidebarNavigation } from '../../constants';
import { AuthRouter } from 'components/auth';
import { isAuthenticated } from 'services/storage';
import PageWrapperComponent from './page-wrapper';

import './app.scss';

const unAuthedPaths = [
  '/google-auth',
  '/register',
  '/login',
  '/forgot-password',
  '/reset-password'
]

const App = () => {
  const isAuthed = isAuthenticated();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!isAuthed && unAuthedPaths.indexOf(location.pathname) === -1) {
      history.push('/login');
    }
  }, [history, isAuthed, location]);

  if (!isAuthed) {
    return <AuthRouter />;
  }

  return (
    <div className="app">
      <Sidebar navigation={sidebarNavigation} />
      <main className="app__main-content">
        <Switch>
          {appRoutes.map(({path, Component, props = {}}, i) => {
            return (
              <Route
                exact
                key={i}
                path={path}
                render={() => <PageWrapperComponent Component={Component} {...props} /> }
              />
            )
          })}
        </Switch>
      </main>
    </div>
  );
};

export default App;
