<template>
    <div id="Exit">
        <!-- 顶部 -->
        <Title :data='heard'></Title>
        <!-- 填写地址信息 -->
        <div class="write">
            <van-cell-group>
                <van-field v-model="info.name" label="收件人" placeholder="请输入姓名..." />
                <van-field v-model="info.tel" label="电话号码" placeholder="请输入手机号码..." />
                <van-field v-model="info.area" label="收件地区" placeholder="请选择收件地区..." readonly="readonly" @focus="Focus" @blur="Blur" />
                <van-field v-model="info.detail" label="详细地址" type="textarea" placeholder="请输入详细地址..." autosize />
                <van-field v-model="info.post" label="邮政编码" placeholder="请输入邮政编码..." />
                <van-area :area-list="areaList" v-show="isShow" @confirm="Finish" @cancel="isShow=false" />
                <van-switch-cell v-model="info.checked" :value="is_default" title="设置为默认地址" />
            </van-cell-group>
            <van-button size="large" @click="save">保存地址</van-button>
        </div>
    </div>
</template>
<script>
    import Title from '@/components/Heard/heard.vue';
    import data from '../../../static/areaList.json';
    import Public from '@/until/public/until';
    export default {
        components: {
            Title
        },
        data () {
            return {
                heard: {
                    title: '添加收货地址',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: '',
                    icon: ''
                },
                areaList: data,
                info: {
                    name: "",
                    tel: "",
                    area: "",
                    detail: "",
                    post: "",
                    checked: false,
                    province: "",
                    city: "",
                    region: ""
                },
                isShow: false,
                is_default: "110101"
            }
        },
        computed: {

        },
        watch: {
            
        },
        mounted () {
            if (Public.JS_Cookie("get", "address")) {
                let obj = Public.JS_Cookie("get", "address");
                this.init(obj);
            }
        },
        methods: {
            onClickLeft() {

            },
            Focus() {
                this.isShow = true;
            },
            Blur() {
                // this.isShow = false;
            },
            Finish(data) {
                this.isShow = false;
                this.is_default = data[2].code;
                if (data[2].code != "-1") {
                    this.info.area = data[0].name + " " + data[1].name + " " + data[2].name;
                    this.info.region = data[2].name;
                } else {
                    this.info.area = data[0].name + " " + data[1].name;
                }
                this.info.province = data[0].name;
                this.info.city = data[1].name;
            },
            save() {
                Public.JS_Cookie("remove", "address");
            },
            init(obj) {
                this.info.name = obj.name;
                this.info.tel = obj.tel;
                this.info.area = obj.province + " " + obj.city + " " + obj.area;
                this.info.detail = obj.detail;
                this.info.post = obj.postal_code;
                this.info.checked = obj.is_default;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../style/less/Address/Exit.less";
</style>