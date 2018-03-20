<template>
    <div id="Address">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 地址列表 -->
        <div class="list">
            <div class="address-list" v-for="(item, index) in addressList" :key="index">
                <div class="list-top">
                    <p v-text="item.name"></p>
                    <p v-text="item.tel"></p>
                </div>
                <div class="list-con">
                    <p v-text="item.detail"></p>
                </div>
                <div class="list-bot">
                    <van-radio :name="item.id" v-model="defult" @change.native="Change">设为默认</van-radio>
                    <p>
                        <span @click="exit(item)">编辑</span>
                        <span @click="delate(item)">删除</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 添加地址 -->
        <div class="add">
            <button @click="add"><b>+ </b>添加地址</button>
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
                    title: '管理收货地址',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: '',
                    icon: ''
                },
                defult: "",     // string
                addressList: [{
                    id: "1",
                    name: "张三",
                    tel: "15617858292",
                    province: "浙江省",
                    city: "杭州市",
                    area: "滨江区",
                    detail: "浙江省杭州市滨江区巨野路256号精修国际中心B座9楼901室精修国际中心B座9楼901室",
                    post: "123456"
                }, {
                    id: "2",
                    name: "李四",
                    tel: "15617858292",
                    province: "浙江省",
                    city: "杭州市",
                    area: "滨江区",
                    detail: "浙江省杭州市滨江区巨野路256号精修国际中心B座9楼901室精修国际中心B座9楼902室",
                    post: "123457"
                }, {
                    id: "3",
                    name: "王五",
                    tel: "15617858292",
                    province: "浙江省",
                    city: "杭州市",
                    area: "滨江区",
                    detail: "浙江省杭州市滨江区巨野路256号精修国际中心B座9楼901室精修国际中心B座9楼903室",
                    post: "123458"
                }, {
                    id: "4",
                    name: "赵六",
                    tel: "15617858292",
                    province: "浙江省",
                    city: "杭州市",
                    area: "滨江区",
                    detail: "浙江省杭州市滨江区巨野路256号精修国际中心B座9楼901室精修国际中心B座9楼904室",
                    post: "123459"
                }, {
                    id: "5",
                    name: "崔二",
                    tel: "15617858292",
                    province: "浙江省",
                    city: "杭州市",
                    area: "滨江区",
                    detail: "浙江省杭州市滨江区巨野路256号精修国际中心B座9楼901室精修国际中心B座9楼905室",
                    post: "123460"
                }]
            }
        },
        computed: {

        },
        watch: {
            
        },
        mounted () {
            this.defult = "3";
        },
        methods: {
            onClickLeft() {

            },
            delate(item) {
                console.log("删除id："+item.id)
            },
            exit(item) {
                console.log(this.defult);
                if (this.defult == item.id) {       // 该地址为默认地址
                    item["is_default"] = true;
                } else {
                    item["is_default"] = false;
                }
                item["postal_code"] = "123456789";
                let date = Public.setTimes('m10');
                Public.JS_Cookie('set', 'address', item, date);
                this.$router.push({
                    name: "exit"
                });
            },
            add() {
                this.$router.push({
                    name: "exit"
                });
            },
            Change() {
                console.log("设置为默认"+this.defult);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Address/index.less";
</style>