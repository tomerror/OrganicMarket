import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

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

const store = createStore(rootReducer);

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
