<template>
  <section class="d-flex flex-column col-12">
    <div class="d-flex" :class="[mobileVersion? 'flex-column':'flex-row']">
      <paymentOption :class="[mobileVersion? 'col-12 order-2':'col-6 order-2']"></paymentOption>

      <invoice class="d-flex" :class="[mobileVersion? 'col-12 order-1':'col-6 order-1']"></invoice>
    </div>
  </section>
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
  },
  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>

<style>
</style>
