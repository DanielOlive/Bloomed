import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { testreducer } from './app/reducers/';
import App from './app/App';

const middleWare = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger());
}

const store = createStore(testreducer, applyMiddleware(...middleWare));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
