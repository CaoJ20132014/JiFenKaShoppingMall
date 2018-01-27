<template>
    <div>
        <Title :data='heard'></Title>
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
                    title: '购物车',
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