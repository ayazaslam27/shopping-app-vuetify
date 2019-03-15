<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <navigation app v-on:toggleSideMenu="toggleSideMenu"/>
        <v-layout :class="[mobileVersion? 'column' : 'row']">
          <sideBar class="mt-1" :style="openSideMenuStyle"/>
          <v-flex :class="[mobileVersion? 'xs12' : 'xs10']" pt-4>
            <!-- <router-view></router-view> -->
          </v-flex>
        </v-layout>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import navigation from "@/components/navBar/navBar.vue";
import sideBar from "@/components/sideMenu/sideBar.vue";
import apiActions from "./js/restfulApiCaller/apiActions";
import jwt from "jsonwebtoken";
import "@fortawesome/fontawesome-free/css/all.css";
import { eventMixin } from "./js/mixins";

export default {
  name: "app",
  data() {
    return {
      showSideMenu: false
    };
  },
  mounted() {
    setInterval(this.checkTokenExpiration(), 1000); //
  },
  created() {
    document.title = "We Sell";
  },
  beforeMount() {
    this.getCategories();
    this.getProducts();
  },
  methods: {
    getCategories: function() {
      var that = this;
      apiActions
        .getCategories()
        .then(result => {
          that.$store.dispatch("setCategories", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProducts() {
      var that = this;
      apiActions
        .getTopProducts()
        .then(result => {
          that.$store.dispatch("setTopProducts", result);
        })
        .catch(error => console.log(error));
    },
    checkTokenExpiration() {
      let token = localStorage.getItem("token");
      if (token !== null) {
        let decodedToken = jwt.decode(token);
        let expiredTime = decodedToken.exp;
        let isTokenValid = expiredTime > Date.now() / 1000;
        if (!isTokenValid) {
          localStorage.clear();
        }
      }
    },
    toggleSideMenu(val) {
      this.showSideMenu = val;
    }
  },
  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    },
    openSideMenuStyle() {
      if (this.showSideMenu && this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(0%)`;
      } else if (!this.showSideMenu && this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(-120%)`;
      } else if (!this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(0%)`;
      }
    }
  },
  components: {
    navigation,
    sideBar
  },
  mixins: [eventMixin]
};
</script>
<style>
</style>





