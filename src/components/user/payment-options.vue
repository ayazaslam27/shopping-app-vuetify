<template>
  <section class="d-flex flex-column">
    <div class="heading d-flex justify-content-center">
      <i class="far fa-money-bill-alt big-icon"></i>
      <span class="heading-title">Payment Options</span>
    </div>
    <div class="d-flex flex-row pt-4 justify-content-center align-items-center">
      <div :disabled="!enable" class="paypal-button-container"></div>
    </div>
  </section>
</template>
<script>
export default {
  name: "payment-options",
  data() {
    return {
      order: {}
    };
  },
  mounted() {
    this.order = this.$store.getters.getPaypalObject;
    let that = this;
    if (
      this.order.reference_id === undefined ||
      this.order.amount == 0 ||
      this.order.shipping_address === null
    ) {
      this.$router.push("checkout");
    }
    paypal
      .Buttons({
        createOrder: that.createOrder,
        onApprove: that.onApprove
      })
      .render(".paypal-button-container");
  },
  computed: {
    enable() {
      if (
        this.order.amount > 0 &&
        this.order.items.length > 0 &&
        this.order.shipping_address !== null &&
        this.order.payee !== null
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createOrder: function(data, actions) {
      return actions.order.create({
        Content_Type: "application/json",
        Authorization: "Bearer Access-Token",

        purchase_units: [
          {
            reference_id: this.order.reference_id,
            amount: {
              value: this.order.amount,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: "" + this.order.amount
                }
              }
            },
            items: this.order.items,
            shipping_address: this.order.shipping_address,
            payee: this.order.payee,
            invoice_number: "123324343534"
          }
        ]
      });
    },
    onApprove: function(data, actions) {
      // Capture the funds from the transaction
      return actions.order.capture().then(function(details) {
        // Show a success message to your buyer
        alert("Transaction completed by ");
        // Call your server to save the transaction via callback
        return fetch("/url", {
          method: "post",
          body: JSON.stringify({
            orderID: data.orderID
          })
        });
      });
    }
  }
};
</script>
