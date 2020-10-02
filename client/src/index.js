import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import userReducer from './store/reducers/user';
import cartReducer from './store/reducers/cart';
import productsReducer from './store/reducers/products';
import { Provider } from 'react-redux';

import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productsReducer
});

const logger = store => {
  return next => {
    return action => {
      console.log('[Dispatching]', action)
      const result = next(action)
      console.log('next state', store.getState())
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
