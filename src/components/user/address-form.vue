<template>
  <section class="d-flex flex-column">
    <div class="heading d-flex justify-content-center position-relative">
      <i class="fas fa-truck big-icon"></i>
      <span class="heading-title">Delivery Address</span>
    </div>
    <div class="d-flex flex-row py-2">
      <label class="col-6">Same as registered address</label>
      <input
        type="checkbox"
        v-model="sameAsRegisteredAddress"
        name="sameAsRegisteredAddress"
        class="form-check-input d-flex mt-2 position-relative"
      >
    </div>
    <form @submit.prevent="submit" :class="[checkValidation ? 'valid-form': 'invalid-form']">
      <div class="d-flex flex-row py-2">
        <label class="col-4">Salutation</label>
        <select
          v-model="user.genderSelect"
          v-validate="'required'"
          name="genderSelect"
          class="form-control"
        >
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >{{option.text}}</option>
        </select>
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">First Name</label>
        <input
          type="text"
          v-validate="'required'"
          v-model="user.firstname"
          name="firstname"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Last Name</label>
        <input
          v-validate="'required'"
          type="text"
          name="lastname"
          v-model="user.lastname"
          class="form-control"
        >
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">Street / No</label>
        <div class="d-flex d-inline-block justify-content-between">
          <input
            type="text"
            v-validate="'required'"
            name="streetno"
            v-model="user.streetno"
            class="form-control col-8"
          >
          <input
            type="text"
            v-validate="'required|numeric'"
            name="houseno"
            v-model="user.houseno"
            class="form-control col-3"
          >
        </div>
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">PostCode / City</label>
        <div class="d-flex flex-row justify-content-between">
          <input
            type="text"
            v-validate="'required|numeric'"
            name="postcode"
            v-model="user.postcode"
            class="form-control col-4"
          >
          <input
            type="text"
            v-validate="'required'"
            name="city"
            v-model="user.city"
            class="form-control col-7"
          >
        </div>
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Country</label>
        <country-select
          class="form-control"
          v-validate="'required'"
          name="country"
          :country="user.country"
          v-model="user.country"
        />
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Email</label>
        <input
          type="email"
          v-validate="'required|email'"
          name="email"
          v-model="user.email"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Telephone</label>
        <input
          type="text"
          name="telephone"
          v-validate="'required'"
          v-model="user.telephone"
          class="form-control"
        >
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "address-form",
  data() {
    return {
      options: [
        { value: 0, text: "Male" },
        { value: 1, text: "Female" },
        { value: 3, text: "Not Specified" }
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
        this.user.genderSelect = 0;
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

