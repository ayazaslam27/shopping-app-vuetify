<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text>{{title}}</v-card-text>
        </v-card>
      </v-flex>

      <slider v-if="items.length > 0" :settings="settings">
        <slide v-for="(item, index) in items" :key="index + 'S'">
          <v-card class="card" d-flex>
            <router-link
              :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"
            >
              <v-layout d-flex :class="[mobileVersion ? 'column': 'row']">
                <v-flex :class="[mobileVersion ? 'xs12': 'pl-3 xs4']">
                  <v-img :src="item.thumbnail" aspect-ratio="1"></v-img>
                </v-flex>
                <v-flex :class="[mobileVersion ? 'xs12 ': 'xs8 pt-4 pr-5']">
                  <div class="product-title">{{item.title}}</div>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 pb-4>
                  <div class="text-xs-center">
                    <v-rating v-model="item.rating"></v-rating>
                  </div>
                  <div class="old-price">Old: {{item.oldPrice}}</div>
                  <div>New: {{item.price}}</div>
                </v-flex>
              </v-layout>
            </router-link>
          </v-card>
        </slide>
      </slider>
    </v-layout>
  </v-container>
</template>

<script>
import slider from "./slider";
import slide from "./slide";
export default {
  name: "carousel",
  data() {
    return {
      settings: {
        vertical: false,
        mouseDrag: true,
        // toggle touch dragging
        touchDrag: true,
        // toggle mouse wheel sliding
        wheelControl: true,
        infiniteScroll: true,
        // sliding transition time in ms
        transition: 1000,
        initialSlide: 0,
        // count of items to slide when use navigation buttons
        itemsToSlide: 1,
        centerMode: false
      }
    };
  },
  computed: {
    items() {
      return this.$store.getters.getTopProducts;
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    slide,
    slider
  }
};
</script>

<style>
.card {
  height: 100%;
}
</style>


