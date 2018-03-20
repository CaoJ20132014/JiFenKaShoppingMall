<template>
    <div id="Order">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 全部订单、待付款、待收货、已完成、退换货 -->
        <div class="fiveOrder">
            <ul class="fiveOrder-ul">
                <li v-for="(item, index) in orderType" :key="index" :class="item.active ? 'active' : ''" @click="changeNav(index)">
                    <span v-text="item.title"></span>
                </li>
            </ul>
        </div>
        <!-- 订单列表 -->
        <div class="ScrollLoad" v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="200">
            <div class="orderList" v-for="(item1, i) in orderList" :key="i">
                <div class="orderList-top">
                    <p class="top-left">
                        <span>订单编号：</span>
                        <span v-text="item1.orderNumber"></span>
                    </p>
                    <p class="top-right">
                        <span v-if="item1.orderState == '1'">交易完成</span>
                        <span v-else-if="item1.orderState == '2'">待付款</span>
                        <span v-else-if="item1.orderState == '3'">待发货</span>
                        <span v-else-if="item1.orderState == '4'">待收货</span>
                        <span v-else-if="item1.orderState == '5'">退货中</span>
                        <span v-else-if="item1.orderState == '6'">交易取消</span>
                    </p>
                </div>
                <div class="orderList-con" v-for="(item2, index) in item1.detail" :key="index">
                    <div class="con-left">
                        <img :src="item2.img" alt="">
                    </div>
                    <div class="con-con">
                        <div class="div-top">
                            <p v-text="item2.title"></p>
                            <p>￥{{(item2.price-0).toFixed(2)}}</p>
                        </div>
                        <div class="div-bot">
                            <p v-text="item2.dec"></p>
                            <p>x {{item2.count}}</p>
                        </div>
                    </div>
                </div>
                <div class="orderList-bot">
                    <p>
                        共 <span v-text="item1.totalCount"></span> 件商品，合计：<span>￥<span v-text="item1.total"></span>元<span v-show="item1.totalPoint"> + <span v-text="item1.totalPoint"></span>集分</span></span>(含运费3元)
                    </p>
                    <div class="btn-group">
                        <div v-if="item1.orderState == '1'">
                            <van-button size="small" type="danger">申请退货</van-button>
                        </div>
                        <div v-else-if="item1.orderState == '2'">
                            <van-button size="small" type="primary">立即付款</van-button>
                            <van-button size="small" type="danger">取消订单</van-button>
                        </div>
                        <div v-else-if="item1.orderState == '3'">
                            <van-button size="small" type="danger">提醒发货</van-button>
                        </div>
                        <div v-else-if="item1.orderState == '4'">
                            <van-button size="small" type="danger">查看物流</van-button>
                            <van-button size="small" type="primary">确认收货</van-button>
                        </div>
                        <div v-else-if="item1.orderState == '5'">
                            <van-button size="small" type="primary">查看进度</van-button>
                        </div>
                        <div v-else-if="item1.orderState == '6'">
                            <van-button size="small" type="danger">删除订单</van-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 没有数据了 -->
        <div class="noData" v-show="noData">
            <p>我也是有底线的...</p>
        </div>
    </div>
</template>
<script>
    import Title from '@/components/Heard/heard.vue';
    import a from '@/assets/image/shopCar/iphone.png';
    import { Toast } from 'vant';
    export default {
        components: {
            Title
        },
        data () {
            return {
                disabled: false,
                page: 1,
                noData: false,
                heard: {
                    title: '全部订单',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: ""
                },
                orderType: [{
                    title: "全部",
                    active: true
                }, {
                    title: "待付款",
                    active: false
                }, {
                    title: "待收货",
                    active: false
                }, {
                    title: "已完成",
                    active: false
                }, {
                    title: "退换货",
                    active: false
                }],
                orderList: [{
                    id: "1",
                    orderNumber: "123456789",
                    total: "499.5",
                    orderState: "1",
                    totalCount: "5",
                    detail: [{
                        img: a,
                        title: "这个是商品标题这个是商品标题这个是商品标题",
                        dec: "这个是商品描述这个是商品标题这个是商品标题这个是商品标题",
                        price: "99.9",
                        count: "2"
                    }, {
                        orderState: "2",
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "3"
                    }]
                }, {
                    id: "2",
                    orderNumber: "123456789",
                    total: "499.5",
                    orderState: "2",
                    totalCount: "4",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "4"
                    }]
                }, {
                    id: "5",
                    orderNumber: "123456789",
                    total: "499.5",
                    orderState: "3",
                    totalCount: "6",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "6"
                    }]
                }, {
                    id: "3",
                    orderNumber: "123456789",
                    total: "499.5",
                    totalPoint: "800",
                    orderState: "1",
                    totalCount: "5",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "2"
                    }, {
                        orderState: "2",
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "3"
                    }]
                }, {
                    id: "4",
                    orderNumber: "123456789",
                    total: "499.5",
                    totalPoint: "1800",
                    orderState: "2",
                    totalCount: "4",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "4"
                    }]
                }, {
                    id: "8",
                    orderNumber: "123456789",
                    total: "499.5",
                    totalPoint: "1800",
                    orderState: "4",
                    totalCount: "4",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "4"
                    }]
                }, {
                    id: "6",
                    orderNumber: "123456789",
                    total: "499.5",
                    totalPoint: "1800",
                    orderState: "5",
                    totalCount: "4",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "4"
                    }]
                }, {
                    id: "7",
                    orderNumber: "123456789",
                    total: "499.5",
                    totalPoint: "1800",
                    orderState: "6",
                    totalCount: "4",
                    detail: [{
                        img: a,
                        title: "这个是商品标题",
                        dec: "这个是商品描述",
                        price: "99.9",
                        count: "4"
                    }]
                }]
            }
        },
        watch: {
            
        },
        computed: {
            
        },
        mounted () {            // 根据路由传过来的类型去查询订单信息
            let type = this.$route.params.type;
            this.changeNav(eval(type));
        },
        methods: {
            onClickLeft() {                         // 顶部返回按钮
                console.log('返回');
            },
            changeNav(index1) {
                this.orderType.forEach((item, index2) => {
                    if (index1 == index2) {
                        this.orderType[index1].active = true;
                    } else {
                        this.orderType[index2].active = false;
                    }
                });
                console.log(window.location.href);
                // let baseUrl = "http://localhost:8888/Order/";
                // window.location.href = baseUrl + index1;
            },
            loadMore() {
                if (this.page <= 3) {
                    console.log(this.page);
                    this.page++;
                    this.disabled = true;
                    Toast.loading({
                        mask: true,
                        message: '加载中...',
                        duration: 1000,
                        mask: false,
                        forbidClick: false
                    });
                    let obj = {
                        id: "7",
                        orderNumber: "123456789",
                        total: "499.5",
                        totalPoint: "1800",
                        orderState: "6",
                        totalCount: "4",
                        detail: [{
                            img: a,
                            title: "这个是商品标题",
                            dec: "这个是商品描述",
                            price: "99.9",
                            count: "4"
                        }]
                    }
                    setTimeout(() => {
                        this.orderList.push(obj);
                        this.disabled = false;
                    }, 1000);
                } else {
                    this.disabled = false;
                    this.noData = true;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Order/index.less";
</style>