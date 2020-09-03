import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import exampleReducer from './base';
import settingsReducer from './settings';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  example: exampleReducer,
  settings: settingsReducer,
})

export default createRootReducer;
