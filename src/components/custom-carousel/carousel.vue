<template>
<v-container grid-list-md text-xs-center>
 <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text>{{title}}</v-card-text>
        </v-card>
      </v-flex>

    <slider :settings="settings">
      <slide v-for="(item, index) in items" :key="index + 'S'">
        <v-card  d-flex xs12>
          <v-flex d-flex>
            <router-link
            :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"      
            >
          <v-flex d-flex row>
              <v-flex xs4>
                <img
                  :width="[mobileVersion? 75 : 150]"
                  :height="[mobileVersion? 75 : 150]"
                  :src="item.thumbnail"
                >
              </v-flex>
            <v-flex pb-4 xs6>
                <div class="product-title">{{item.title}}</div>
                 <div class="text-xs-center">
                  <v-rating v-model="item.rating"></v-rating>
                </div>
                <div class=" old-price" >Old: {{item.oldPrice}}</div>
                <div>New: {{item.price}}</div>
            </v-flex>
            </v-flex>
          </router-link>
          </v-flex>
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
        centerMode: false, 
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
.product-title{
  width: 20em;
    height: 6em;
}
</style>


