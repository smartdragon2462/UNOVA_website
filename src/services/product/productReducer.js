import { handleActions } from 'redux-actions';

import {
    getProducts,
    getProductsSucceed,
    getProductsFailed,
    getProduct,
    getProductFailed,
    getProductSucceed,
    updateCarts
} from './productActions';

const defaultState = {
  products: null,
  error: null,
  loading: false,
  message: '',
  success: false,
  currentProduct: null,
  carts: new Set()
};

const reducer = handleActions(
  {
    [getProducts](state){
      return {
        ...state,
        error: null,
        loading: true,
        message: 'Generating products listing...'
      };
    },
    [getProductsFailed](state, { payload: error }) {
      return {
        ...state,
        error,
        loading: false
      };
    },
    [getProductsSucceed](
      state,
      {
        payload: { products }
      }
    ) {
      return {
        ...state,
        loading: false,
        message:"success",
        products
      };
    },
    [getProduct](
      state,
      {
        payload: { id }
      }
    ) {
      return {
        ...state,
        loading: true,
        success: false,
        message: 'Getting Products info...'
      };
    },
    [getProductSucceed](
      state,
      {
        payload: { Product }
      }
    ) {
      return {
        ...state,
        loading: false,
        message: '',
        currentProduct: Product
      };
    },
    [getProductFailed](
      state,
      {
        payload: { error }
      }
    ) {
      return {
        ...state,
        loading: false,
        success: false,
        message: 'Getting Product info failed',
        currentProduct: null
      };
    },
    [updateCarts](
      state,
      {
        payload: { carts }
      }
    ) {
      return {
        ...state,
        loading: false,
        message: '',
        carts: carts
      };
    },
  },
  defaultState
);

export default reducer;
