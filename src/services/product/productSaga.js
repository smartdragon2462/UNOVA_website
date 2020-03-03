import { put, takeEvery, call, all } from 'redux-saga/effects';
// Import Actions
import {
    getProductsSucceed,
    getProductsFailed,
    getProductSucceed,         
    getProductFailed, 
} from './productActions';

// Import API
import * as productApi from './productApi';

export function* productSubscriber() {
  yield all([takeEvery('GET_PRODUCTS', getProducts)]);
  yield all([takeEvery('GET_PRODUCT', getProduct)]);
}

export function* getProducts({ payload: { params } }) {
  try {
    const products = yield call(productApi.getProducts, params);
    yield put(getProductsSucceed(products));
  } catch (error) {
    yield put(getProductsFailed(error));
  }
}

export function* getProduct({ payload: { id } }) {
  try {
    const product = yield call(productApi.getProductWithId, id);
    yield put(getProductSucceed(product));
  } catch (error) {
    yield put(getProductFailed(error));
  }
}
