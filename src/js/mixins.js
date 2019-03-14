export const eventMixin = {
  data() {
    return {
      showCart: false,
      openSideMenu: false
    };
  },
  mounted() {
    this.update();

    this.$nextTick(() => {
      window.addEventListener("resize", this.update);
    });

    this.$on("showCartEvent", val => {
      this.showCart = val;
    });

    this.$on("toggleSideMenu", val => {
      this.openSideMenu = val;
    });
  },
  methods: {
    update() {
      if (window.outerWidth < 1000) {
        this.showCart = false;
        this.$store.dispatch("setAppVersion", true);
      } else {
        this.$store.dispatch("setAppVersion", false);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.update);
  }
};
