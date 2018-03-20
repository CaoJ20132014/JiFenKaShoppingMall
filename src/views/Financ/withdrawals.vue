<template>
    <div id="Withdrawals">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <router-view @Change="routerChange" :porp="dataList"></router-view>
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
                    title: '申请提现',
                    left_text: '返回',
                    rightIcon: true,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: this.onClickRight,
                    icon: 'question'
                },
                dataList: null
            }
        },
        computed: {

        },
        watch: {
            
        },
        mounted () {
            
        },
        methods: {
            onClickLeft() {
                
            },
            onClickRight() {

            },
            routerChange(val) {
                this.dataList = val;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Financ/withdrawals.less";
</style>