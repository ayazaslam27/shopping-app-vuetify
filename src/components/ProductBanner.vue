<template>
  <v-layout wrap>
    <v-flex xs12 sm12 md12 lg8>
      <router-link
        :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"
      >
        <v-layout wrap class="main_link">
          <v-flex xs12 sm12 md12 lg4 class="image">
            <v-img :src="item.imgSource" :max-width="195"></v-img>
          </v-flex>

          <v-flex xs12 sm12 md12 lg8 class="text-xs-center">
            <v-flex py-2>{{item.title}}</v-flex>
            <v-rating v-model="item.rating" background-color="orange lighten-3" color="orange"></v-rating>
            <span class="short_description hidden-sm-and-down">{{item.description}}</span>
          </v-flex>
        </v-layout>
      </router-link>
    </v-flex>
    <v-flex xs12 sm12 md12 lg4 class="text-xs-center">
      <v-flex>
        <v-flex class="availability">Available</v-flex>
        <v-flex class="availability hidden-sm-and-down">24h Express</v-flex>
      </v-flex>
      <v-flex d-flex>
        <span class="numeric-field">{{item.price}} €</span>
      </v-flex>
      <v-flex v-if="!isMobileVersion">
        <span class="numeric-field hidden-sm-and-down">Normal Price:</span>
        <span class="numeric-field old-price hidden-sm-and-down">{{item.oldPrice}} €</span>
      </v-flex>
      <v-flex
        v-if="!isMobileVersion"
        class="numeric-field"
      >Save upto: {{item.oldPrice - item.price}} € ({{Math.round(((item.oldPrice - item.price) / item.oldPrice)* 100)}}%)</v-flex>
      <v-flex px-3>
        <v-btn class="custom-button" outline color="primary" @click="addToCart">Add to Cart</v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "product-banner",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.item);
    }
  },
  computed: {
    isMobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>

<style>
a {
  color: black;
  text-decoration: none !important;
}

.old-price {
  text-decoration: line-through !important;
  text-decoration-color: red !important;
}
.availability {
  color: green;
  font-weight: bold;
}
.custom-button {
  width: 100% !important;
}
</style>