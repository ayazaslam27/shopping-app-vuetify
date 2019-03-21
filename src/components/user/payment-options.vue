<template>
  <v-layout column justify-center>
    <v-flex class="heading d-flex justify-content-center">
      <i class="far fa-money-bill-alt big-icon"></i>
      <span class="heading-title">Payment Options</span>
    </v-flex>
    <v-flex xs4 class="pt-4">
      <div :disabled="!enable" class="paypal-button-container"></div>
    </v-flex>
  </v-layout>
</template>
<script>
let that = this;
import apiActions from "@/js/restfulApiCaller/apiActions";
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
            payee: this.order.payee
          }
        ]
      });
    },
    onApprove: function(data, actions) {
      // Capture the funds from the transaction
      let that = this;
      actions.order.capture().then(function(details) {
        // Show a success message to your buyer
        console.log(details);
        let orderObject = that.makeOrderObject(details);
        // Call your server to save the transaction via callback
        apiActions
          .placeOrder(orderObject)
          .then(result => {
            //Todo: Render success view and more.....
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    makeOrderObject(details) {
      let orderObject = {
        audience: "we.sell.com", //must be moved somewhere safe,
        create_time: details.create_time,
        payer_id: details.payer.payer_id,
        order_id_global: details.id,
        status: details.status,
        update_time: details.update_time,

        payee: {
          email_address: this.order.payee,
          name: this.order.shipping_address.user,
          shipping_address: {
            street_name: this.order.shipping_address.line1,
            house_number: this.order.shipping_address.line1,
            postcode: this.order.shipping_address.postal_code,
            city: this.order.shipping_address.city,
            country: this.order.shipping_address.country_code
          }
        },
        total_amount: this.order.amount
      };
      let products = [];
      for (let index = 0; index < this.order.items.length; index++) {
        const element = this.order.items[index];
        let product = {
          article_number: element.article_number + "",
          name: element.name,
          unit_amount:
            element.unit_amount.value + " " + element.unit_amount.currency_code,
          quantity: element.quantity
        };

        products.push(product);
      }
      orderObject.purchase_products = products;
      return orderObject;
    }
  }
};
</script>
