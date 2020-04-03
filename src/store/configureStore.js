import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer, initialState}  from './../reducers/index';
import thunk from 'redux-thunk';
 import {createBrowserHistory} from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

const history = createBrowserHistory();



export default function configureStore(state = initialState) {

	//I added tab sync although it may be not needed in this task, only to sync favourites
  const store = composeWithDevTools(applyMiddleware(thunk, createStateSyncMiddleware(state)))(createStore)(rootReducer, state);
  if (module.hot) {
    module.hot.accept('./../reducers', () => {
      const nextRootReducer = require('./../reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  initStateWithPrevTab(store);

  return store
}

export {history};