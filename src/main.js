import Vue from "vue";
import App from "./App.vue";
import router from "./js/router/router";

import store from "./js/vuex/store";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, {
  validity: true,
  aria: true,
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});

import Vuetify from "vuetify";

Vue.use(Vuetify);
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
