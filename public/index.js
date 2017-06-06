import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import reducers from './reducers/index';
import App from './app/App';

const middleWare = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger());
}

const reducer = (state = {}) => state;
const store = createStore(reducer, applyMiddleware(...middleWare));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
