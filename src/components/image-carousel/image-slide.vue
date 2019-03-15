<template>
<li class="imageSlide" @mouseover="showSlide">
    <slot></slot>
</li>
</template>

<script>
export default {
    name: 'slide',
    props:{
        item:{
            type: Object,
            required: true
        }
    },
    methods:{
        showSlide(){
            this.$parent.$emit('showSlideEvent', this.item.imageUrl)
        }
    }
}
</script>
<style>
.imageSlide {
  flex-shrink: 0;
  list-style: none;
}
</style>