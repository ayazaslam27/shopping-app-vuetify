<template>
  <section>
    <template v-for="(item, index) in reativeItems">
      <banner :item="item" :key="index + 'PB'"></banner>
    </template>

    <div v-if="reativeItems.length > 0" class="mt-3 text-center">
      <!-- <b-pagination
        align="center"
        :total-rows="totalItems"
        v-model="currentPage"
        :per-page="params.limit"
      />-->
    </div>
  </section>
</template>

<script>
import banner from "./ProductBanner";
import apiActions from "../js/restfulApiCaller/apiActions";
export default {
  name: "products",
  data() {
    return {
      totalItems: 0,
      currentPage: 1,
      params: {
        limit: 4,
        pageNo: 1,
        brand: "",
        category: ""
      }
    };
  },
  computed: {
    reativeItems() {
      return this.$store.getters.getItems;
    }
  },
  mounted() {
    this.getProducts();
    this.getTotalPagesCount();
  },
  watch: {
    currentPage(val) {
      this.params.pageNo = val;
      this.getProducts();
    },
    $route(to, from) {
      this.getProducts();
      this.getTotalPagesCount();
    }
  },
  methods: {
    getProducts() {
      var that = this;
      this.params.category = this.$route.params.category;
      this.params.brand = this.$route.params.brand;

      apiActions
        .getProducts(this.params)
        .then(result => {
          that.$store.dispatch("setItems", result);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTotalPagesCount() {
      let that = this;
      var params = {
        category: this.$route.params.category,
        brand: this.$route.params.brand
      };

      apiActions
        .getTotalProducts(params)
        .then(result => {
          that.totalItems = result;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    banner
  }
};
</script>

