<template>
  <section class="imageSlider">
    <div class="image-show">
      <img class="w-100" :src="imageSource">
    </div>
    <div class="d-flex flex-row justify-content-center">
      <div class="order-1 bg-light navigation" @click="prevSlide">
        <i class="fas fa-caret-left pt-3 px-1"></i>
      </div>
      <div ref="imageSlider" class="slider-list order-2">
        <ul ref="imagetrack" class="imagetrack" :style="trackTransform">
          <slot></slot>
        </ul>
      </div>
      <div class="order-3 bg-light navigation" @click="nextSlide">
        <i class="fas fa-caret-right pt-3 px-1"></i>
      </div>
    </div>
  </section>
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
      let trackWidth = this.$refs.imageSlider.clientWidth;
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
.navigation {
  height: 3.2em;
  cursor: pointer;
}
</style>

