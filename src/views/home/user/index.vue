<template>
    <div id="User">
        <Title :data='heard'></Title>
        <van-cell-group>
            <van-cell title="收货地址" icon="location" is-link /> 
            <van-cell title="收货地址" icon="location" is-link /> 
            <van-cell title="收货地址" icon="location" is-link />      
        </van-cell-group>
    </div>
</template>
<script>
    import Title from '@/components/Heard/heard.vue';
    export default {
        components: {
            Title
        },
        data () {
            return {
                heard: {
                    title: '我的',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
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