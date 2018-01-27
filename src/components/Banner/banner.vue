<template>
    <div>
        <van-swipe :autoplay="images.BannerConfig.autoplay" :show-indicators='images.BannerConfig.show_indicators'>
            <van-swipe-item v-for="(image, index) in images.imgArr" :key="index">
                <img :src="image" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
    export default {
        props: [
            'images'
        ],
        data () {
            return {
                
            }
        }
    }
</script>
<style lang="less" scoped>
    .van-swipe{
        width: 10rem;
        height: 4rem;
        img{
            width: 100%;
            height: 4rem;
        }
    }
</style>