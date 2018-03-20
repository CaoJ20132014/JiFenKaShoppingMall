<template>
    <div id="CardInfo">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 添加快捷支付卡 -->
        <div class="Info">
            <div class="top">
                <p>银行卡</p>
                <p>农业银行 储蓄卡（4779）</p>
            </div>
            <div class="font">
                <img src="../../assets/image/financ/green_dun.png" alt="">
                <p>信息强加密处理，保障个人隐私不泄露</p>
            </div>
            <van-cell-group>
                <van-field v-model="info.username" label="持卡人" icon="clear" placeholder="请输入姓名" @click-icon="info.username = ''" />
                <van-field v-model="info.num" label="卡号" icon="clear" maxlength="19" placeholder="请输入银行卡号" @click-icon="info.num = ''" />
            </van-cell-group>
            <van-cell-group class="last">
                <van-field v-model="info.tel" type="number" maxlength="11" label="手机号" icon="clear" placeholder="请输入手机号" @click-icon="info.tel = ''" />
                <div class="code">
                    <div>验证码</div>
                    <input type="text" v-model="info.code" placeholder="请输入验证码">
                    <button @click="getCode" :disabled="info.tel == '' ? true : false">获取验证码</button>
                </div>
            </van-cell-group>
            <button class="submit" :class="bg ? 'pur_bg' : ''" :disabled="!bg" @click="next">下一步</button>
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
                    title: '填写银行卡信息',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: "",
                    icon: ''
                },
                info: {
                    username: "",
                    num: "",
                    code: "",
                    tel: ""
                }
            }
        },
        computed: {
            bg() {
                return (this.info.username != '' && this.info.num != '' && this.info.tel != '' && this.info.code != '') ? true : false;
            }
        },
        watch: {
            
        },
        mounted () {
            
        },
        methods: {
            onClickLeft() {
                
            },
            next() {
                
            },
            getCode() {
                console.log(1);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/public/var.less";
    #CardInfo{
        margin-top: @base-margin*11.2;
        font-size: 0;
        padding-bottom: @base-padding*2;
        .Info{
            .top{
                display: flex;
                height: 1.2rem;
                padding: 0 @base-padding*2;
                background-color: white;
                border-top: .013333rem solid #e9e9e9;
                border-bottom: .013333rem solid #e9e9e9;
                p{
                    font-size: .4rem;
                    line-height: 1.2rem;
                    &:first-child{
                        font-size: .32rem;
                        padding-right: @base-padding*2;
                        margin-top: 1px;
                    }
                }
            }
            .font{
                display: flex;
                padding: @base-padding*2.8 @base-padding*2;
                img{
                    width: .266667rem;
                    height: .32rem;
                    margin-top: 3px;
                }
                p{
                    font-size: .346667rem;
                    padding-left: @base-padding*2;
                }
            }
            .submit{
                width: 9.466667rem;
                height: 1.066667rem;
                border-radius: .106667rem;
                font-size: .426667rem;
                color: white;
                margin-left: @base-margin*2;
                margin-top: 1.533333rem;
            }
            .van-cell-group.van-hairline--top-bottom{
                border-top: .013333rem solid #e9e9e9;
                border-bottom: .013333rem solid #e9e9e9;
            }
            .last{
                margin-top: @base-margin*3;
                .code{
                    display: flex;
                    justify-content: space-between;
                    padding: 10px .266667rem;
                    font-size: 14px;
                    position: relative;
                    div{
                        position: absolute;
                        left: @base-margin*2;
                        top: 10px;
                        line-height: 24px;
                    }
                    input{
                        width: 4rem;
                        font-size: 14px;
                        line-height: 24px;
                        padding-left: 90px;
                    }
                    button{
                        width: 70px;
                        background-color: white;
                        color: #229f4b;
                    }
                }
            }
            .pur_bg{
                background: linear-gradient(to right, #6852bc, #934dda);
            }
        }
    }
</style>