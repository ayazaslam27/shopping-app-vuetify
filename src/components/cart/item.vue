<template>
  <v-layout row py-4 v-if="item.quantity > 0" justify-space-between>
    <v-flex xs3>
      <v-img aspect-ratio="1" :max-width="100" :src="item.thumbnail"></v-img>
    </v-flex>
    <v-flex xs9>
      <v-layout column>
        <v-flex v-if="shortName">{{getShortName()}}</v-flex>
        <v-flex v-else>{{item.title}}</v-flex>
        <v-layout row justify-space-between>
          <v-flex>
            <span>Quantity:</span>
            <i @click="minus(item)" class="fas fa-minus mx-2"></i>
            <span class="numeric-field">{{item.quantity}}</span>
            <i @click="add(item)" class="fas fa-plus mx-2"></i>
          </v-flex>
          <v-flex class="numeric-field mt-2 mr-2">{{item.price}} €</v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "cart-item",
  props: {
    item: {
      type: Object,
      required: true
    },
    shortName: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getShortName() {
      if (this.item.title.length > 30) {
        let truncatedString = this.item.title.substring(0, 30);
        truncatedString = truncatedString + "...";
        return truncatedString;
      }
      return this.item.title;
    },
    add(item) {
      item.quantity = item.quantity + 1;
    },
    minus(item) {
      if (item.quantity > 0) {
        item.quantity = item.quantity - 1;
      }
    }
  }
};
</script>

<style>
.numeric-field {
  font-size: larger;
  color: #1976d2;
  font-weight: bolder;
  font-style: italic;
}
.cart-title {
  font-size: large;
  font-weight: bold;
}

.cart-item {
  border-bottom: 1px dotted;
}
</style>
