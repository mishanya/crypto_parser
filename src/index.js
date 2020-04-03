import 'babel-polyfill'
import React, { Component } from "react";
import ReactDOM from "react-dom";
import configureStore, {history} from './store/configureStore'
import {loadState, saveState} from './store/localStorage'
import {Provider} from 'react-redux'
import App from './containers/App'

let persistedState  = loadState();

const store = configureStore(persistedState);
store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
       <App />
   </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const App = require('./containers/App').default;
    ReactDOM.render(
      <Provider store={store}>
           <App />
       </Provider>,
      document.getElementById('app')
    );
  });
}
