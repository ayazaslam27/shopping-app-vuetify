<template>
  <div class="products d-flex" :class="[isMobileVersion? 'flex-column': 'flex-row']">
    <div :class="[isMobileVersion? 'col-12': 'col-9']" class="d-flex">
      <router-link
        :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"
        class="h-100"
      >
        <div class="d-flex flex-row main_link">
          <img
            class="col-4"
            :width="[isMobileVersion? '225': '195']"
            :height="[isMobileVersion? '145': '195']"
            :src="item.imgSource"
          >
          <div class="d-flex flex-column pt-4 col-8">
            <span>{{item.title}}</span>
            <div class="stars-outer">
              <div
                class="stars-inner"
                :style="[{'width': `${Math.round((this.item.rating / 5) * 100)}%`}]"
              ></div>
            </div>
            <span v-if="!isMobileVersion" class="short_description">{{item.description}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <div
      :class="[isMobileVersion? 'col-12': 'col-3 pt-4']"
      class="right d-flex flex-column d-inline-block"
    >
      <div v-if="!isMobileVersion" class="availability flex-column d-flex pb-1">
        <span class="availability pb-1">sofort ab Lager</span>
        <span class="highlight_red pb-1">24h Express</span>
      </div>
      <div class="pb-1" :class="[isMobileVersion? 'float-right d-flex justify-content-end':'']">
        <span class="dp-inbl numeric-field">{{item.price}} €</span>
      </div>
      <div v-if="!isMobileVersion" class="savings pb-1">
        <div class="numeric-field old-price">Regular: {{item.oldPrice}} €</div>
      </div>
      <div
        v-if="!isMobileVersion"
        class="savings_amount highlight_red pb-1 numeric-field"
      >Ersparnis: {{item.oldPrice - item.price}} € ({{Math.round(((item.oldPrice - item.price) / item.oldPrice)* 100)}}%)</div>
      <div class="add_to_basket mt-1 mb-3">
        <button class="btn we-sell-button w-100" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
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
  font-size: x-small;
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