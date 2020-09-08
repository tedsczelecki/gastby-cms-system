import { ApolloClient, ApolloProvider, ApolloLink, InMemoryCache, split } from '@apollo/client';
// import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from "apollo-link-error";
import React from 'react';
import { createUploadLink } from 'apollo-upload-client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { getUserToken } from 'services/storage';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from 'stores/store'
import App from 'components/app';
import { ToastContainer } from 'react-toastify';
import { unAuthedPaths } from 'constants/routes';
import { removeUserToken } from 'services/storage';
import * as serviceWorker from './serviceWorker';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const token = getUserToken();

const { REACT_APP_API_PATH } = process.env;

console.log(REACT_APP_API_PATH);

const httpLink = createUploadLink({
  uri: `${REACT_APP_API_PATH}/graphql`,
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions}) => {
      switch(extensions.code) {
        case 'UNAUTHENTICATED':
          if (unAuthedPaths.indexOf(window.location.pathname) === -1) {
            removeUserToken();
            window.location.href = '/login';
          }
          break;
        default:
          break;
      }
    });
});

// const wsLink = new WebSocketLink({
//   uri: `${REACT_APP_WS_PATH}/graphql`,
//   options: {
//     reconnect: true,
//   },
// });

const splitLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // wsLink,
  httpLink,
);

const target = document.querySelector('#root');
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
  defaultOptions,
});

render(
  <ApolloProvider client={client}>
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <App />
        <ToastContainer />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  target
);

serviceWorker.register();
