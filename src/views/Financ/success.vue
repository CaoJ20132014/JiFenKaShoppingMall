<template>
    <div id="Success">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 成功 -->
        <div class="success">
            <div class="top">
                <p class="p_top">
                    <img src="../../assets/image/financ/green_gou.png" alt="">
                    <span v-if="this.$route.params.type == 'recharge'">充值成功</span>
                    <span v-else-if="this.$route.params.type == 'withdrawals'">提现成功</span>
                </p>
                <p class="p_bot">20000元</p>
            </div>
            <div class="bot">
                <p>
                    <span v-if="this.$route.params.type == 'recharge'">充值信息</span>
                    <span v-else-if="this.$route.params.type == 'withdrawals'">到账信息</span>
                </p>
                <p v-text="info.card"></p>
                <p>
                    <span v-if="this.$route.params.type == 'recharge'">+</span>
                    <span v-else-if="this.$route.params.type == 'withdrawals'">-</span>
                    <span>{{(info.money-0).toFixed(2)}}</span>
                </p>
            </div>
        </div>
        <!-- 确定 -->
        <div class="confirm">
            <button @click="goBack">确定</button>
        </div>
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
                    title: '',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: '',
                    icon: ''
                },
                info: {
                    card: "建设银行储蓄卡（7162）",
                    money: "2000.98"
                }
            }
        },
        computed: {

        },
        watch: {
            
        },
        mounted () {
            let type = this.$route.params.type;
            if (type == 'recharge') {
                this.heard.title = '充值成功';
            } else if (type == 'withdrawals') {
                this.heard.title = '提现成功';
            }
        },
        methods: {
            onClickLeft() {

            },
            goBack() {
                let type = this.$route.params.type;
                let params = null;
                if (type == 'recharge') {
                    params = 0;
                } else if (type == 'withdrawals') {
                    params = 1;
                }
                this.$router.push({
                    name: "list",
                    params: {
                        type: params
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/public/var.less";
    #Success{
        margin-top: @base-margin*9.2;
        font-size: 0;
        padding-bottom: @base-padding*2;
        .success{
            width: 9.466667rem;
            padding: 0 @base-padding*2;
            height: 5.2rem;
            background-color: white;
            .top{
                height: 4.24rem;
                border-bottom: .026667rem solid #f4f4f4;
                .p_top{
                    text-align: center;
                    padding-top: 1.253333rem;
                    img{
                        width: .48rem;
                        height: .48rem;
                    }
                    span{
                        font-size: .4rem;
                        vertical-align: top;
                        padding-left: @base-padding*2;
                        color: #10c705;
                    }
                }
                .p_bot{
                    text-align: center;
                    font-size: .533333rem;
                    padding-top: .666667rem;
                }
            }
            .bot{
                display: flex;
                justify-content: space-between;
                p{
                    font-size: .346667rem;
                    line-height: .933333rem;
                    width: 5.273333rem;
                    &:first-child{
                        color: #898989;
                        width: 2.16rem;
                        text-align: left;
                    }
                    &:last-child{
                        width: 2.033333rem;
                        text-align: right;
                    }
                }
            }
        }
        .confirm{
            button{
                width: 9.466667rem;
                height: 1.066667rem;
                border-radius: .106667rem;
                font-size: .426667rem;
                color: white;
                margin-left: @base-margin*2;
                margin-top: 1rem;
                background: linear-gradient(to right, #6852bc, #934dda);
            }
        }
    }
</style>
