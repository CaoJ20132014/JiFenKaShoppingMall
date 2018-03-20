<template>
    <div id="Details">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 轮播图 -->
        <Banner :images='Banner'></Banner>
        <!-- 商品信息 -->
        <div class="goodsInfo">
            <div class="info-top">
                <p v-text="DetailInfo.title"></p>
            </div>
            <div class="info-con">
                <p>
                    <span>￥</span><span class="big">{{(DetailInfo.cashPrice-0).toFixed(2)}}</span><span>元</span><span v-show="DetailInfo.goodsType == '1'"> + <span class="big" v-text="DetailInfo.pointPrice"></span><span>集分</span></span>
                    <span class="grey">原价：￥{{DetailInfo.oldPrice}}</span>
                </p>
            </div>
            <div class="info-bot">
                <p>
                    <span>快递：免运费</span><span> | </span><span>仅剩：{{DetailInfo.count}}件</span>
                </p>
            </div>
        </div>
        <!-- 选择sku -->
        <div class="choose" @click="chooseSku">
            <div class="choose-left">
                <p v-if="choosed.shu != ''">选择套餐类型，颜色分类</p>
                <p v-else>已选：{{choosed.sku}}</p>
            </div>
            <div class="choose-right">
                <img src="../../assets/image/index/right_gou.png" alt="">
            </div>
        </div>
        <!-- 产品详情-顶部 -->
        <div class="detail-heard">
            <img src="../../assets/image/detail/goodsdetail.png" alt="">
        </div>
        <!-- 详情展示区 -->
        <div class="detail-show-area">
            <img src="../../assets/image/banner/1.jpg" alt="">
            <img src="../../assets/image/banner/2.jpg" alt="">
            <img src="../../assets/image/banner/3.jpg" alt="">
            <img src="../../assets/image/banner/4.jpg" alt="">
            <img src="../../assets/image/banner/5.jpg" alt="">
        </div>
        <!-- 底部加入购物车、立即购买 -->
        <div class="bot-operate">
            <van-goods-action>
                <van-goods-action-mini-btn icon="home" text="首页" @click="toHome" />
                <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn1" primary />
                <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn2" />
            </van-goods-action>
        </div>
    </div>
</template>
<script>
    import a from '@/assets/image/banner/1.jpg';
    import b from '@/assets/image/banner/2.jpg';
    import c from '@/assets/image/banner/3.jpg';
    import d from '@/assets/image/banner/4.jpg';
    import e from '@/assets/image/banner/5.jpg';
    import Title from '@/components/Heard/heard.vue';
    import Banner from '@/components/Banner/DetailBanner.vue';
    import { Toast } from 'vant';
    export default {
        components: {
            Title,
            Banner
        },
        data () {
            return {
                Banner: {
                    imgArr: [a, b, c, d, e],
                    BannerConfig: {
                        autoplay: 4000,
                        show_indicators: true
                    }
                },
                heard: {
                    title: '商品详情',
                    left_text: '返回',
                    rightIcon: true,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: this.onClickRight,
                    icon: "cart"
                },
                DetailInfo: {
                    goodsType: "1",
                    title: "斐讯K2 1200M智能双频无线路由器 WIFI穿墙 PSG1218送价值39元的无线鼠标，赠品数量有限，先到先得。斐讯K2 1200M智能双频无线路由器 WIFI穿墙 PSG1218送价值39元的无线鼠标，赠品数量有限，先到先得",
                    cashPrice: "99.80",
                    pointPrice: "8000",
                    oldPrice: "2000",
                    count: "666"
                },
                choosed: {
                    sku: ""
                }
            }
        },
        computed: {

        },
        watch: {
            
        },
        mounted() {
            let type = this.$route.params.type;
            let id = this.$route.params.id;
            console.log("type:"+type+","+"id:"+id);
        },
        methods: {
            onClickLeft() {
                
            },
            onClickRight() {
                this.$router.push({
                    name: "shopCar"
                });
            },
            toHome() {
                this.$router.push({
                    name: "home"
                });
            },
            onClickBigBtn1() {
                Toast('加入购物车');
            },
            onClickBigBtn2() {
                Toast('立即购买');
            },
            chooseSku() {
                Toast('选择商品sku');
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Detail/index.less";
</style>