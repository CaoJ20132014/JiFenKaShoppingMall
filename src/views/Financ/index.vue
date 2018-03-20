<template>
    <div id="Financ">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 头 -->
        <div class="info">
            <div class="top">
                <p class="p_top">昨日收益（元）</p>
                <p class="p_con">{{(info.money-0).toFixed(2)}}</p>
                <p class="p_bot">总金额：{{(info.total-0).toFixed(2)}}</p>
            </div>
            <div class="bot">
                <div class="left">
                    <p>累计收益（元）</p>
                    <p>+{{(info.income-0).toFixed(2)}}</p>
                </div>
                <div class="right">
                    <p>七日年化（%）</p>
                    <p>{{(info.percent-0).toFixed(4)}}</p>
                </div>
            </div>
        </div>
        <!-- 单元格 -->
        <div class="unit">
            <van-cell-group>
                <van-cell v-for="(item, index) in cellList" :key="index" :title="item.title" is-link @click="goPath(item, index)" />
            </van-cell-group>
        </div>
        <!-- 操作 -->
        <div class="operate">
            <div class="left" @click="withdrawals">提现</div>
            <div class="right" @click="recharge">充值</div>
        </div>
    </div>
</template>
<script>
    import Title from '@/components/Heard/heard.vue';
    import Public from '@/until/public/until';
    export default {
        components: {
            Title
        },
        data () {
            return {
                heard: {
                    title: '集分理财',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: '',
                    icon: ''
                },
                info: {
                    money: 1000,
                    total: 6666,
                    income: 88.98,
                    percent: 4.5556
                },
                cellList: [{
                    title: "收入明细",
                    route: "list"
                }, {
                    title: "支出明细",
                    route: "list"
                }, {
                    title: "银行卡",
                    route: ""
                }]
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
            goPath(item, index) {
                if (index != 2) {
                    this.$router.push({
                        name: item.route,
                        params: {
                            type: index
                        }
                    });
                } else {
                    this.$router.push({
                        name: item.route
                    });
                }
            },
            recharge() {
                this.$router.push({
                    name: "recharge"
                });
            },
            withdrawals() {
                this.$router.push({
                    name: "Input"
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Financ/index.less";
</style>