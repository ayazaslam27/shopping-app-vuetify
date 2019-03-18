<template>
  <v-layout column justify-center>
    <v-flex class="heading d-flex justify-content-center">
      <i class="fas fa-shopping-cart big-icon"></i>
      <span class="heading-title">Basket</span>
    </v-flex>
    <template v-for="(item, index) in items">
      <item :key="index + 'CI'" :item="item"></item>
    </template>

    <template v-if="totalCost > 0">
      <v-layout column class="total-cost" justify-end>
        <div class="d-flex justify-content-end">
          <span class="numeric-field total text-xs-right">Total: {{totalCost}} €</span>
        </div>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
import item from "@/components/cart/item";
export default {
  name: "basket",
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

      if (sum > 0 && this.items.length > 0) {
        this.$emit("validated", true);
        this.$emit("broadCastBasketItemsEvent", {
          total: sum,
          products: this.items
        });
      } else {
        this.$emit("validated", false);
      }
      return sum;
    }
  },
  methods: {}
};
</script>

<style>
.total-cost {
  border-top: 1px solid lightgray;
}
</style>
