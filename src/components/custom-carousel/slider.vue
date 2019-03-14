<template>
  <section ref="sliderList" class="slider">
    <div class="slider-list">
      <ul
        ref="track"
        class="track"
        :class="{ 'is-dragging': isDragging }"
        :style="trackTransform"
        @transitionend="moveToOrignalSlide"
      >
        <slot></slot>
      </ul>
    </div>
  </section>
</template>

<script>
import { getInRange, normalizeSlideIndex } from "../../js/utils.js";
export default {
  name: "slider",
  data() {
    return {
      isDragging: false,
      isSliding: false,
      isTouch: false,
      isHover: false,
      isFocus: false,
      slideWidth: 0,
      slideHeight: 0,
      slidesCount: 0,
      currentSlide: 0,
      trackOffset: 0,
      timer: null,
      slides: [],
      allSlides: [],
      defaults: {},
      delta: { x: 0, y: 0 },
      itemsToShow: 0
    };
  },
  props: {
    settings: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    trackTransform() {
      let clonesSpace = 0;
      let centeringSpace = 0;
      let translate = 0;

      if (this.settings.centerMode) {
        centeringSpace = this.settings.infiniteScroll
          ? (this.containerHeight - this.slideHeight) / 2
          : (this.containerWidth - this.slideWidth) / 2;
      }
      if (this.settings.infiniteScroll) {
        clonesSpace = this.settings.vertical
          ? this.slideHeight * this.slidesCount
          : this.slideWidth * this.slidesCount;
      }
      if (this.settings.vertical) {
        translate =
          this.delta.y + (centeringSpace - this.trackOffset * this.slideHeight);
        return `transform: translate(0, ${translate - clonesSpace}px);`;
      } else {
        translate =
          this.delta.x + (centeringSpace - this.trackOffset * this.slideWidth);
        let dimension = translate - clonesSpace;
        return `transform: translate(${dimension}px, 0);`;
      }
    }
  },
  mounted() {
    this.init();
    this.update();
    this.gotoSlide(this.currentSlide);
  },
  methods: {
    init() {
      this.slides = Array.from(this.$refs.track.children);
      this.allSlides = Array.from(this.slides);

      this.slidesCount = this.slides.length;

      if (this.settings.infiniteScroll) {
        this.cloneSlides();
      }

      if (this.settings.mouseDrag) {
        this.$refs.track.addEventListener("mousedown", this.onDragStart);
      }

      if (this.settings.touchDrag) {
        this.$refs.track.addEventListener("touchstart", this.onDragStart);
      }

      if (this.settings.wheelControl) {
        this.$el.addEventListener("wheel", this.onWheel);
      }

      window.addEventListener("resize", this.update);
    },
    update() {
      if (window.outerWidth < 1000 && window.outerWidth >= 500) {
        this.itemsToShow = 5;
      } else if (window.outerWidth < 500) {
        this.itemsToShow = 3;
      } else {
        this.itemsToShow = 2;
      }
      this.updateWidth();
    },
    gotoSlide(slideIndex) {
      let index = this.settings.infiniteScroll
        ? slideIndex
        : getInRange(slideIndex, 0, this.slidesCount - 1);

      this.currentSlide = index;

      this.$refs.track.style.transition = `${this.settings.transition}ms`;
      this.trackOffset = index;
      this.currentSlide = normalizeSlideIndex(index, this.slidesCount);
      this.isSliding = true;
      var that = this;
      setTimeout(() => {
        that.$refs.track.style.transition = "";
        that.isSliding = false;
      }, that.settings.transition);
    },
    moveToOrignalSlide() {
      if (this.settings.infiniteScroll) {
        this.$refs.track.style.transition = "";

        this.trackOffset = normalizeSlideIndex(
          this.currentSlide,
          this.slidesCount
        );
      }
    },
    nextSlide() {
      this.gotoSlide(this.currentSlide + this.settings.itemsToSlide);
    },
    previousSlide() {
      this.gotoSlide(this.currentSlide - this.settings.itemsToSlide);
    },
    updateWidth() {
      if(this.$refs.sliderList === undefined){
        return;
      }

      this.containerWidth = this.$refs.sliderList.clientWidth;
      this.containerHeight = this.$refs.sliderList.clientHeight;

      this.slideWidth = this.containerWidth / this.itemsToShow;
      this.slideHeight = this.containerHeight / this.itemsToShow;

      this.setWidth(this.slideWidth, this.slideHeight);
    },
    setWidth(slideWidth, slideHeight) {
      this.allSlides.forEach(slide => {
        if (this.settings.vertical) {
          slide.style.height = `${slideHeight}px`;
        } else {
          slide.style.width = `${slideWidth}px`;
        }
      });
    },
    cloneSlides() {
      const slidesBefore = document.createDocumentFragment();
      const slidesAfter = document.createDocumentFragment();
      let before = [];
      let after = [];

      this.slides.forEach(slide => {
        const elBefore = slide.cloneNode(true);
        const elAfter = slide.cloneNode(true);
        elBefore.classList.add("slide-clone");
        elAfter.classList.add("slide-clone");
        slidesBefore.appendChild(elBefore);
        slidesAfter.appendChild(elAfter);
        before.push(elBefore);
        after.push(elAfter);
      });

      this.allSlides.push(...after);
      this.allSlides.unshift(...before);
      this.$refs.track.appendChild(slidesAfter);
      this.$refs.track.insertBefore(slidesBefore, this.$refs.track.firstChild);
    },
    onDragStart(event) {
      this.isTouch = event.type === "touchstart";
      if (!this.isTouch && event.button !== 0) {
        return;
      }

      this.startposition = { x: 0, y: 0 };
      this.endposition = { x: 0, y: 0 };
      this.isDragging = true;

      this.startposition.x = event.clientX || event.touches[0].clientX;
      this.startposition.y = event.clientY || event.touches[0].clientY;

      document.addEventListener(
        this.isTouch ? "touchmove" : "mousemove",
        this.onDrag
      );

      document.addEventListener(
        this.isTouch ? "touchend" : "mouseup",
        this.onDragEnd
      );
    },
    onDrag(event) {
      this.endposition.x = this.isTouch
        ? event.touches[0].clientX
        : event.clientX;
      this.endposition.y = this.isTouch
        ? event.touches[0].clientY
        : event.clientY;

      this.delta.x = this.endposition.x - this.startposition.x;
      this.delta.y = this.endposition.y - this.startposition.y;
    },
    onDragEnd() {
      let draggedSlides = 0;

      if (this.settings.vertical) {
        draggedSlides = Math.round(this.delta.y / this.slideHeight);
      } else {
        draggedSlides = Math.round(this.delta.x / this.slideWidth);
      }

      if (draggedSlides > 0) {
        this.gotoSlide(this.currentSlide - draggedSlides);
      }
      this.isDragging = false;
      this.delta.x = 0;
      this.delta.y = 0;

      document.removeEventListener(
        this.isTouch ? "touchmove" : "mousemove",
        this.onDrag
      );

      document.removeEventListener(
        this.isTouch ? "touchend" : "mouseup",
        this.onDragEnd
      );
    },
    onWheel(event) {
      event.preventDefault();
      let delta = Math.sign(event.deltaY);
      if (delta === -1) {
        this.previousSlide();
      }
      if (delta === 1) {
        this.nextSlide();
      }
    },
    updateSlideStatus(index) {}
  }
};
</script>
<style>
.slider {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.slider * {
  box-sizing: border-box;
}
.slider-list {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.track {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>




