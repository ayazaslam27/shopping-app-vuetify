import caller from "./apiCaller";

var url = {
  categoriesUrl: "/category/getCategories",
  productsUrl: "/products/getProducts",
  topProductsUrl: "/products/getTopProducts",
  totalProductsUrl: "/products/getTotalProducts",
  newUserRegisterUrl: "/user/register/",
  loginUrl: "/user/login/",
  orderUrl: "/buy/"
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

var order = function(params) {
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
  getTotalProducts: getTotalProducts,
  getTopProducts: getTopProducts,
  register: register,
  login: login,
  order: order
};
