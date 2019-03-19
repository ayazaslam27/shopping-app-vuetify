<template>
  <v-layout column>
    <template v-for="(item, index) in items">
      <item :key="index + 'CI'" :item="item" :shortName="true"></item>
    </template>

    <template v-if="totalCost > 0">
      <v-layout column class="total-cost" justify-end>
        <v-flex pr-3 class="d-flex justify-content-end">
          <span class="numeric-field text-xs-right">Total: {{totalCost}} €</span>
        </v-flex>
      </v-layout>
    </template>
  </v-layout>
</template>
<script>
import item from "@/components/cart/item";
export default {
  name: "cart",
  data() {
    return {
      items: []
    };
  },
  mounted() {
    this.items = this.$store.getters.getCartItems;
  },
  components: {
    item
  },
  computed: {
    totalCost() {
      let sum = 0;
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        sum = sum + element.quantity * element.price;
      }
      return sum;
    }
  }
};
</script>

