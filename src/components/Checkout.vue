<template>
  <section class="d-flex flex-column col-12">
    <div class="d-flex" :class="[mobileVersion? 'flex-column':'flex-row']">
      <addressform
        v-if="!showPaymentSection"
        class="d-flex"
        v-on:broadCastAddress="recieveAddress"
        v-on:validated="isAddressFormValidated"
        :class="[mobileVersion? 'col-12 order-2':'col-6 order-1']"
      ></addressform>
      <basket
        class="d-flex"
        v-if="!showPaymentSection"
        v-on:broadCastBasketItemsEvent="recieveBasketItems"
        v-on:validated="isBasketValidated"
        :class="[mobileVersion? 'col-12 order-1':'col-6 order-2']"
      ></basket>
    </div>

    <div class="d-flex justify-content-end pt-4">
      <router-link
        :to="{name: 'order'}"
        v-bind:class="{ disabled: !canBuy }"
        class="btn custom-button w-25"
      >Buy</router-link>
    </div>
  </section>
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
      hasItemsInBasket: false,
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
      this.hasItemsInBasket = value;
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
