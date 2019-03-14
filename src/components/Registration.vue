<template>
  <v-layout :class="[mobileVersion? 'column': 'row']" justify-space-between>
    <v-flex xs6 :class="[mobileVersion? 'order-2': 'order-1']">
      <newuser></newuser>
    </v-flex>
    <v-flex xs6 :class="[mobileVersion? 'order-1': 'order-2']">
      <login></login>
    </v-flex>
  </v-layout>
</template>

<script>
import countryselect from "vue-country-region-select";
import newuser from "@/components/user/new-user";
import login from "@/components/user/login";
export default {
  name: "profile",
  components: {
    newuser,
    login
  },
  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>

<style>
.big-icon {
  font-size: 48px;
  color: lightgrey;
}

.heading {
  border-bottom: 1px solid lightgray;
  padding: 1em;
}
.heading-title {
  padding-left: 1em;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: xx-large;
  color: orangered;
  font-weight: bold;
}
@media (max-width: 984px) {
  .heading-title {
    font-size: large;
    padding-top: 0.5em;
  }
}
.declaration {
  padding-left: 2.2em;
}
.custom-button {
  background-color: orangered;
  color: white;
  font-size: large;
  font-weight: bold;
}

.custom-button:hover {
  background-color: rgba(255, 130, 85, 0.7);
  font-style: italic;
  color: white;
}
</style>
