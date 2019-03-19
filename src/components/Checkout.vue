<template>
  <v-layout pt-4 column>
    <v-layout wrap justify-center>
      <v-flex v-if="hasItemsInBasket" md5 sm11 order-sm2 order-xs2 order-md1 px-3>
        <addressform
          v-if="!showPaymentSection"
          v-on:broadCastAddress="recieveAddress"
          v-on:validated="isAddressFormValidated"
        ></addressform>
      </v-flex>
      <v-flex v-if="hasItemsInBasket" md5 sm11 order-sm1 order-xs1 order-md2 px-3>
        <basket
          v-if="!showPaymentSection"
          v-on:broadCastBasketItemsEvent="recieveBasketItems"
          v-on:validated="isBasketValidated"
        ></basket>
      </v-flex>
      <v-flex v-if="hasItemsInBasket" md5 order-sm3 order-xs3 order-md3>
        <v-btn
          class="custom-button"
          outline
          color="primary"
          :to="{name: 'order'}"
          :disabled="!canBuy"
        >Continue</v-btn>
      </v-flex>
      <v-flex v-if="!hasItemsInBasket" xs10 sm6 md5 class="text-xs-center">
        <v-alert
          :value="true"
          color="warning"
          icon="far fa-frown"
          outline
        >Basket is empty. You have no products to buy.</v-alert>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import addressform from "@/components/user/address-form";
import basket from "@/components/user/basket";
import paymentOption from "@/components/user/payment-options";
import invoice from "@/components/user/invoice";

import apiActions from "../js/restfulApiCaller/apiActions";

export default {
  name: "checkout",
  data() {
    return {
      paypalObject: {
        reference_id: "1234",
        amount: 0,
        items: [],
        shipping_address: null,
        payee: null,
        user: null
      },
      addressFormValidated: false,
      showPaymentSection: false
    };
  },
  components: {
    addressform,
    basket
  },
  computed: {
    canBuy() {
      if (this.hasItemsInBasket && this.addressFormValidated) {
        this.$store.dispatch("setPaypalObject", this.paypalObject);
        return true;
      } else {
        return false;
      }
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    },
    hasItemsInBasket() {
      return this.$store.getters.getTotalCartItems > 0;
    }
  },
  mounted() {
    this.$on("paymentOptionSelected", val => {
      this.paymentOption = val;
    });
  },
  methods: {
    recieveBasketItems(basketItems) {
      let paypalItems = [];
      for (let index = 0; index < basketItems.products.length; index++) {
        const element = basketItems.products[index];
        var paypalItem = {
          name: "" + element.title,
          unit_amount: {
            value: "" + element.price,
            currency_code: "USD"
          },
          quantity: "" + element.quantity
        };
        paypalItems[index] = paypalItem;
      }
      this.paypalObject.amount = basketItems.total;
      this.paypalObject.items = paypalItems;
    },
    recieveAddress(user) {
      this.paypalObject.shipping_address = {
        line1: user.streetno + "-" + user.houseno,
        city: user.city,
        country_code: user.country,
        postal_code: user.postcode,
        phone: user.telephone,
        user: user.firstname + " " + user.lastname
      };
      this.paypalObject.payee = user.email;
    },
    isAddressFormValidated(value) {
      this.addressFormValidated = value;
      if (!value) this.showPaymentSection = false;
    },
    isBasketValidated(value) {
      if (!value) this.showPaymentSection = false;
    },
    canOrder() {
      let params = {
        audience: "we.sell.com" //must be moved somewhere safe
      };
      var that = this;
      apiActions
        .order(params)
        .then(result => {
          that.showPaymentSection = result.showPaymentOptions;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isUserAuthenticated) {
        vm.$router.push("/Registration");
      }
    });
  }
};
</script>

<style>
</style>
