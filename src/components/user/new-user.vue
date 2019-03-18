<template>
  <v-layout column :class="[mobileVersion?'px-5':'px-3']">
    <v-flex d-flex>
      <div class="heading d-flex justify-content-center position-relative">
        <i class="fas fa-user big-icon"></i>
        <span class="heading-title">I am a new Customer</span>
      </div>
    </v-flex>
    <v-flex d-flex>
      <v-form v-model="valid">
          <v-overflow-btn
            v-model="user.genderSelect"
            v-validate="'required'"
            :items="items"
            :error-messages="errors.collect('genderSelect')"
            label="Gender"
            data-vv-name="genderSelect"
            required
        ></v-overflow-btn>
        <v-text-field
          v-model="user.firstname"
          v-validate="'required'"
          :error-messages="errors.collect('firstname')"
          label="First Name"
          placeholder="First Name"
          data-vv-name="firstname"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.lastname"
          v-validate="'required'"
          :error-messages="errors.collect('lastname')"
          label="Last Name"
          placeholder="Last Name"
          data-vv-name="lastname"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.username"
          v-validate="'required'"
          :error-messages="errors.collect('username')"
          label="Username"
          placeholder="Username"
          data-vv-name="username"
          required
        ></v-text-field>
        <v-layout row>
          <v-text-field
            v-model="user.streetno"
            v-validate="'required'"
            :error-messages="errors.collect('streetno')"
            label="Street Number"
            placeholder="Street Number"
            data-vv-name="streetno"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.houseno"
            v-validate="'required'"
            :error-messages="errors.collect('houseno')"
            label="House Number"
            placeholder="House Number"
            data-vv-name="houseno"
            required
          ></v-text-field>
        </v-layout>
        <v-layout row>
          <v-text-field
            v-model="user.postcode"
            v-validate="'required'"
            :error-messages="errors.collect('postcode')"
            label="PostCode"
            placeholder="PostCode"
            data-vv-name="postcode"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.city"
            v-validate="'required'"
            :error-messages="errors.collect('city')"
            label="City"
            placeholder="City"
            data-vv-name="city"
            required
          ></v-text-field>
        </v-layout>
        <v-text-field
          v-model="user.country"
          v-validate="'required'"
          :error-messages="errors.collect('country')"
          label="Country"
          placeholder="Country"
          data-vv-name="country"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          v-validate="'required|email'"
          :error-messages="errors.collect('email')"
          label="Email"
          placeholder="Email"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-layout row>
          <v-text-field
            v-model="user.password"
            v-validate="'required'"
            :error-messages="errors.collect('password')"
            label="Password"
            type="password"
            placeholder="Password"
            data-vv-name="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="passwordagain"
            v-validate="'required'"
            type="password"
            :error-messages="errors.collect('passwordagain')"
            label="Confirm Password again"
            placeholder="Password"
            data-vv-name="passwordagain"
            required
          ></v-text-field>
        </v-layout>
         <v-checkbox
            v-model="termsChecked"
            v-validate="'required'"
            :error-messages="errors.collect('termsChecked')"
            value="1"
            :label="termsAndConditions"
            data-vv-name="termsChecked"
            type="checkbox"
            required
        ></v-checkbox>
        <v-btn  class="custom-button" outline color="primary" @click="onSubmit" :disabled="!valid">Register</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import apiActions from "../../js/restfulApiCaller/apiActions";
export default {
  name: "new-user",
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      items: ["Male", "Female"],
      termsChecked: false,
      passwordagain: null,
      valid: false,
      user: {
        genderSelect: null,
        country: null,
        username: null,
        firstname: null,
        lastname: null,
        streetno: null,
        houseno: null,
        postcode: null,
        city: null,
        telephone: null,
        password: null
      },
      termsAndConditions: 'I agree that wesell.com recommend e-mail products and services from their assortment and may interview me to their satisfaction. I can revoke my consent at any time, for example via the unsubscribe link at the end of the newsletter. I am at least 16 years old. Further information, including the shipping service provider as well as the personalized evaluation, can be found in our privacy policy .'
    };
  },
  computed: {
    checkValidation() {
      return (
        this.user.genderSelect &&
        this.user.country &&
        this.termsChecked &&
        this.user.firstname &&
        this.user.lastname &&
        this.user.username &&
        this.user.streetno &&
        this.user.houseno &&
        this.user.postcode &&
        this.user.city &&
        this.user.telephone &&
        this.user.password &&
        this.passwordagain &&
        this.errors.items.length == 0
      );
    },
     mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  methods: {
    onSubmit() {
      apiActions.register(this.user, function(response) {
        console.log(response);
      });

      apiActions
        .register(this.user)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


