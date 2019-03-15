<template>
  <v-layout d-flex :class="[isMobileVersion ? 'column': 'row']" wrap xs12>
    <v-flex :class="[isMobileVersion? 'xs12': 'xs8']" d-flex>
      <router-link
        :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"
      >
        <v-layout row class="main_link">
          <v-flex :class="[isMobileVersion ? 'xs12': 'px-3 xs5']">
            <v-img :src="item.imgSource" aspect-ration="1"></v-img>
          </v-flex>

          <v-layout xs7 column>
            <v-flex class="pb-5">
              <span>{{item.title}}</span>
              <v-rating v-model="item.rating"></v-rating>
              <span v-if="!isMobileVersion" class="short_description">{{item.description}}</span>
            </v-flex>
          </v-layout>
        </v-layout>
      </router-link>
    </v-flex>
    <v-layout column :class="[isMobileVersion? 'xs12': 'xs4 pt-3']">
      <v-layout row>
        <span class="availability pb-1">sofort ab Lager</span>/
        <span class="highlight_red pb-1">24h Express</span>
      </v-layout>
      <v-flex d-flex class="pb-1">
        <span class="dp-inbl numeric-field">{{item.price}} €</span>
      </v-flex>
      <v-flex v-if="!isMobileVersion" class="pb-1">
        <div class="numeric-field old-price">Regular: {{item.oldPrice}} €</div>
      </v-flex>
      <v-flex
        v-if="!isMobileVersion"
        class="pb-1 numeric-field"
      >Ersparnis: {{item.oldPrice - item.price}} € ({{Math.round(((item.oldPrice - item.price) / item.oldPrice)* 100)}}%)</v-flex>
      <v-flex class="add_to_basket mt-1 mb-3">
        <v-btn class="btn we-sell-button w-100" @click="addToCart">Add to Cart</v-btn>
      </v-flex>
    </v-layout>
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
      this.$store.dispatch("setCartItem", this.item);
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
.products {
  border-bottom: 1px solid lightslategray;
}
a {
  color: black;
  text-decoration: none !important;
}
a:hover {
  color: black;
}

.short_description {
  font-size: small;
}
.right {
  font-size: small;
}
.stars-outer {
  width: 110px;
  display: inline-block;
  position: relative;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: orangered;
}

.stars-outer::before {
  content: "\f005 \f005 \f005 \f005 \f005";
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-inner::after {
  content: "\f005 \f005 \f005 \f005 \f005";
  color: #f8ce0b;
}
.old-price {
  text-decoration: line-through !important;
  text-decoration-color: red !important;
}
.availability {
  font-size: small;
  color: green;
  font-weight: bold;
}
</style>