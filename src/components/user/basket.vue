<template>
  <section class="flex-column">
    <div class="heading d-flex justify-content-center position-relative">
      <i class="fas fa-shopping-cart big-icon"></i>
      <span class="heading-title">Basket</span>
    </div>
    <template v-for="(item, index) in items">
      <item :key="index + 'CI'" :item="item"></item>
    </template>

    <template v-if="totalCost > 0">
      <div class="d-flex flex-column total-cost">
        <div class="d-flex justify-content-end">
          <span class="numeric-field">Total: {{totalCost}} €</span>
        </div>
      </div>
    </template>
  </section>
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
      }else{
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
