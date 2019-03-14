<template>
  <section class="d-flex flex-row justify-content-between bg-light my-2">
    <div>
      <router-link :to="{name: ''}">
        <span class="lower-navigation-item">Company</span>
      </router-link>
    </div>

    <div>
      <router-link :to="{name: ''}">
        <span class="lower-navigation-item">Customer Service</span>
      </router-link>
    </div>

    <div>
      <router-link :to="{name: ''}">
        <span class="lower-navigation-item">Careers</span>
      </router-link>
    </div>

    <div>
      <router-link :to="{name: ''}">
        <span class="lower-navigation-item">FAQ</span>
      </router-link>
    </div>

    <div>
      <router-link :to="{name: ''}">
        <span class="lower-navigation-item">Returns</span>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "lower-nav-bar"
};
</script>

<style>
.lower-navigation-item {
  color: orangered;
}
</style>
