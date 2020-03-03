import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/** Import service reducers */
import productReducer from '../services/product/productReducer';

const servicesReducer = combineReducers({
  product:productReducer
});

export default combineReducers({
  routing: routerReducer,
  services: servicesReducer
});
