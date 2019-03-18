<template>
  <v-layout v-if="item" wrap justify-center>
    <v-flex xs12>
      <v-card class="text-xs-center" dark color="primary">
        <v-card-text class="title">{{item.title}}</v-card-text>
      </v-card>
    </v-flex>

    <v-layout justify-space-around wrap py-4>
      <v-flex xs10 sm10 md4>
        <imageslider :images="item.imageUrls"></imageslider>
      </v-flex>

      <v-flex xs10 sm10 md4 class="text-xs-center">
        <v-flex xs12 py-2 class="availability">Avialable</v-flex>
        <v-flex xs12 pb-2 class="availability">24h Express</v-flex>
      </v-flex>
    </v-layout>
    <v-flex xs10>
      <v-card class="text-xs-center" dark color="primary">
        <v-card-text>Description</v-card-text>
      </v-card>
      <v-flex py-3>{{description}}</v-flex>
    </v-flex>

    <v-flex xs10>
      <v-card class="text-xs-center" dark color="primary">
        <v-card-text>Technical Details</v-card-text>
      </v-card>
      <technicalDetails :technicalDetails="item.technical_details"></technicalDetails>
    </v-flex>
  </v-layout>
</template>

<script>
import imageslider from "./image-carousel/imagecarousel";
import technicalDetails from "./technicalDetails";
import apiAction from "@/js/restfulApiCaller/apiActions";
export default {
  name: "product",
  data() {
    return {
      item: null
    };
  },
  mounted() {
    let that = this;
    let params = {
      brand: this.$route.params.brand,
      articleNumber: this.$route.params.id
    };
    apiAction
      .getProduct(params)
      .then(result => {
        that.item = result;
      })
      .catch(err => {
        console.log(err);
      });
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
