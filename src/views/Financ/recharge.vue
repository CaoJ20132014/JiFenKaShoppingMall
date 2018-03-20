<template>
    <div id="Recharge">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 选择支付方式 -->
        <div class="choose" @click="isShow=true">
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
                <p>转入金额</p>
                <div>
                    ￥ <input type="text" placeholder="建议转入100元以上金额" v-model="checkedInfo.money">
                </div>
            </div>
            <div class="bot">预计收益到账时间<span class="pur">2017-05-26</span>（星期六）</div>
        </div>
        <!-- 提交 -->
        <button :class="checkedInfo.money == '' ? '' : 'pur_bg'" :disabled="checkedInfo.money == '' ? true : false" @click="submit">确认充值</button>
        <!-- 蒙版 -->
        <div class="mask" v-show="isShow"></div>
        <!-- 弹框 -->
        <div class="alert" v-show="isShow">
            <div class="alert-top">
                <p></p>
                <p>选择支付方式</p>
                <img src="../../assets/image/financ/xx.png" alt="" @click="isShow=false">
            </div>
            <div class="list">
                <label class="label" :for="item.id" v-for="(item, index) in cardList" :key="index" @click="change(item.id)">
                    <div class="label-left">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="label-con">
                        <p>{{item.title}}</p>
                        <p>{{item.dec}}</p>
                    </div>
                    <div class="label-right">
                        <input class="radio" type="radio" :checked="item.checked" name="radio" :id="item.id">
                        <span class="radioInput"></span>
                    </div>
                </label>
            </div>
            <div class="alert-bot" @click="add">
                <div class="left">
                    <img src="../../assets/image/financ/card_yin.png" alt="">
                </div>
                <div class="con">添加银行卡</div>
                <div class="right">
                    <img src="../../assets/image/index/right_gou.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Title from '@/components/Heard/heard.vue';
    import Public from '@/until/public/until';
    import a from '../../assets/image/financ/weixin.png';
    import b from '../../assets/image/financ/jianshe.png';
    import c from '../../assets/image/financ/nongye.png';
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
                isShow: false,
                cardList: [{
                    id: "custom",
                    img: a,
                    checked: true,
                    title: "微信支付",
                    dec: ""
                }, {
                    id: "1",
                    img: b,
                    checked: false,
                    title: "中国建设银行(7162)",
                    dec: "银行单笔限额10000.00元"
                }, {
                    id: "2",
                    img: c,
                    checked: false,
                    title: "中国农业银行(1344)",
                    dec: "银行单笔限额10000.00元"
                }],
                checkedInfo: {
                    img: a,
                    title: "微信支付",
                    money: ""
                }
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
            change(id) {
                this.cardList.forEach((item, i) => {
                    if (item.id == id) {
                        this.checkedInfo.img = this.cardList[i].img;
                        this.checkedInfo.title = this.cardList[i].title;
                        this.cardList[i].checked = true;
                    } else {
                        this.cardList[i].checked = false;
                    }
                });
            },
            add() {
                this.isShow = false;
                this.$router.push({
					name: 'addCard'
				});
            },
            submit() {
                this.$router.push({
                    name: 'success',
                    params: {
                        type: "recharge"
                    }
				});
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Financ/recharge.less";
</style>