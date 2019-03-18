<template>
  <slider :imageUrl="firstImage">
    <template v-for="(item, index) in images">
      <slide :item="item" :key="index + '-IS'">
        <v-img :src="item.imageUrl" aspect-ratio="1"></v-img>
      </slide>
    </template>
  </slider>
</template>

<script>
import slider from "./image-slider";
import slide from "./image-slide";
export default {
  name: "image-carousel",
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  computed: {
    firstImage() {
      var imageUrl = this.images[0].imageUrl;
      return imageUrl;
    }
  },
  components: {
    slider,
    slide
  }
};
</script>
