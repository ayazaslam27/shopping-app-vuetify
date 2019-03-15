<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 v-if="item">
        <v-flex>
          <v-card class="text-xs-center" dark color="primary">
            <v-card-text class="title">{{item.title}}</v-card-text>
          </v-card>
        </v-flex>
        <v-layout row>
          <v-layout column xs8>
            <v-layout column pt-3>
              <span class="availability pb-1">sofort ab Lager</span>
              <span class="availability pb-1">24h Express</span>
            </v-layout>
            <v-container>
              <v-layout>
                <v-flex xs7>
                  <imageslider :images="item.imageUrls"></imageslider>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>

          <v-layout xs4 column v-if="!isMobileVersion">//Right Part</v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout column xs12>
      <v-flex xs12>
        <v-card class="text-xs-center" dark color="primary">
          <v-card-text>Description</v-card-text>
        </v-card>
      </v-flex>

      <span class="py-3">{{description}}</span>

      <v-flex xs12>
        <v-card class="text-xs-center" dark color="primary">
          <v-card-text>Technical Details</v-card-text>
        </v-card>
      </v-flex>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <technicalDetails></technicalDetails>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
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
