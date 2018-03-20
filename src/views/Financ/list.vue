<template>
    <div id="list">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 全部、收入、支出 -->
        <div class="operate">
            <ul class="operate-ul">
                <li v-for="(item, index) in Type" :key="index" :class="item.active ? 'active' : ''" @click="change(index)">{{item.title}}</li>
            </ul>
        </div>
        <!-- 列表 -->
        <div class="List">
            <ul class="List-ul">
                <li v-for="(item, index) in list" :key="index">
                    <p class="top" v-if="item.is">
                        <span v-text="item.title"></span><span class="green">+ {{(item.money-0).toFixed(2)}}</span>
                    </p>
                    <p class="top" v-else-if="!item.is">
                        <span v-text="item.title"></span><span class="yellow">- {{(item.money-0).toFixed(2)}}</span>
                    </p>
                    <p class="bot">
                        <span v-text="item.time"></span><span>余额：￥{{(item.balance-0).toFixed(2)}}</span>
                    </p>
                </li>
            </ul>
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
                    title: '收支明细',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: '',
                    icon: ''
                },
                Type: [{
                    title: "全部",
                    active: true
                }, {
                    title: "收入",
                    active: false
                }, {
                    title: "支出",
                    active: false
                }],
                list: [{
                    title: "通信服务卡充值",
                    money: "22",
                    time: "2018-03-19 16:15",
                    balance: "1088",
                    is: true
                }, {
                    title: "通信服务卡充值",
                    money: "26",
                    time: "2018-03-19 16:15",
                    balance: "1800",
                    is: false
                }, {
                    title: "通信服务卡充值",
                    money: "620",
                    time: "2018-03-19 16:15",
                    balance: "1200",
                    is: true
                }, {
                    title: "通信服务卡充值",
                    money: "820",
                    time: "2018-03-19 16:15",
                    balance: "1080",
                    is: false
                }]
            }
        },
        computed: {

        }, 
        watch: {
            
        },
        mounted () {
            let type = this.$route.params.type;
            if (type == '0') {
                this.Type[0].active = false;
                this.Type[1].active = true;
                this.Type[2].active = false;
            } else if (type == '1') {
                this.Type[0].active = false;
                this.Type[1].active = false;
                this.Type[2].active = true;
            }
        },
        methods: {
            onClickLeft() {

            },
            change(index1) {
                this.Type.forEach((item, index2) => {
                    if (index1 == index2) {
                        this.Type[index1].active = true;
                    } else {
                        this.Type[index2].active = false;
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Financ/list.less";
</style>