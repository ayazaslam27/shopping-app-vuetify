<template>
  <div v-if="item.quantity > 0" class="d-flex flex-row pb-2">
    <div class="float-left ml-2 mt-2">
      <img class="float-left" :src="item.thumbnail">
    </div>
    <div class="float-right d-flex flex-column">
      <span v-if="shortName" class="ml-2 mr-2">{{getShortName()}}</span>
      <span v-else class="ml-2">{{item.title}}</span>
      <div class="d-flex flex-row justify-content-between">
        <div class="ml-2 my-2">
          <span>Quantity:</span>
          <i @click="minus(item)" class="fas fa-minus mx-2"></i>
          <span class="numeric-field">{{item.quantity}}</span>
          <i @click="add(item)" class="fas fa-plus mx-2"></i>
        </div>
        <span class="numeric-field mt-2 mr-2">{{item.price}} €</span>
      </div>
    </div>
  </div>
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
  color: orangered;
  font-weight: bolder;
  font-style: italic;
}
.cart-title {
  font-size: large;
  font-weight: bold;
}
.numeric-field-small {
  font-size: small;
  color: orangered;
  font-weight: bolder;
  font-style: italic;
}

.cart-item {
  border-bottom: 1px dotted;
}
</style>
