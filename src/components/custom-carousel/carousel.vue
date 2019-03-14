<template>
  <section v-if="items.length > 0">
    <div class="h4 d-flex justify-content-center carousel-heading-background">
      <em
        class="heading-title-carousel"
        :style="[!mobileVersion? {'font-size': '1.2em'}:{}]"
      >{{title}}</em>
    </div>

    <slider :settings="settings">
      <slide v-for="(item, index) in items" :key="index + 'S'">
        <router-link
          :to="{ name: 'detail-article', params: { brand: item.brand,  id: item.articleNumber }}"
          class="w-100"
        >
          <div :class="[mobileVersion? 'flex-column': 'flex-row']" class="d-flex">
            <div class="d-flex justify-content-center">
              <img
                :width="[mobileVersion? 75 : 100]"
                :height="[mobileVersion? 75 : 100]"
                :src="item.thumbnail"
              >
            </div>

            <div
              :class="[mobileVersion? 'pt-1': 'pl-2']"
              class="d-flex flex-column text justify-content-center"
            >
              <span class="text" :class="[mobileVersion? 'small-text': '']">{{item.title}}</span>
              <div class="stars-outer">
                <div
                  class="stars-inner"
                  :style="[{'width': `${Math.round(((item.rating) / 5) * 100)}%`}]"
                ></div>
              </div>
              <span
                class="numeric-field old-price"
                :class="[mobileVersion? 'small-text': '']"
              >Old: {{item.oldPrice}}</span>
              <span
                class="numeric-field"
                :class="[mobileVersion? 'small-text': '']"
              >New: {{item.price}}</span>
            </div>
          </div>
        </router-link>
      </slide>
    </slider>
  </section>
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
.small-text {
  font-size: small;
}
.text {
  word-wrap: unset;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel-heading-background {
  background: orangered;
}

.heading-title-carousel {
  color: white;
  font-size: normal;
  font-weight: bold;
}
</style>

