﻿<template>
  <v-layout column>
    <v-flex text-xs-center>
      <v-card dark color="primary">
        <v-card-text>Products</v-card-text>
      </v-card>
    </v-flex>

    <template v-for="(item, index) in reativeItems">
      <v-container grid-list-md :key="index + 'PB'">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 3}`" class="card" d-flex>
            <banner :item="item"></banner>
          </v-card>
        </v-hover>
      </v-container>
    </template>
    <div class="text-xs-center" v-if="reativeItems.length > 0">
      <v-container>
        <v-layout justify-center>
          <v-flex xs8>
            <v-pagination
              circle
              v-model="currentPage"
              :length="Math.round(totalItems/params.limit)"
            ></v-pagination>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-layout>
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

