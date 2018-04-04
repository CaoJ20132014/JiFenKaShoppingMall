<template>
  	<div id="login-box">
		<van-cell-group>
  			<van-field v-model="username" :maxLength="13" label="用户名：" icon="close" placeholder="请输入用户名" required @click-icon="username = ''" @keypress.native="ValChange(username)"/>
			<van-field v-model="password" :type="inputType" label="密码：" :icon='icon' placeholder="请输入密码" required @click-icon="[icon == 'password-not-view' ? icon = 'password-view' : icon = 'password-not-view'],[icon == 'password-not-view' ? inputType = 'password' : inputType = 'text']"/>
			<van-field class="VerificationCode" v-model="username" label="验证码：" icon="close" placeholder="请输入短信验证码" required @click-icon="username = ''"/>
			<van-button class="getCode" size="normal" :disabled="disabled" @click="getcode" v-text="btnText"></van-button>
		</van-cell-group>
		<van-button class="login" size="large" @click="Login">登录</van-button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				inputType: 'password',
				icon: 'password-not-view',
				btnText: '获取验证码',
				disabled: false,
				time: 0,
			};
		},
		methods:{
			ValChange(username) {
				if(username.length == '13') {
					console.log(this.username);
				}
			},
			getcode(){
				if (true) {
					this.time = 60;
					this.timer();
				} else {
					this.alert('请输入正确的手机号码', 'warning');
				}
			},
			timer: function () {
				if (this.time > 0) {
					this.time--;
					setTimeout(this.timer, 1000);
					this.disabled = true;
					this.btnText = this.text();
					if (this.time == 0) {
						this.time = 0;
						this.disabled = false;
						clearTimeout(this.timer);
					}
				}
			},
			text: function () {
				return this.time > 0 ? this.time + 's' : '重新获取';
			},
			Login(){
				this.$router.push({
					name: 'home'
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	@import '../../style/less/login/login.less';
</style>