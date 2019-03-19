import Vue from "vue";
var mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  SET_ITEMS(state, items) {
    state.items = items;
  },

  SET_MENU(state, menu) {
    state.menu = menu;
  },

  ADD_TO_CART(state, item) {
    var filteredItem = state.cartItems.find(
      x => x.articleNumber == item.articleNumber && x.brand == item.brand
    );
    if (filteredItem !== undefined) {
      filteredItem.quantity = filteredItem.quantity + 1;
    } else {
      Vue.set(item, "quantity", 1);
      state.cartItems.push(item);
    }
  },

  REMOVE_FROM_CART(state, item) {
    var filteredItem = state.cartItems.find(
      x => x.articleNumber == item.articleNumber && x.brand == item.brand
    );
    if (filteredItem.quantity > 1) {
      filteredItem.quantity = filteredItem.quantity - 1;
    } else {
      let index = state.cartItems.indexOf(filteredItem);
      if (index > -1) {
        state.cartItems.splice(index, 1);
      }
    }
  },

  UPDATE_TOTAL_ITEMS_IN_CART(state, action) {
    if (action == "increment") {
      state.totalCartItems = state.totalCartItems + 1;
    } else if (action == "decrement" && state.totalCartItems > 0) {
      state.totalCartItems = state.totalCartItems - 1;
    }
  },

  SET_TOPPRODUCTS(state, topProducts) {
    state.topProducts = topProducts;
  },

  SET_AUTHENTICATION(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },

  SET_USER_INFO(state, info) {
    state.user = info;
  },

  SET_PAYPAL_OBJECT(state, object) {
    state.paypalObject = object;
  },

  SET_APP_VERSION(state, isMobileVersion) {
    state.isMobileVersion = isMobileVersion;
  }
};

export default {
  SET_CATEGORIES: mutations.SET_CATEGORIES,
  SET_ITEMS: mutations.SET_ITEMS,
  SET_MENU: mutations.SET_MENU,
  ADD_TO_CART: mutations.ADD_TO_CART,
  REMOVE_FROM_CART: mutations.REMOVE_FROM_CART,
  UPDATE_TOTAL_ITEMS_IN_CART: mutations.UPDATE_TOTAL_ITEMS_IN_CART,
  SET_TOPPRODUCTS: mutations.SET_TOPPRODUCTS,
  SET_AUTHENTICATION: mutations.SET_AUTHENTICATION,
  SET_USER_INFO: mutations.SET_USER_INFO,
  SET_PAYPAL_OBJECT: mutations.SET_PAYPAL_OBJECT,
  SET_APP_VERSION: mutations.SET_APP_VERSION
};
