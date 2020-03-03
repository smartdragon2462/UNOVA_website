import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
// Import reducers
import * as reducers from './services/reducer';
//import Saga subscriber
import { productSubscriber } from './services/product/productSaga';



const initialState = {};
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const reducer = combineReducers({
  ...reducers,
  form: formReducer
});

const store = createStore(reducer, initialState, composedEnhancers);

/**
 * Run saga subscribers
 */
sagaMiddleware.run(productSubscriber);

export default store;
