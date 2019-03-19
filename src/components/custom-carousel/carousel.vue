<template>
  <v-layout row wrap text-xs-center>
    <v-flex>
      <v-card dark color="primary">
        <v-card-text>{{title}}</v-card-text>
      </v-card>
    </v-flex>

    <slider v-if="items.length > 0" :settings="settings">
      <slide v-for="(item, index) in items" :key="index + 'S'">
        <v-hover>
          <v-card
            class="card text-xs-center"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 3}`"
            d-flex
          >
            <router-link
              :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"
            >
              <v-layout column>
                <v-flex xs12 sm8 class="image">
                  <v-img
                    :src="item.thumbnail"
                    :lazy-src="item.thumbnail"
                    :max-width="250"
                    aspect-ratio="1.4"
                  ></v-img>
                </v-flex>
                <v-flex class="title-height" xs12 px-3>
                  <div class="product-title">{{item.title}}</div>
                </v-flex>
              </v-layout>
              <v-layout column>
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
        </v-hover>
      </slide>
    </slider>
  </v-layout>
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
.title-height {
  height: 3em;
  overflow: hidden;
}
.image {
  display: flex;
  justify-content: center;
}
</style>


