// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
// import thunk from 'redux-thunk';
// import { createBrowserHistory } from 'history'; // eslint-disable-line import/no-extraneous-dependencies
// import rootReducer from '../modules/';
//
// export const history = createBrowserHistory();
//
// const initialState = {};
// const enhancers = [];
// const middleware = [
//   thunk,
//   routerMiddleware(history)
// ];
//
// if (process.env.NODE_ENV === 'development') {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
//
//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }
//
// const composedEnhancers = compose(
//   applyMiddleware(...middleware),
//   ...enhancers
// );
//
// const store = createStore(
//   rootReducer,w
//   initialState,
//   composedEnhancers
// );
//
// export default store;

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../modules';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

  return store
}
