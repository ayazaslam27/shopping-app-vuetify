<template>
  <v-layout column :class="[mobileVersion?'px-5':'px-3']">
    <div class="heading d-flex justify-content-center position-relative">
      <i class="fas fa-user big-icon"></i>
      <span class="heading-title">I am already a Customer</span>
    </div>
    <form>
      <v-text-field
        v-model="user.username"
        v-validate="'required'"
        :error-messages="errors.collect('username')"
        label="username"
        placeholder="username"
        data-vv-name="username"
        required
      ></v-text-field>
      <v-text-field
        type="password"
        v-model="user.password"
        v-validate="'required'"
        placeholder="password"
        :error-messages="errors.collect('password')"
        label="password"
        data-vv-name="password"
        required
      ></v-text-field>
      <v-btn @click="onSubmit">Login</v-btn>
    </form>
  </v-layout>
</template>

<script>
import apiActions from "../../js/restfulApiCaller/apiActions";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: null,
        password: null,
        audience: "we.sell.com"
      }
    };
  },
  computed: {
    checkValidation() {
      return (
        this.user.username &&
        this.user.password &&
        this.errors.items.length == 0
      );
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  methods: {
    onSubmit() {
      var that = this;
      apiActions
        .login(this.user)
        .then(result => {
          that.$store.dispatch("setUserAuthentication", result.success);
          if (result.success) {
            that.$store.dispatch("setUserInfo", result.user);
            localStorage.setItem("token", result.token);
            that.$router.push("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


