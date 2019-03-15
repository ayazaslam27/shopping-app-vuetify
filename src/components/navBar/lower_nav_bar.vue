<template>
  <v-card>
    <v-bottom-nav color="primary" :value="true" absolute dark shift>
      <v-btn dark>
        <span>Customer Service</span>
        <v-icon>alarm</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Careers</span>
        <v-icon>group</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Returns</span>
        <v-icon>cached</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Help</span>
        <v-icon>help_outline</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: "lower-nav-bar"
};
</script>
