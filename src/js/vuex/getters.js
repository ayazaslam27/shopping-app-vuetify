var getters = {
  getCategories: function(state) {
    return state.categories;
  },

  getItems: function(state) {
    return state.items;
  },

  getMenu: function(state) {
    return state.menu;
  },

  getCartItems: function(state) {
    return state.cartItems;
  },

  getTotalCartItems: function(state) {
    return state.totalCartItems;
  },

  getTopProducts: function(state) {
    return state.topProducts;
  },

  isUserAuthenticated: function(state) {
    return state.isAuthenticated;
  },

  getUser: function(state) {
    return state.user;
  },

  getPaypalObject: function(state) {
    return state.paypalObject;
  },

  isMobileVersion: function(state) {
    return state.isMobileVersion;
  }
};

export default {
  getCategories: getters.getCategories,
  getItems: getters.getItems,
  getTotalCartItems: getters.getTotalCartItems,
  getMenu: getters.getMenu,
  getCartItems: getters.getCartItems,
  getTopProducts: getters.getTopProducts,
  isUserAuthenticated: getters.isUserAuthenticated,
  getUser: getters.getUser,
  getPaypalObject: getters.getPaypalObject,
  isMobileVersion: getters.isMobileVersion
};
