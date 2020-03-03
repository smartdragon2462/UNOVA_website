import { createActions } from 'redux-actions';
const {
  getProducts,
  getProductsSucceed,
  getProductsFailed,
  getProduct,                
  getProductSucceed,         
  getProductFailed,      
  
  getCarts,
  addCart,
  updateCarts,
  //----------------------------------------
  deleteProduct,             ///////////////
  deleteProductSucceed,      ///////////////
  deleteProductFailed,       ///////////////
  updateProduct,             ///////////////
  updateProductSucceed,      ///////////////
  updateProductFailed,
  addProduct,                // ADMIN PART /
  addProductSucceed,
  addProductFailed,          ///////////////
  updateCurrentProduct       ///////////////
  //----------------------------------------
} = createActions({
  GET_PRODUCTS: params => ({ params }),
  GET_PRODUCTS_SUCCEED: products => ({ products }),
  GET_PRODUCTS_FAILED: error => ({ error }),
  GET_CARTS: () => ({}),
  ADD_CART: id => ({id}),
  UPDATE_CARTS: carts => ({carts}),
  DELETE_PRODUCT: id => ({ id }),
  DELETE_PRODUCT_SUCCEED: () => ({}),
  DELETE_PRODUCT_FAILED: error => ({ error }),
  UPDATE_PRODUCT: (id, Product, params = null) => ({ id, Product, params }),
  UPDATE_PRODUCT_SUCCEED: () => ({}),
  UPDATE_PRODUCT_FAILED: error => ({ error }),
  ADD_PRODUCT: (Product, params = null) => ({ Product, params }),
  ADD_PRODUCT_SUCCEED: () => ({}),
  ADD_PRODUCT_FAILED: error => ({ error }),
  GET_PRODUCT: id => ({ id }),
  GET_PRODUCT_SUCCEED: Product => ({ Product }),
  GET_PRODUCT_FAILED: error => ({ error }),
  UPDATE_CURRENT_PRODUCT: Product => ({ Product })
});

export {
  getProducts,
  getProductsSucceed,
  getProductsFailed,
  getCarts,
  addCart,
  updateCarts,
  deleteProduct,
  deleteProductFailed,
  deleteProductSucceed,
  updateProduct,
  updateProductFailed,
  updateProductSucceed,
  addProduct,
  addProductFailed,
  addProductSucceed,
  getProduct,
  getProductFailed,
  getProductSucceed,
  updateCurrentProduct
};
