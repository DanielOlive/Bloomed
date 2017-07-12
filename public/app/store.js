import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers/';

const middleWare = [ thunk ];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
/* eslint-enable */
if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger());
}

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleWare))
);
