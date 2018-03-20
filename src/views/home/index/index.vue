<template>
    <div id="home">
        <router-view></router-view>
        <van-tabbar v-model="active" @change='barChange'>
            <van-tabbar-item icon="shop">
                <span>首页</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon1.active : icon1.normal" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="chat" :info='count'>
                <span>购物车</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon2.active : icon2.normal" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="records">
                <span>我的</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon3.active : icon3.normal" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import a from '@/assets/image/home/home.png';
    import b from '@/assets/image/home/home_pur.png';
    import c from '@/assets/image/home/shop_car1.png';
    import d from '@/assets/image/home/shop_car2.png';
    import e from '@/assets/image/home/ren.png';
    import f from '@/assets/image/home/wode.png';
    export default {
        data () {
            return {
                active: 0,
                icon1: {
                    normal: a,
                    active: b
                },
                icon2: {
                    normal: c,
                    active: d
                },
                icon3: {
                    normal: e,
                    active: f
                },
                count: "99+"
            }
        },
        watch: {
            $route() {
                this.changeActive();
            },
            active(){
                if (this.active == 1) {
                    this.count = "";
                } else {
                    this.count = "99" + "+";
                }
            }
        },
        mounted () {
            this.changeActive();
        },
        methods: {
            barChange(active){
                if (active === 0) {
                    this.$router.push({
                        name: 'home'
                    });
                } else if (active === 1) {
                    this.$router.push({
                        name: 'shopCar'
                    });
                } else if (active === 2) {
                    this.$router.push({
                        name: 'user'
                    });
                } 
            },
            changeActive(){
                switch (this.$route.path) {
                    case "/home/":
                        this.active = 0;
                        break;
                    case "/home/shopCar":
                        this.active = 1;
                        break;
                    case "/home/user":
                        this.active = 2;
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../style/less/public/var.less';
    #home{
        // margin-top: 46px;
        .van-tabbar-item--active{
            color: @color-common1;
        }
    }
</style>