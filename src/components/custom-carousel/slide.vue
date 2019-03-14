<template>
  <li class="slide">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "slide"
};
</script>

<style>
.slide {
  flex-shrink: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 20px;
  display: flex;
}
</style>



