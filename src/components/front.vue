<template>
  <v-layout class="pt-2" :class="[mobileVersion? 'column' : 'row']">
    <v-flex sm3 md3 lg2>
      <SideBar :style="openSideMenuStyle"/>
    </v-flex>
    <v-flex sm9 md10 lg10 px-4>
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
      } else if (!this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(0%)`;
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