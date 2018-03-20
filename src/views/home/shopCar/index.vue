<template>
    <div id="ShopCar">
        <Title :data='heard'></Title>
        <!-- 集分商城 -->
        <div class="PointShop" v-show="pointList.length > 0 ? true : false">
            <div class="checkbox">
                <van-checkbox v-model="checkedPoint" @click.native="PointAllChecked">集分商城</van-checkbox>
                <div>
                    <van-button v-show="PointShowExit" type="danger" size="mini" @click="PointShow=true,PointShowExit=false">编辑</van-button>
                    <van-button v-show="PointShow" type="default" size="mini" @click="PointDelete">删除</van-button>
                    <van-button v-show="PointShow" type="primary" size="mini" @click="PointShow=false,PointShowExit=true">完成</van-button>
                </div>
            </div>
            <van-checkbox-group v-model="checkedGoods.PointChecked">
                <div class="Shop-order" v-for="(item, index) in pointList" :key="index">
                    <div class="order-left">
                        <van-checkbox :name="item.id" @click.native="PointChange(item.id, index)"></van-checkbox>
                    </div>
                    <div class="order-cent">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="order-right">
                        <div class="right-top">
                            <div class="title">
                                <p v-text="item.title"></p>
                                <img src="../../../assets/image/shopCar/del.png" alt="" :ref="'PointExit'+index" @click="NeedExit('1', index, item.number)">
                                <img src="../../../assets/image/shopCar/xx.png" alt="" :ref="'PointSuccess'+index" @click="Success('1', index, item.number)">
                            </div>
                            <div class="dec">
                                <p v-text="item.dec"></p>
                            </div>
                        </div>
                        <div class="right-bot">
                            <p>
                                <span>￥{{(item.price - 0).toFixed(2)}}元</span>
                                <span v-show="item.isSingle == '1'">+ {{item.point}}集分</span>
                            </p>
                            <div class="add-reduce">
                                <button @click="PointReduce(index, item)" :ref="'PointReduce'+index" disabled>-</button>
                                <input type="text" :value="item.number" readonly="readonly">
                                <button @click="PointAdd(index, item)" :ref="'PointAdd'+index" disabled>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </van-checkbox-group>
        </div>
        <!-- 零元购 -->
        <div class="ZeroShop" v-show="zeroList.length > 0 ? true : false">
            <div class="checkbox">
                <van-checkbox v-model="checkedZero" @click.native="ZeroAllChecked">零元购</van-checkbox>
                <div>
                    <van-button v-show="ZeroShowExit" type="danger" size="mini" @click="ZeroShow=true,ZeroShowExit=false">编辑</van-button>
                    <van-button v-show="ZeroShow" type="default" size="mini" @click="ZeroDelete">删除</van-button>
                    <van-button v-show="ZeroShow" type="primary" size="mini" @click="ZeroShow=false,ZeroShowExit=true">完成</van-button>
                </div>
            </div>
            <van-checkbox-group v-model="checkedGoods.ZeroChecked">
                <div class="Shop-order" v-for="(item, index) in zeroList" :key="index">
                    <div class="order-left">
                        <van-checkbox :name="item.id" @click.native="ZeroChange(item.id, index)"></van-checkbox>
                    </div>
                    <div class="order-cent">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="order-right">
                        <div class="right-top">
                            <div class="title">
                                <p v-text="item.title"></p>
                                <img src="../../../assets/image/shopCar/del.png" alt="" :ref="'ZeroExit'+index" @click="NeedExit('2', index, item.number)">
                                <img src="../../../assets/image/shopCar/xx.png" alt="" :ref="'ZeroSuccess'+index" @click="Success('2', index, item.number)">
                            </div>
                            <div class="dec">
                                <p v-text="item.dec"></p>
                            </div>
                        </div>
                        <div class="right-bot">
                            <p>￥{{(item.price - 0).toFixed(2)}}元</p>
                            <div class="add-reduce">
                                <button @click="ZeroReduce(index, item)" :ref="'ZeroReduce'+index" disabled>-</button>
                                <input type="text" :value="item.number" readonly="readonly">
                                <button @click="ZeroAdd(index, item)" :ref="'ZeroAdd'+index" disabled>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </van-checkbox-group>
        </div>
        <!-- 底部 -->
        <div class="BotArea">
            <div class="BotArea-left">
                <van-checkbox v-model="checkedAll" @click.native="CheckedAll">全选</van-checkbox>
            </div>
            <div class="BotArea-con">
                <p v-show="isPay">
                    总计：<span>￥{{totalMoney}}元</span>
                    <span v-show="isShow"> + {{checkedGoods.PointCheckedPointPrice}}集分</span>
                </p>
            </div>
            <div class="BotArea-right" @click="Submit">结算</div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'vant';
    import Public from '@/until/public/until';
    import Title from '@/components/Heard/heard.vue';
    import a from '@/assets/image/shopCar/iphone.png';
    export default {
        components: {
            Title
        },
        data () {
            return {
                PointShowExit: true,
                PointShow: false,
                ZeroShowExit: true,
                ZeroShow: false,
                ExitNum: null,
                heard: {
                    title: '购物车',
                    left_text: '返回',
                    rightIcon: false,
                    right_text: '',
                    click_left: this.onClickLeft,
                    click_right: ""
                },
                checkedZero: false,
                checkedPoint: false,
                checkedAll: false,
                checkedGoods: {
                    PointChecked: [],
                    ZeroChecked: [],
                    PointCheckedCashPrice: null,
                    PointCheckedPointPrice: null,
                    ZeroCheckedPrice: null
                },
                pointList: [{
                    id: "1",
                    title: "话费充值100元，首冲送13兑币",
                    dec: "费已到账，13兑币已到账",
                    number: "2",
                    price: "100",
                    img: a,
                    isSingle: '1',
                    point: "200"
                }, {
                    id: "2",
                    title: "话费充值100元，首冲送13兑币",
                    dec: "费已到账，13兑币已到账",
                    number: "4",
                    price: "200",
                    img: a,
                    isSingle: '2',
                    point: ""
                }, {
                    id: "3",
                    title: "话费充值100元，首冲送13兑币",
                    dec: "费已到账，13兑币已到账",
                    number: "6",
                    price: "300",
                    img: a,
                    isSingle: '1',
                    point: "888"
                }],
                zeroList: [{
                    id: "1",
                    title: "话费充值100元，首冲送13兑币",
                    dec: "费已到账，13兑币已到账",
                    number: "2",
                    price: "99.9",
                    img: a
                }, {
                    id: "2",
                    title: "话费充值100元，首冲送13兑币",
                    dec: "费已到账，13兑币已到账",
                    number: "4",
                    price: "299.9",
                    img: a
                }, {
                    id: "3",
                    title: "话费充值100元，首冲送13兑币",
                    dec: "费已到账，13兑币已到账",
                    number: "6",
                    price: "199.9",
                    img: a
                }]
            }
        },
        computed: {
            isShow(){
                return this.checkedGoods.PointCheckedPointPrice == null ? false : true;
            },
            isPay(){
                return this.checkedGoods.PointCheckedCashPrice != null || this.checkedGoods.ZeroCheckedPrice != null ? true : false;
            },
            totalMoney(){
                if (this.checkedGoods.PointCheckedCashPrice == null && this.checkedGoods.ZeroCheckedPrice != null) {
                    return (this.checkedGoods.ZeroCheckedPrice-0).toFixed(2);
                } else if(this.checkedGoods.PointCheckedCashPrice != null && this.checkedGoods.ZeroCheckedPrice == null){
                    return (this.checkedGoods.PointCheckedCashPrice-0).toFixed(2);
                } else if(this.checkedGoods.PointCheckedCashPrice != null && this.checkedGoods.ZeroCheckedPrice != null){
                    return ((this.checkedGoods.PointCheckedCashPrice-0) + (this.checkedGoods.ZeroCheckedPrice-0)).toFixed(2);
                }
            }
        },
        watch: {
            checkedZero(newVal, oldVal){
                if (this.checkedPoint && newVal) {
                    this.checkedAll = true;
                } else {
                    this.checkedAll = false;
                }
            },
            checkedPoint(newVal, oldVal){
                if (this.checkedZero && newVal) {
                    this.checkedAll = true;
                } else {
                    this.checkedAll = false;
                }
            }
        },
        methods: {
            PointChange(id, index) {       // 集分商城单选
                if (this.checkedGoods.PointChecked.indexOf(id) == -1) {
                    this.checkedGoods.PointChecked.push(id);
                    this.SingleCheckedAdd('1', id, index);
                    if (this.checkedGoods.PointChecked.length == this.pointList.length) {
                        this.checkedPoint = true;
                    } else {
                        this.checkedPoint = false;
                    }
                } else {
                    this.SingleCheckedReduce('1', id, index);
                    this.checkedPoint = false;
                    this.checkedAll = false;
                }
            },
            ZeroChange(id, index) {        // 零元购单选
                if (this.checkedGoods.ZeroChecked.indexOf(id) == -1) {
                    this.checkedGoods.ZeroChecked.push(id);
                    this.SingleCheckedAdd('2', id, index);
                    if (this.checkedGoods.ZeroChecked.length == this.zeroList.length) {
                        this.checkedZero = true;
                    } else {
                        this.checkedZero = false;
                    }
                } else {
                    this.SingleCheckedReduce('2', id, index);
                    this.checkedZero = false;
                    this.checkedAll = false;
                }
            },
            PointAllChecked() {     // 集分商城全选
                this.checkedGoods.PointCheckedCashPrice = null;
                this.checkedGoods.PointCheckedPointPrice = null;
                if (!this.checkedPoint) {
                    if (this.checkedZero) {
                        this.checkedAll = true;
                    }
                    this.checkedGoods.PointChecked = [];
                    this.pointList.forEach(item => {
                        this.checkedGoods.PointChecked.push(item.id);
                        this.checkedGoods.PointCheckedCashPrice += Public.Ride((item.price - 0), item.number);
                        this.checkedGoods.PointCheckedPointPrice += Public.Ride((item.point - 0), item.number);
                    });
                } else {
                    this.checkedAll = false;
                    this.checkedGoods.PointChecked = [];
                    this.checkedGoods.PointCheckedCashPrice = null;
                    this.checkedGoods.PointCheckedPointPrice = null;
                }
            },
            ZeroAllChecked() {      // 零元购全选
                this.checkedGoods.ZeroCheckedPrice = null;
                if (!this.checkedZero) {
                    if (this.checkedPoint) {
                        this.checkedAll = true;
                    }
                    this.checkedGoods.ZeroChecked = [];
                    this.zeroList.forEach(item => {
                        this.checkedGoods.ZeroChecked.push(item.id);
                        this.checkedGoods.ZeroCheckedPrice += Public.Ride((item.price - 0), item.number);
                    });
                } else {
                    this.checkedAll = false;
                    this.checkedGoods.ZeroChecked = [];
                    this.checkedGoods.ZeroCheckedPrice = null;
                }
            },
            PointAdd(index, item) {           // 集分商城加商品数量
                if (this.checkedGoods.PointChecked.indexOf(item.id) != -1) {
                    this.pointList[index].number = (this.pointList[index].number - 0) + 1;
                    this.SingleAdd('1', item);
                } else {
                    this.pointList[index].number = (this.pointList[index].number - 0) + 1;
                }
            },
            PointReduce(index, item) {        // 集分商城减商品数量
                if (this.pointList[index].number > 1) {
                    if (this.checkedGoods.PointChecked.indexOf(item.id) != -1) {
                        this.pointList[index].number = (this.pointList[index].number - 0) - 1;
                        this.SingleReduce('1', item);
                    } else {
                        this.pointList[index].number = (this.pointList[index].number - 0) - 1;
                    }
                }
            },
            ZeroAdd(index, item) {            // 零元购加商品数量
                if (this.checkedGoods.ZeroChecked.indexOf(item.id) != -1) {
                    this.zeroList[index].number = (this.zeroList[index].number - 0) + 1;
                    this.SingleAdd('2', item);
                } else {
                    this.zeroList[index].number = (this.zeroList[index].number - 0) + 1;
                }
            },
            ZeroReduce(index, item) {         // 零元购减商品数量
                if (this.zeroList[index].number > 1) {
                    if (this.checkedGoods.PointChecked.indexOf(item.id) != -1) {
                        this.zeroList[index].number = (this.zeroList[index].number - 0) - 1;
                        this.SingleReduce('2', item);
                    } else {
                        this.zeroList[index].number = (this.zeroList[index].number - 0) - 1;
                    }
                }
            },
            SingleAdd(type, item) {
                if (type == "1") {          // 集分商城
                    this.checkedGoods.PointCheckedCashPrice += (item.price - 0);
                    this.checkedGoods.PointCheckedPointPrice += (item.point - 0);
                } else if(type == "2"){     // 零元购
                    this.checkedGoods.ZeroCheckedPrice += (item.price - 0);
                }
            },
            SingleReduce(type, item) {
                if (type == "1") {          // 集分商城
                    this.checkedGoods.PointCheckedCashPrice -= (item.price - 0);
                    this.checkedGoods.PointCheckedPointPrice -= (item.point - 0);
                } else if(type == "2"){     // 零元购
                    this.checkedGoods.ZeroCheckedPrice -= (item.price - 0);
                }
            },
            SingleCheckedAdd(type, id, index) {
                if (type == '1') {          // 集分商城
                    if (this.pointList[index].id == id) {
                        this.checkedGoods.PointCheckedCashPrice += Public.Ride((this.pointList[index].price - 0), this.pointList[index].number);
                        this.checkedGoods.PointCheckedPointPrice += Public.Ride((this.pointList[index].point - 0), this.pointList[index].number);
                    }
                } else if(type == '2'){     // 零元购
                    if (this.zeroList[index].id == id) {
                        this.checkedGoods.ZeroCheckedPrice += Public.Ride((this.zeroList[index].price - 0), this.zeroList[index].number);
                    }
                }
            },
            SingleCheckedReduce(type, id, index) {
                if (type == '1') {          // 集分商城
                    if (this.pointList[index].id == id) {
                        this.checkedGoods.PointCheckedCashPrice -= Public.Ride((this.pointList[index].price - 0), this.pointList[index].number);
                        this.checkedGoods.PointCheckedPointPrice -= Public.Ride((this.pointList[index].point - 0), this.pointList[index].number);
                    }
                } else if(type == '2'){     // 零元购
                    if (this.zeroList[index].id == id) {
                        this.checkedGoods.ZeroCheckedPrice -= Public.Ride((this.zeroList[index].price - 0), this.zeroList[index].number);
                    }
                }
            },
            NeedExit(type, index, number) {                 // 单个数量编辑
                this.ExitNum = number;
                let str1 = "PointReduce" + index;       // 集分商城减按钮
                let str2 = "PointAdd" + index;          // 集分商城加按钮
                let str3 = "ZeroReduce" + index;        // 零元购减按钮
                let str4 = "ZeroAdd" + index;           // 零元购加按钮
                let str5 = "PointExit" + index;         // 集分商城编辑图片按钮
                let str6 = "PointSuccess" + index;      // 集分商城编辑成功按钮
                let str7 = "ZeroExit" + index;          // 零元购编辑图片按钮
                let str8 = "ZeroSuccess" + index;       // 零元购编辑成功按钮
                if (type == "1") {
                    this.$refs[str1][0].disabled = false;
                    this.$refs[str2][0].disabled = false;
                    this.$refs[str5][0].style.display = "none";
                    this.$refs[str6][0].style.display = "block";
                } else if(type == "2"){
                    this.$refs[str3][0].disabled = false;
                    this.$refs[str4][0].disabled = false;
                    this.$refs[str7][0].style.display = "none";
                    this.$refs[str8][0].style.display = "block";
                }
            },
            Success(type, index) {                  // 单个商品数量编辑完成
                let str1 = "PointReduce" + index;
                let str2 = "PointAdd" + index;
                let str3 = "ZeroReduce" + index;
                let str4 = "ZeroAdd" + index;
                let str5 = "PointExit" + index;
                let str6 = "PointSuccess" + index;
                let str7 = "ZeroExit" + index;
                let str8 = "ZeroSuccess" + index;
                if (type == "1") {
                    this.$refs[str1][0].disabled = true;
                    this.$refs[str2][0].disabled = true;
                    this.$refs[str5][0].style.display = "block";
                    this.$refs[str6][0].style.display = "none";
                    if (this.pointList[index].number == this.ExitNum) {
                        Toast.fail('没有修改');
                    } else {
                        Toast.success('修改成功');
                    }
                } else if(type == "2"){
                    this.$refs[str3][0].disabled = true;
                    this.$refs[str4][0].disabled = true;
                    this.$refs[str7][0].style.display = "block";
                    this.$refs[str8][0].style.display = "none";
                    if (this.zeroList[index].number == this.ExitNum) {
                        Toast.fail('没有修改');
                    } else {
                        Toast.success('修改成功');
                    }
                }
            },
            CheckedAll() {                          // 底部全选按钮
                if (!this.checkedAll) {
                    this.checkedPoint = true;
                    this.checkedZero = true;
                    this.PointAllChecked();
                    this.ZeroAllChecked();
                    this.pointList.forEach(item => {
                        this.checkedGoods.PointChecked.push(item.id);
                        this.checkedGoods.PointCheckedCashPrice += (item.price - 0) * item.number;
                        this.checkedGoods.PointCheckedPointPrice += (item.point - 0) * item.number;
                    });
                    this.zeroList.forEach(item => {
                        this.checkedGoods.ZeroChecked.push(item.id);
                        this.checkedGoods.ZeroCheckedPrice += (item.price - 0) * item.number;
                    });
                } else {
                    this.checkedPoint = false;
                    this.checkedZero = false;
                    this.checkedGoods.ZeroChecked = [];
                    this.checkedGoods.ZeroCheckedPrice = null;
                    this.checkedGoods.PointChecked = [];
                    this.checkedGoods.PointCheckedCashPrice = null;
                    this.checkedGoods.PointCheckedPointPrice = null;
                }
            },
            ZeroDelete() {                          // 零元购删除
                console.log(this.checkedGoods.ZeroChecked);
            },
            PointDelete() {                         // 集分商城删除
                console.log(this.checkedGoods.PointChecked);
            },
            onClickLeft() {                         // 顶部返回按钮
                console.log('返回');
            },
            Submit() {                              // 提交结算信息
                if (this.checkedGoods.PointCheckedCashPrice||this.checkedGoods.PointCheckedPointPrice||this.checkedGoods.ZeroCheckedPrice) {
                    console.log("集分商城结算："+this.checkedGoods.PointChecked);
                    console.log("集分现金总计："+this.checkedGoods.PointCheckedCashPrice+" 元");
                    console.log("集分总计："+this.checkedGoods.PointCheckedPointPrice+" 集分");
                    console.log("零元购结算："+this.checkedGoods.ZeroChecked);
                    console.log("零元购总计："+this.checkedGoods.ZeroCheckedPrice+" 元");
                    console.log("总价钱："+(eval(this.checkedGoods.PointCheckedCashPrice)+eval(this.checkedGoods.ZeroCheckedPrice))+" 元");
                } else {
                    console.log(this.$parent.$children);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../style/less/home/shopCar/index.less";
</style>