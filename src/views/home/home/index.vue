<template>
    <div id="Index" ref="Index">
        <!-- 轮播图 -->
        <Banner :images='Banner'></Banner>
        <!-- 搜索框，消息，扫一扫 -->
        <div class="search-news">
            <van-search placeholder="请输入商品名称" v-model="value" />
            <img class="saosao" src="../../../assets/image/index/saosao.png" alt="" @click="saosao">
            <div class="news">
                <img class="newsImg" src="../../../assets/image/index/news.png" alt="">
                <p v-show="hasNews"></p>
            </div>
        </div>
        <!-- 四个按钮，集分商城，积分兑换，集分理财，集分游戏 -->
        <div class="fourBtn">
            <ul>
                <li v-for="(item, index) in btnPic" :key="index" @click="Jump(item.route)">
                    <img :src="item.img" alt="">
                    <p v-text="item.title"></p>
                </li>
            </ul>   
        </div>
        <!-- 零元购 -->
        <div class="zero">
            <div class="zero-top">
                <div class="zero-top-left">
                    <img src="../../../assets/image/index/buy.png" alt="">
                    <span>零元购</span>
                </div>
                <div class="zero-top-right">
                    <img src="../../../assets/image/index/right_gou.png" alt="">
                </div>
            </div>
            <div class="zero-bot">
                <img src="../../../assets/image/index/ad.png" alt="">
            </div>
        </div>
        <!-- 精选专题 -->
        <div class="Select">
            <div class="Select-top">
                <div class="Select-top-left">
                    <img src="../../../assets/image/index/star_pur.png" alt="">
                    <span>精选专题</span>
                </div>
                <div class="Select-top-right">
                    <span>查看更多</span>
                    <img src="../../../assets/image/index/right_gou.png" alt="">
                </div>
            </div>
            <div class="Select-bot">
                <ul class="Select-bot-ul">
                    <li class="ul-li" v-for="item in SelectList" :key="item.id">
                        <img :src="item.img" alt="">
                        <p class="dec" v-text="item.dec"></p>
                        <p class="keyWord" v-text="item.keyWord"></p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 新人专享 -->
        <div class="newPeople" v-show="isNewPeople">
            <img class="sign" src="../../../assets/image/index/newperple.png" alt="">
            <img class="adv" src="../../../assets/image/index/guanggao.png" alt="">
        </div>
        <!-- 猜你喜欢 -->
        <div class="like" v-waterfall-lower="loadMore" waterfall-disabled="Disabled" waterfall-offset="100">
            <div class="like-top">
                <img src="../../../assets/image/index/gass.png" alt="">
            </div>
            <div class="like-bot">
                <ul class="like-bot-ul">
                    <li class="ul-li" v-for="(item, index) in goodsList" :key="index" @click="toDetail(item)">
                        <img class="bigImg" :src="item.img" alt="">
                        <div class="bottom">
                            <p class="describe">
                                <img v-show="item.isHot" src="../../../assets/image/index/hot.png" alt="">
                                <img v-show="item.isSelect" src="../../../assets/image/index/select.png" alt="">
                                <span v-text="item.dec"></span>
                            </p>
                            <p class="price">
                                <span>￥{{(item.newPrice-0).toFixed(2)}}</span>
                                <span>￥{{(item.oldPrice-0).toFixed(2)}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 没有更多数据 -->
        <div class="noData" v-show="noData">
            <p>我也是有底线的...</p>
        </div>
    </div>
</template>
<script>    
    import a from '@/assets/image/banner/1.jpg';
    import b from '@/assets/image/banner/2.jpg';
    import c from '@/assets/image/banner/3.jpg';
    import d from '@/assets/image/banner/4.jpg';
    import e from '@/assets/image/banner/5.jpg';
    import f from '@/assets/image/index/shngcheng.png';
    import g from '@/assets/image/index/duihuan.png';
    import h from '@/assets/image/index/licai.png';
    import i from '@/assets/image/index/game.png';
    import j from '@/assets/image/index/11.png';
    import k from '@/assets/image/index/luyouqi.png';
    import Banner from '@/components/Banner/banner.vue';
    import { Toast } from 'vant';
    const WX = require('weixin-js-sdk');			// 引入微信 weixin-js-sdk
    export default {
        components: {
            Banner
        },
        data () {
            return {
                disabled: false,
                page: 1,
                noData: false,
                isNewPeople: true,      // 是否是新人
                hasNews: true,          // 是否有新消息
                value: "",              // 搜索框的输入值
                Banner: {
                    imgArr: [a, b, c, d, e],
                    BannerConfig: {
                        autoplay: 4000,
                        show_indicators: true
                    }
                },
                btnPic: [{
                    img: f,
                    title: "集分商城",
                    route: ""
                }, {
                    img: g,
                    title: "集分兑换",
                    route: ""
                }, {
                    img: h,
                    title: "集分理财",
                    route: "financ"
                }, {
                    img: i,
                    title: "集分游戏",
                    route: "game"
                }],
                SelectList: [{
                    id: 1,
                    img: j,
                    dec: "特殊材料与制造工艺，绝缘",
                    keyWord: "安全、环保"
                }, {
                    id: 2,
                    img: j,
                    dec: "特殊材料与制造工艺，绝缘",
                    keyWord: "安全、环保"
                }, {
                    id: 3,
                    img: j,
                    dec: "特殊材料与制造工艺，绝缘",
                    keyWord: "安全、环保"
                }, {
                    id: 4,
                    img: j,
                    dec: "特殊材料与制造工艺，绝缘",
                    keyWord: "安全、环保"
                }, {
                    id: 5,
                    img: j,
                    dec: "特殊材料与制造工艺，绝缘",
                    keyWord: "安全、环保"
                }],
                goodsList: [{
                    id: 1,
                    img: k,
                    dec: "麻花藤最新变频路由器穿墙穿门信号强",
                    newPrice: 100,
                    oldPrice: 200,
                    isHot: true,
                    isSelect: true
                }, {
                    id: 2,
                    img: k,
                    dec: "麻花藤最新变频路由器穿墙穿门信号强",
                    newPrice: 100,
                    oldPrice: 200,
                    isHot: true,
                    isSelect: true
                }, {
                    id: 3,
                    img: k,
                    dec: "麻花藤最新变频路由器穿墙穿门信号强",
                    newPrice: 100,
                    oldPrice: 200,
                    isHot: true,
                    isSelect: true
                }, {
                    id: 4,
                    img: k,
                    dec: "麻花藤最新变频路由器穿墙穿门信号强",
                    newPrice: 100,
                    oldPrice: 200,
                    isHot: true,
                    isSelect: true
                }]
            }
        },
        mounted() {
            console.log(WX);
            WX.config({
                debug: false,
                appId: "{$signPackage['appId']}",
                timestamp: "{$signPackage['timestamp']}",
                nonceStr: "{$signPackage['nonceStr']}",
                signature: "{$signPackage['signature']}",
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    "onMenuShareQQ",
                    "onMenuShareQZone",
                    'scanQRCode'
                ]
	        });
        },
        methods: {
            saosao() {
                WX.scanQRCode({
                    needResult: 0,                      // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
                    scanType: ["qrCode", "barCode"],    // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                        var result = res.resultStr;     // 当needResult 为 1 时，扫码返回的结果
                    }
                });
            },
            onClickLeft() {
                console.log('返回');
            },
            onClickRight() {
                console.log('按钮');
            },
            Jump(route) {
                this.$router.push({
                    name: route
                });
            },
            toDetail(item) {
                this.$router.push({
                    name: "goodsDetail",
                    params: {
                        type: "1",
                        id: item.id
                    }
                });
            },
            loadMore() {
                if (this.page <= 3) {
                    this.page++;
                    this.disabled = true;
                    Toast.loading({
                        mask: true,
                        message: '加载中...',
                        duration: 500,
                        mask: false,
                        forbidClick: false
                    });
                    let obj = {
                        id: 5,
                        img: k,
                        dec: "麻花藤最新变频路由器穿墙穿门信号强",
                        newPrice: 100,
                        oldPrice: 200,
                        isHot: true,
                        isSelect: false
                    }
                    setTimeout(() => {
                        this.goodsList.push(obj);
                        this.goodsList.push(obj);
                        this.disabled = false;
                    }, 500);
                } else {
                    this.disabled = false;
                    this.noData = true;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../style/less/home/index/index.less";
</style>