<template>
  <v-toolbar>
    <v-toolbar-side-icon class="hidden-md-and-up" v-on:click="toggleSideMenu"></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
      <router-link to="/">
        <span class="brand-heading">We Sell</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-text-field
        class="hidden-sm-and-down pr-4"
        prepend-icon="search"
        placeholder="Search"
        clearable
        sm4
      ></v-text-field>

      <v-btn flat v-if="!isUserLoggedIn" :to="{name: 'registration'}">
        <v-icon class="icon fas fa-user-circle"></v-icon>
        <span class="hidden-md-and-down pl-2">Account</span>
      </v-btn>

      <v-menu v-if="isUserLoggedIn">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on" class="d-flex">
            <v-icon class="icon fas fa-user-circle pr-3"></v-icon>
            <span class="hidden-md-and-down pr-2 pt-3">{{loggedInUser.name}}</span>
          </v-toolbar-title>
        </template>

        <v-list flex>
          <v-list-tile @click="goToProfile">
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        flat
        :to="{name: 'checkout'}"
        @mouseover.native="showCart"
        @mouseleave.native="hideCart"
      >
        <v-icon class="icon fas fa-shopping-cart"></v-icon>
        <span class="hidden-md-and-down pl-2">Cart</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showCartonHover: true,
      openSideMenu: false
    };
  },
  methods: {
    showCart() {
      this.$parent.$emit("showCartEvent", true);
    },
    hideCart() {
      this.$parent.$emit("hideCartEvent");
    },
    toggleSideMenu() {
      this.openSideMenu = !this.openSideMenu;
      this.$emit("toggleSideMenu", this.openSideMenu);
    },
    logout() {
      this.$store.dispatch("setUserAuthentication", false);
      this.$store.dispatch("setUserInfo", {});
      this.$router.push("/");
    },
    goToProfile() {}
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getUser;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserAuthenticated;
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>
<style>
.brand-heading {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: x-large;
  font-weight: bolder;
  font-style: italic;
}
.v-btn {
  padding: 0 6px !important;
  min-width: 0 !important;
}
</style>
