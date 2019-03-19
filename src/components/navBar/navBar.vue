<template>
  <v-toolbar dense :extended="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
    <v-layout wrap>
      <v-flex xs2 order-sm1 class="hidden-md-and-up">
        <v-toolbar-side-icon v-on:click="toggleSideMenu"></v-toolbar-side-icon>
      </v-flex>

      <v-flex xs6 sm8 md7 order-sm2 pt-2>
        <v-toolbar-title class="white--text">
          <router-link to="/">
            <span class="brand-heading">We Sell</span>
          </router-link>
        </v-toolbar-title>
      </v-flex>

      <v-flex xs12 sm12 md3 order-xs5 order-sm5 order-md3>
        <v-text-field class="pr-4" append-icon="search" placeholder="Search" clearable sm4></v-text-field>
      </v-flex>

      <v-flex v-if="!isUserLoggedIn" xs2 sm1 md1 order-sm3 order-md4 class="navigation-link">
        <v-btn flat :to="{name: 'registration'}">
          <v-icon class="icon fas fa-user-circle"></v-icon>
          <span class="hidden-md-and-down pl-2">Account</span>
        </v-btn>
      </v-flex>

      <v-flex v-if="isUserLoggedIn" xs2 sm1 md1 order-sm3 order-md4 class="navigation-link">
        <v-menu :nudge-width="150">
          <v-btn flat slot="activator">
            <v-icon class="icon fas fa-user-circle pr-3"></v-icon>
            <span class="hidden-md-and-down">{{loggedInUser.name}}</span>
          </v-btn>

          <v-list>
            <v-list-tile @click="goToProfile">
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>

      <v-flex xs2 sm1 md1 order-sm3 order-md4 class="navigation-link">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="500">
          <v-btn flat slot="activator">
            <v-icon class="icon fas fa-shopping-cart"></v-icon>
            <span class="hidden-md-and-down pl-2">Cart</span>
          </v-btn>

          <v-card v-if="count > 0">
            <cart></cart>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn flat large @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" flat large @click="checkout" :to="{name: 'checkout'}">Checkout</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import cart from "@/components/cart/cart";
export default {
  name: "NavBar",
  data() {
    return {
      openSideMenu: false,
      menu: false
    };
  },

  methods: {
    toggleSideMenu() {
      this.openSideMenu = !this.openSideMenu;
      this.$emit("toggleSideMenu", this.openSideMenu);
    },
    logout() {
      this.$store.dispatch("setUserAuthentication", false);
      this.$store.dispatch("setUserInfo", {});
      this.$router.push("/");
    },
    goToProfile() {},
    checkout() {
      this.menu = false;
    }
  },
  watch: {
    count(count) {
      if (count == 0) {
        this.menu = false;
      }
    }
  },
  computed: {
    count() {
      return this.$store.getters.getTotalCartItems;
    },
    loggedInUser() {
      return this.$store.getters.getUser;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  components: {
    cart
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
.navigation-link {
  display: flex;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
}

@media only screen and (max-width: 960px) {
  .v-toolbar__content {
    padding-top: 4.2em !important;
  }
}
@media only screen and (min-width: 960px) {
  .v-toolbar__content {
    padding-top: 1.2em !important;
  }
}
</style>
