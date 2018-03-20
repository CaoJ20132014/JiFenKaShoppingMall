<template>
    <div id="InputInfo">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 添加快捷支付卡 -->
        <div class="Info">
            <p>添加快捷支付卡</p>
            <van-cell-group>
                <van-field v-model="info.username" label="持卡人" icon="clear" placeholder="请输入姓名" @click-icon="info.username = ''" />
                <van-field v-model="info.num" label="卡号" icon="clear" maxlength="19" placeholder="请输入银行卡号" @click-icon="info.num = ''" />
            </van-cell-group>
            <button :class="bg ? 'pur_bg' : ''" :disabled="!bg" @click="next">下一步</button>
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
                    title: '输入卡号',
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
                    result: ""
                }
            }
        },
        computed: {
            bg() {
                return (this.info.username != '' && this.info.num != '') ? true : false;
            }
        },
        watch: {
            // "info.num"() {
            //     let len = this.info.num.length;
            //     let txt = this.info.num;
            //     this.info.result = this.info.num;
            //     if (len == 19) {
            //         let front = txt.substr(0, 4);
            //         let after = txt.substr(len-4, len);
            //         let result = front + "***********" + after;
            //         this.info.num = result;
            //     } else if(len == 16) {
            //         let front = txt.substr(0, 4);
            //         let after = txt.substr(len-4, len);
            //         let result = front + "********" + after;
            //         this.info.num = result;
            //     }
            // }
        },
        mounted () {
            
        },
        methods: {
            onClickLeft() {
                
            },
            next() {
                this.$router.push({
					name: 'cardInfo'
				});
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/public/var.less";
    #InputInfo{
        margin-top: @base-margin*9.2;
        font-size: 0;
        padding-bottom: @base-padding*2;
        .Info{
            p{
                font-size: .373333rem;
                padding-top: @base-padding*4;
                padding-bottom: @base-padding*4;
                padding-left: @base-padding*2;
            }
            button{
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
            .pur_bg{
                background: linear-gradient(to right, #6852bc, #934dda);
            }
        }
    }
</style>
