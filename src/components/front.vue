<template>
  <v-layout :class="[mobileVersion? 'column': 'row']" justify-space-between>
    <v-flex xs3 :class="[mobileVersion? 'order-2': 'order-1']">
      <SideBar :style="openSideMenuStyle"/>
    </v-flex>
    <v-flex xs10 :class="[mobileVersion? 'order-1': 'order-2']">
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
import SideBar from "../components/sideMenu/sideBar.vue";
import { eventMixin } from "@/js/mixins";
export default {
  name: "front",
  props: {
    shouldOpenSideMenu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    openSideMenuStyle() {
      if (this.shouldOpenSideMenu && this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(0%)`;
      } else if (!this.shouldOpenSideMenu && this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(-120%)`;
      } else {
        return "";
      }
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  components: {
    SideBar
  },
  mixins: [eventMixin]
};
</script>