<template>
    <slider :imageUrl="firstImage">
        <template v-for="(item, index) in images">
            <slide :item="item" :key="index + '-IS'">
                <img :src="item.imageUrl" alt="..." class="img-thumbnail">
            </slide>
        </template>
    </slider>
</template>

<script>
import slider from './slider.vue'
import slide from './slide'
export default {
    name: 'image-carousel',
    props:{
        images:{
            type: Array,
            required:true
        }
    },
    computed:{
        firstImage(){
            var imageUrl = this.images[0].imageUrl;
            return imageUrl;
        }
    },
    components:{
        slider,
        slide
    }
}
</script>
