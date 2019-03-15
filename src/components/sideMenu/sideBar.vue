<template>
  <v-navigation-drawer class="sidebar" value="true" v-click-outside="clickedOutside">
    <v-list>
      <v-list-group v-for="(item, index) in menu" :key="index + '-SB'">
        <v-list-tile :to="{ name: 'main-category', params: {category: item.Name}}" slot="activator">
          <v-list-tile-action class="sidebar-icons" justify-center>
            <v-icon v-text="item.icon" class="icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{item.Name}}</v-list-tile-title>
        </v-list-tile>
        <template v-for="(childItem, index) in item.Brands">
          <v-list-tile
            class="pl-4"
            :key="index + '-SBC'"
            :to="{ name: 'main-category-with-brand', params: {category: item.Name, brand: childItem.Name}}"
          >
            <v-list-tile-title v-text="childItem.Name"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon class="icon" v-text="childItem.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      openSideMenu: false
    };
  },
  computed: {
    menu() {
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    clickedOutside() {
      this.$emit("clickedoutside");
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
<style>
.icon {
  color: dodgerblue !important;
}

@media only screen and (max-width: 812px) {
  .sidebar {
    position: absolute !important;
    top: 4.2em !important;
    width: 250px !important;
  }
}
@media only screen and (max-width: 812px) {
  .sidebar {
    position: absolute !important;
    top: 4.2em !important;
    width: 250px !important;
  }
}
</style>
