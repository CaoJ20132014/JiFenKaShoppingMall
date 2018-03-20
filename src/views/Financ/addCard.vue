<template>
    <div id="AddCard">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 添加快捷支付卡 -->
        <div class="fastCard">
            <p>添加快捷支付卡</p>
            <button @click="AddCard"><b>+</b> 添加银行卡</button>
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
                    title: '添加银行卡',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: "",
                    icon: ''
                },
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
            AddCard() {
                this.$router.push({
					name: 'inputInfo'
				});
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/public/var.less";
    #AddCard{
        margin-top: @base-margin*9.2;
        font-size: 0;
        padding-bottom: @base-padding*2;
        .fastCard{
            padding: 0 @base-padding*2;
            p{
                font-size: .373333rem;
                padding-top: @base-padding*4;
                padding-bottom: @base-padding*4;
            }
            button{
                width: 9.466667rem;
                height: 1.066667rem;
                border-radius: .106667rem;
                font-size: .426667rem;
                background-color: #f4f4f4;
                border: 1px solid #696969;
            }
        }
    }
</style>
