<template>
  <v-layout column justify-center align-content-center>
    <v-flex class="heading d-flex justify-content-center">
      <i class="fas fa-truck big-icon"></i>
      <span class="heading-title">Delivery Address</span>
    </v-flex>

    <v-checkbox v-model="sameAsRegisteredAddress" label="Same as registered Address"></v-checkbox>
    <v-form :class="[checkValidation? 'valid':'not-calid-form']">
      <v-overflow-btn
        v-model="user.genderSelect"
        v-validate="'required'"
        :items="options"
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
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: "address-form",
  data() {
    return {
      options: [
        { text: "Male" },
        { text: "Female" },
        { text: "Not Specified" }
      ],
      sameAsRegisteredAddress: false,
      user: {
        genderSelect: null,
        country: "DE",
        termsChecked: false,
        firstname: null,
        lastname: null,
        streetno: null,
        houseno: null,
        postcode: null,
        city: null,
        telephone: null
      }
    };
  },
  computed: {
    checkValidation() {
      let isValidated =
        this.user.genderSelect != null &&
        this.user.termsChecked != null &&
        this.user.firstname != null &&
        this.user.lastname != null &&
        this.user.streetno != null &&
        this.user.houseno != null &&
        this.user.postcode != null &&
        this.user.city != null &&
        this.user.country != "" &&
        this.user.telephone != null &&
        this.errors.items.length == 0;

      if (isValidated) {
        this.$emit("broadCastAddress", this.user);
        this.$emit("validated", true);
      } else {
        this.$emit("validated", false);
      }

      return isValidated;
    }
  },
  watch: {
    sameAsRegisteredAddress(value) {
      if (value) {
        this.user.genderSelect = "Male";
        this.user.country = "DE";
        this.user.firstname = "Ayaz";
        this.user.lastname = "Aslam";
        this.user.streetno = "Heimerstrasse";
        this.user.houseno = 21;
        this.user.postcode = 31789;
        this.user.city = "Hameln";
        this.user.telephone = "+491713435468";
        this.user.email = "ayazaslam27@gmail.com";
      } else {
        this.user.genderSelect = null;
        this.user.country = null;
        this.user.firstname = null;
        this.user.lastname = null;
        this.user.streetno = null;
        this.user.houseno = null;
        this.user.postcode = null;
        this.user.city = null;
        this.user.telephone = null;
      }
    }
  }
};
</script>

<style>
input:invalid {
  border-color: red;
}
.errors {
  color: red;
}
input[aria-invalid="true"] {
  border-color: red;
}

.btn:disabled {
  opacity: 0.35;
}
</style>

