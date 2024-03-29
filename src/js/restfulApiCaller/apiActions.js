﻿import caller from "./apiCaller";

var url = {
  categoriesUrl: "/category/getCategories",
  productsUrl: "/products/getProducts",
  productUrl: "/products/getProduct",
  topProductsUrl: "/products/getTopProducts",
  totalProductsUrl: "/products/getTotalProducts",
  newUserRegisterUrl: "/user/register/",
  loginUrl: "/user/login/",
  canOrderUrl: "/buy/",
  orderUrl: "/buy/placeOrder"
};

var getCategories = function() {
  return new Promise((resolve, reject) => {
    caller
      .get(url.categoriesUrl)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var getProducts = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .get(url.productsUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var getTotalProducts = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .get(url.totalProductsUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var getProduct = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .get(url.productUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var getTopProducts = function() {
  return new Promise((resolve, reject) => {
    caller
      .get(url.topProductsUrl)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var register = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .post(url.newUserRegisterUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var login = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .post(url.loginUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var canOrder = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .post(url.canOrderUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

var placeOrder = function(params) {
  return new Promise((resolve, reject) => {
    caller
      .post(url.orderUrl, params)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  getCategories: getCategories,
  getProducts: getProducts,
  getProduct: getProduct,
  getTotalProducts: getTotalProducts,
  getTopProducts: getTopProducts,
  register: register,
  login: login,
  canOrder: canOrder,
  placeOrder: placeOrder
};
