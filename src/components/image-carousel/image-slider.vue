<template>
  <v-flex ref="imageSlider" class="imageSlider">
    <v-flex class="image-show">
      <v-img :src="imageSource" aspect-ratio="1"></v-img>
    </v-flex>
    <v-layout>
      <v-icon class="navigation-button pre" @click="prevSlide">navigate_before</v-icon>
      <v-flex class="slider-list">
        <ul ref="imagetrack" class="imagetrack" :style="trackTransform">
          <slot></slot>
        </ul>
      </v-flex>
      <v-icon class="navigation-button next" @click="nextSlide">navigate_next</v-icon>
    </v-layout>
  </v-flex>
</template>


<script>
export default {
  name: "slider",
  data() {
    return {
      currentSlide: 0,
      slideWidth: 0,
      slides: [],
      slidesCount: 0,
      itemsToShow: 5,
      imageSource: ""
    };
  },
  props: {
    imageUrl: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.init();
    this.update();
    this.slideTo(this.currentSlide);
    this.$on("showSlideEvent", val => {
      this.imageSource = val;
    });
  },
  computed: {
    trackTransform() {
      let translate = this.currentSlide * this.slideWidth;
      return `transition: 1s; transform: translate(${-translate}px, 0);`;
    }
  },
  methods: {
    init() {
      this.slides = Array.from(this.$refs.imagetrack.children);
      this.slidesCount = this.slides.length;
      this.imageSource = this.imageUrl;
    },
    update() {
      this.updateWidth();
    },
    updateWidth() {
      let trackWidth =
        this.$refs.imageSlider.clientWidth + this.$refs.imageSlider.offsetLeft;
      this.slideWidth = trackWidth / this.itemsToShow;

      this.slides.forEach(slide => {
        slide.style.width = `${this.slideWidth}px`;
      });
    },
    nextSlide() {
      if (this.currentSlide + this.itemsToShow < this.slidesCount) {
        this.slideTo(this.currentSlide + 1);
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.slideTo(this.currentSlide - 1);
      }
    },
    slideTo(currentSlide) {
      this.currentSlide = currentSlide;
    }
  }
};
</script>

<style>
.imageSlider {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.imagetrack {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  margin: 0;
}
.navigation-button {
  background: lightgray;
}
.pre {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.next {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}
</style>

