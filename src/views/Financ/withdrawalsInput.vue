<template>
    <div id="withdrawalsInput">
        <!-- 选择支付方式 -->
        <div class="choose" @click="goCard">
            <div class="left">
                <img :src="checkedInfo.img" alt="">
            </div>
            <div class="con" v-text="checkedInfo.title"></div>
            <div class="right">
                <img src="../../assets/image/index/right_gou.png" alt="">
            </div>
        </div>
        <!-- 输入金额 -->
        <div class="input">
            <div class="top">
                <p>转入金额（收取0.5%手续费）</p>
                <div>
                    ￥ <input type="text" placeholder="0.00" v-model="checkedInfo.money">
                </div>
            </div>
            <div class="bot">当前余额<span>{{(checkedInfo.balance-0).toFixed(2)}}</span>元，<span class="pur" @click="checkedInfo.money = checkedInfo.balance">全部提现</span></div>
        </div>
        <!-- 提交 -->
        <button :class="checkedInfo.money == '' ? '' : 'pur_bg'" :disabled="checkedInfo.money == '' ? true : false" @click="confirm">两小时内到账，确认提现</button>
    </div>
</template>
<script>
    import Title from '@/components/Heard/heard.vue';
    import Public from '@/until/public/until';
    import a from '../../assets/image/financ/weixin.png';
    export default {
        components: {
            Title
        },
        props:['porp'],
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
                checkedInfo: {
                    img: a,
                    title: "微信支付",
                    money: "",
                    balance: 8888.98
                },
                mode: "wx",
                isDisabled: true
            }
        },
        computed: {

        },
        watch: {
            
        },
        mounted () {
            if (this.porp != null) {
                this.checkedInfo.img = this.porp.img;
                let len = this.porp.num.length;
                this.checkedInfo.title = this.porp.title+" 尾号("+this.porp.num.substring(len-4,len)+")";
            }
        },
        methods: {
            goCard() {
                this.$router.push({
                    name: "cardList"
                });
            },
            confirm() {
                this.$router.push({
                    name: 'success',
                    params: {
                        type: "withdrawals"
                    }
				});
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Financ/withdrawals.less";
</style>
