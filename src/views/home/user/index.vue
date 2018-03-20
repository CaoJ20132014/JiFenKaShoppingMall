<template>
    <div id="User">
        <!-- 顶部 -->
        <div class="title">我的</div>
        <!-- 头像，用户名 -->
        <div class="userName">
            <div class="userName-top">
                <div class="top-left">
                    <img :src="user.userImg" alt="">
                </div>
                <div class="top-right" v-text="user.userName"></div>
            </div>
            <div class="userName-bot">
                <p>财产总额（元）</p>
                <p>{{(user.money-0).toFixed(2)}}</p>
            </div>
        </div>
        <!-- 消费金、返利金、可兑换、可提现 -->
        <div class="fourMoney">
            <ul class="fourMoney-ul">
                <li class="ul-li" v-for="(item, index) in fourMoney" :key="index">
                    <p v-text="item.title"></p>
                    <p>{{(item.money-0).toFixed(2)}}</p>
                </li>
            </ul>
        </div>
        <!-- 订单 -->
        <div class="myOrder">
            <div class="myOrder-top">
                <van-cell-group>
                    <van-cell title="我的订单" is-link value="查看我的订单" to="/Order/0" />
                </van-cell-group>
            </div>
            <div class="myOrder-bot">
                <ul class="myOrder-bot-ul">
                    <li class="ul-li" v-for="(item, index) in orderList" :key="index" @click="queryOrderDetail(item)">
                        <img :src="item.img" alt="">
                        <p v-text="item.title"></p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 邀请好友、收货地址、成为经营者、集分卡兑换币、常见问题、联系客服 -->
        <div class="domain">
            <van-cell-group>
                <van-cell is-link v-for="(item, index) in funcList" :key="index" :value="item.value" @click="Jump(item)">
                    <template slot="title">
                        <img :src="item.img" alt="">
                        <span class="van-cell-text" v-text="item.title"></span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
    import a from '../../../assets/image/user/jifenshangcheng2.png';
    import b from '../../../assets/image/user/zhifu.png';
    import c from '../../../assets/image/user/shouhuo.png';
    import d from '../../../assets/image/user/wancheng.png';
    import e from '../../../assets/image/user/tuihuo.png';
    import f from '../../../assets/image/user/yaoqing.png';
    import g from '../../../assets/image/user/address.png';
    import h from '../../../assets/image/user/jingyingzhe.png';
    import i from '../../../assets/image/user/qiandai1.png';
    import j from '../../../assets/image/user/wenti.png';
    import k from '../../../assets/image/user/kefu.png';
    export default {
        data () {
            return {
                user: {
                    userImg: a,               // 用户头像
                    userName: "张三",         // 用户名
                    money: 4000              // 用户余额
                },
                fourMoney: [{
                    title: "可兑换",
                    money: 500
                }, {
                    title: "消费金",
                    money: 500
                }, {
                    title: "返利金",
                    money: 500
                }, {
                    title: "可提现",
                    money: 500
                }],
                orderList: [{
                    img: b,
                    title: "待支付",
                    query: "1"
                }, {
                    img: c,
                    title: "待收货",
                    query: "2"
                }, {
                    img: d,
                    title: "已完成",
                    query: "3"
                }, {
                    img: e,
                    title: "退货/售后",
                    query: "4"
                }],
                funcList: [{
                    img: f,
                    title: "邀请好友",
                    value: "",
                    route: "1"
                }, {
                    img: g,
                    title: "收货地址",
                    value: "",
                    route: "address"
                }, {
                    img: h,
                    title: "成为经营者",
                    value: "",
                    route: "3"
                }, {
                    img: i,
                    title: "集分卡兑换币",
                    value: "",
                    route: "4"
                }, {
                    img: j,
                    title: "常见问题",
                    value: "",
                    route: "4"
                }, {
                    img: k,
                    title: "联系客服",
                    value: "9:00-18:00",
                    route: "4"
                }]
            }
        },
        methods: {
            queryOrderDetail(item){
                this.$router.push({
                    name: "order",
                    params: {
                        type: item.query
                    }
                });
            },
            Jump(item){
                this.$router.push({
                    name: item.route
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../style/less/home/user/index.less";
</style>