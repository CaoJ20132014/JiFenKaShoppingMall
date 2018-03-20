<template>
	<div id="Game">
		<div class="prize_content">
            <div class="luckDraw" id="luck">
                <table class="luck_table">
                    <!-- 第一行 -->
                    <tr>
                        <td  class="luck-unit luck-unit-0"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-1"><div class="bg_thank"><p class="text">谢谢</p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-2"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-3"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-4">
							<div class="bg_box">
								<p class="text"></p>
							</div>
							<div class="mask_red"></div>
						</td>
                    </tr>
                    <!-- 第二行，横向竖向分别合并三个单元格 -->
                    <tr>
                        <td  class="luck-unit luck-unit-15"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td rowspan="3" colspan="3">
                            <div class="lattice_box">
                                <div class="start_box">
                                    <div id="demo">
                                        <div id="indemo">
                                            <div id="demo1">
                                                <img src="../../assets/image/game/tiaowen.png" border="0" />
                                            </div>
                                            <div id="demo2"></div>
                                        </div>
                                    </div>
                                    <div class="start_btn"></div>
                                </div>
                            </div>
                        </td>
                        <td  class="luck-unit luck-unit-5"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                    </tr>
                    <!-- 第三行 -->
                    <tr>
                        <td  class="luck-unit luck-unit-14"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-6"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                    </tr>
                    <!-- 第四行 -->
                    <tr>
                        <td  class="luck-unit luck-unit-13"><div class="bg_thank"><p class="text">谢谢</p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-7"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                    </tr>
                    <!-- 第五行 -->
                    <tr>
                        <td  class="luck-unit luck-unit-12"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-11"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-10"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-9"><div class="bg_box"><p class="text"></p></div><div class="mask_red"></div></td>
                        <td  class="luck-unit luck-unit-8"><div class="bg_thank"><p class="text">谢谢</p></div><div class="mask_red"></div></td>
                    </tr>
                </table>
            </div>
            <div class="flex_box">
                <div class="yellow myPrize">我的奖品</div>
                <div class="yellow rule">活动规则</div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				click: false		// 用于记录开始抽奖按钮的点击状态
			}
		},
		mounted () {
			// 条纹背景倾斜运动
			let speed = 40;         // 数字越大速度越慢
			if (!this.click) {
				let MyMar = setInterval(this.Marquee, speed);
			} else {
				window.clearInterval(MyMar);
			}
		},
		watch: {
			
		},
		computed: {

		},
		methods: {
			Marquee() {
				let tab = document.getElementById("demo");
				let tab1 = document.getElementById("demo1");
				let tab2 = document.getElementById("demo2");
				tab2.innerHTML = tab1.innerHTML;
				if(tab2.offsetWidth - tab.scrollLeft <= 0){
					tab.scrollLeft -= tab1.offsetWidth
				}else{
					tab.scrollLeft++;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../style/less/Game/index.less";
</style>