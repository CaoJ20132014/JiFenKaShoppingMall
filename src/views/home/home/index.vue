<template>
    <div id="Index">
        <Title :data='heard'></Title>
        <Banner :images='Banner'></Banner>
    </div>
</template>
<script>    
    import a from '@/assets/image/banner/1.jpg';
    import b from '@/assets/image/banner/2.jpg';
    import c from '@/assets/image/banner/3.jpg';
    import d from '@/assets/image/banner/4.jpg';
    import e from '@/assets/image/banner/5.jpg';
    import Banner from '@/components/Banner/banner.vue';
    import Title from '@/components/Heard/heard.vue';
    export default {
        components: {
            Banner,
            Title
        },
        data () {
            return {
                Banner: {
                    imgArr: [a,b,c,d,e],
                    BannerConfig: {
                        autoplay: 4000,
                        show_indicators: true
                    }
                },
                heard: {
                    title: '首页',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '我的',
                    click_left: this.onClickLeft,
                    click_right: this.onClickRight
                }
            }
        },
        methods: {
            onClickLeft() {
                console.log('返回');
            },
            onClickRight() {
                console.log('按钮');
            }
        }
    }
</script>
<style lang="less" scoped>

</style>