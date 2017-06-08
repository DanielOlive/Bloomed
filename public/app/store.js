import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers/';

const middleWare = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger());
}

export default createStore(reducer, applyMiddleware(...middleWare));
