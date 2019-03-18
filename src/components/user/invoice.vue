<template>
  <v-layout column justify-center>
    <v-flex class="heading d-flex">
      <i class="fas fa-file-invoice big-icon"></i>
      <span class="heading-title">Invoice</span>
    </v-flex>
    <template v-for="(item, index) in paypalObject.items">
      <v-layout column :key="index + 'I'" class="text-xs-center" py-4>
        <v-flex>{{item.name}}</v-flex>
        <v-layout row justify-space-between py-2>
          <v-flex>
            <span>Quantity:</span>
            <span class="numeric-field">{{item.quantity}}</span>
          </v-flex>
          <v-flex class="numeric-field">{{item.unit_amount.value}} €</v-flex>
        </v-layout>
      </v-layout>
    </template>

    <template v-if="paypalObject.amount">
      <v-flex class="numeric-field total text-xs-right" py-4>Total: {{paypalObject.amount}} €</v-flex>
    </template>

    <template v-if="paypalObject.shipping_address">
      <v-layout column justify-center>
        <v-flex class="heading d-flex">
          <i class="fas fa-address-card big-icon"></i>
          <span class="heading-title">Delivery Address</span>
        </v-flex>
        <v-layout column class="text-xs-center">
          <v-flex>{{paypalObject.shipping_address.user}}</v-flex>
          <v-flex>{{paypalObject.shipping_address.line1}}</v-flex>
          <v-flex>{{paypalObject.shipping_address.postal_code}} - {{paypalObject.shipping_address.city}}</v-flex>
          <v-flex>{{paypalObject.shipping_address.country_code}}</v-flex>
        </v-layout>
      </v-layout>
    </template>
  </v-layout>
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
  font-size: x-large;
}
</style>
