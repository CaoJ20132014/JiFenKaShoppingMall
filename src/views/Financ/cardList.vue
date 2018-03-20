<template>
    <div id="CardList">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 列表 -->
        <div class="list">
            <label class="label" :for="item.id" v-for="(item, index) in cardList" :key="index" @click="change(item)">
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
                    title: '申请提现',
                    left_text: '返回',
                    rightIcon: true,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: this.onClickRight,
                    icon: 'add-o'
                },
                cardList: [{
                    id: "1",
                    img: b,
                    checked: false,
                    num: "1234***********9845",
                    title: "中国建设银行",
                    dec: "尾号7162储蓄卡"
                }, {
                    id: "2",
                    img: c,
                    checked: false,
                    num: "1234***********4567",
                    title: "中国农业银行",
                    dec: "尾号1344储蓄卡"
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
            onClickRight() {
                this.$router.push({
					name: 'addCard'
				});
            },
            change(Item) {
                this.cardList.forEach((item, i) => {
                    if (item.id == Item.id) {
                        this.cardList[i].checked = true;
                    } else {
                        this.cardList[i].checked = false;
                    }
                });
                this.$router.push({
					name: 'Input'
				});
                this.$emit('Change', Item);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Financ/cardList.less";
</style>