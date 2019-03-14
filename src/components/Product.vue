<template>
  <section>
    <section v-if="item" class="d-flex col-12">
      <div class="d-flex flex-column" :class="[isMobileVersion? 'col-12': 'col-8']">
        <div class="product_headline">
          <span class="name" itemprop="name" style="overflow-wrap: break-word;">{{item.title}}</span>
        </div>
        <div class="features_box">
          <span>kostenloser Versand</span>
          <span>Finanzierung Artikel</span>
        </div>
        <div class="image-slider">
          <imageslider :images="item.imageUrls"></imageslider>
        </div>
      </div>
      <div v-if="!isMobileVersion" class="d-flex flex-column col-4">//Right Part</div>
    </section>
    <div class="col-12">
      <div class="h5 d-flex mt-4 justify-content-center carousel-heading-background">
        <em class="heading-title-carousel my-1">Product Description</em>
      </div>
      <span>{{description}}</span>

      <div class="h5 d-flex mt-4 justify-content-center carousel-heading-background">
        <em class="heading-title-carousel my-1">Technical Details</em>
      </div>
      <technicalDetails></technicalDetails>
    </div>
  </section>
</template>

<script>
import imageslider from "./image-carousel/imagecarousel";
import technicalDetails from "./technicalDetails";

export default {
  name: "product",
  data() {
    return {
      item: null
    };
  },
  mounted() {
    let items = [
      ...this.$store.getters.getItems,
      ...this.$store.getters.getTopProducts
    ];
    this.item = items.find(
      x =>
        x.articleNumber == parseInt(this.$route.params.id, 10) &&
        x.brand == this.$route.params.brand
    );
    if (this.item === undefined) {
      //Todo send ajax to the server
    }
  },
  components: {
    imageslider,
    technicalDetails
  },
  computed: {
    description() {
      if (this.item != null && this.item.description) {
        return this.item.description;
      } else {
        return "No descrition available ";
      }
    },
    isMobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>

<style>
.product_headline {
  font-size: larger;
  font-weight: bold;
  color: grey;
}
</style>
