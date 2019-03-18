<template>
  <v-layout wrap justify-space-around>
    <v-flex md5 sm12 order-sm2 order-xs2 order-md1 px-3>
      <paymentOption></paymentOption>
    </v-flex>
    <v-flex md5 sm12 order-sm1 order-xs1 order-md2 px-3>
      <invoice></invoice>
    </v-flex>
  </v-layout>
</template>

<script>
import paymentOption from "@/components/user/payment-options";
import invoice from "@/components/user/invoice";

export default {
  name: "order",
  data() {
    return {
      paypalObject: {}
    };
  },
  components: {
    paymentOption,
    invoice
  },
  mounted() {
    this.paypalObject = this.$store.getters.getPaypalObject;
  }
};
</script>

<style>
</style>
