<template>
  <section class="d-flex flex-column">
    <div class="heading d-flex justify-content-center">
      <i class="fas fa-file-invoice big-icon"></i>
      <span class="heading-title">Invoice</span>
    </div>
    <template v-for="(item, index) in paypalObject.items">
      <div class="d-flex flex-column mt-2" :key="index + 'I'">
        <span class="ml-2">{{item.name}}</span>
        <div class="d-flex flex-row justify-content-between">
          <div class="ml-2 my-2">
            <span class="mr-2">Quantity:</span>
            <span class="numeric-field">{{item.quantity}}</span>
          </div>
          <span class="numeric-field mt-2 mr-2">{{item.unit_amount.value}} €</span>
        </div>
      </div>
    </template>

    <template v-if="paypalObject.amount">
      <div class="d-flex flex-row justify-content-end total">
        <div class="d-flex p-2">
          <span class="numeric-field">Total: {{paypalObject.amount}} €</span>
        </div>
      </div>
    </template>

    <template v-if="paypalObject.shipping_address">
      <div class="d-flex flex-column justify-content-center">
        <div class="heading d-flex justify-content-center">
          <i class="fas fa-address-card big-icon"></i>
          <span class="heading-title">Delivery Address</span>
        </div>
        <div class="flex-column">
          <span class="d-flex justify-content-center">{{paypalObject.shipping_address.user}}</span>
          <span class="d-flex justify-content-center">{{paypalObject.shipping_address.line1}}</span>
          <span
            class="d-flex justify-content-center"
          >{{paypalObject.shipping_address.postal_code}} - {{paypalObject.shipping_address.city}}</span>
          <span class="d-flex justify-content-center">{{paypalObject.shipping_address.country_code}}</span>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: "invoice",
  data() {
    return {
      paypalObject: {}
    };
  },
  mounted() {
    this.paypalObject = this.$store.getters.getPaypalObject;
  }
};
</script>

<style>
.total {
  border-top: 1px solid lightgray;
}
</style>
