const actions = {
  setCategories({ commit }, categories) {
    commit("SET_CATEGORIES", categories);
  },

  setItems({ commit }, items) {
    commit("SET_ITEMS", items);
  },

  setMenu({ commit }, menu) {
    commit("SET_MENU", menu);
  },

  addToCart({ commit }, item) {
    commit("ADD_TO_CART", item);
    commit("UPDATE_TOTAL_ITEMS_IN_CART", "increment");
  },

  removeFromCart({ commit }, item) {
    commit("REMOVE_FROM_CART", item);
    commit("UPDATE_TOTAL_ITEMS_IN_CART", "decrement");
  },

  setTopProducts({ commit }, topProducts) {
    commit("SET_TOPPRODUCTS", topProducts);
  },

  setUserAuthentication({ commit }, isAuthenticated) {
    commit("SET_AUTHENTICATION", isAuthenticated);
  },

  setUserInfo({ commit }, info) {
    commit("SET_USER_INFO", info);
  },

  setPaypalObject({ commit }, object) {
    commit("SET_PAYPAL_OBJECT", object);
  },

  setAppVersion({ commit }, isMobileVersion) {
    commit("SET_APP_VERSION", isMobileVersion);
  }
};

export default {
  setCategories: actions.setCategories,
  setItems: actions.setItems,
  setMenu: actions.setMenu,
  addToCart: actions.addToCart,
  removeFromCart: actions.removeFromCart,
  setTopProducts: actions.setTopProducts,
  setUserAuthentication: actions.setUserAuthentication,
  setUserInfo: actions.setUserInfo,
  setPaypalObject: actions.setPaypalObject,
  setAppVersion: actions.setAppVersion
};
