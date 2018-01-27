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
            <van-tabbar-item icon="chat" info='99'>
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
                }
            }
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
            }
        }
    }
</script>
<style lang="less" scoped>
    #home{
        margin-top: 46px;
    }
</style>