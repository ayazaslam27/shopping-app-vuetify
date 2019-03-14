<template>
  <div
    class="card position-absolute"
    :style="cartStyle"
    @mouseover="isActive=true"
    @mouseleave="closeCart"
  >
    <template v-for="(item, index) in items">
      <item :key="index + 'CI'" :item="item" :shortName="true"></item>
    </template>

    <template v-if="totalCost > 0">
      <div class="d-flex flex-row justify-content-between ">
        <div class="d-flex p-2">
          <span class="numeric-field">Total: {{totalCost}} €</span>
        </div>
        <div class="d-flex p-2">
          <router-link :to="{ name: 'checkout'}" class="btn custom-button" >Check Out</router-link>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import item from '@/components/cart/item'
export default {
  name: "cart",
  data() {
    return {
      items: [],
      isActive: false
    };
  },
  mounted() {
    this.items = this.$store.getters.getCartItems;
  },
  props: {
    showCart: {
      type: Boolean,
      default: false
    }
  },
  components:{
    item
  },
  methods: {
    deleteFromCart(index) {
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
    closeCart() {
      this.isActive = false;
      this.$parent.$emit("showCartEvent", false);
    },
    
  },
  computed: {
   totalCost(){
      let sum = 0;
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        sum = sum + element.quantity * element.price
      }
      return sum;
    },
    cartStyle() {
      if (this.showCart) {
        return `transition: 0.3s; transform: scale(1); transform-origin:right top;`;
      }
      return `transition: 0.3s; transform: scale(0); transform-origin:right top;`;
    }
  }
};
</script>
<style>
.text-small {
  font-size: small;
}
.card {
  z-index: 1000 !important;
  top: 54px;
  right: 30px;
  border-radius: 10px;
  border: 2px solid lightgray;
  box-shadow: 10px 10px lightgray;
}

.total-price {
  padding-left: 150px;
}

</style>

