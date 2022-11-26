<template>
	<!-- 登录 -->
	<view class="login-box">
		<!-- 头部login -->
		<view class="loginHeader">
			<text class="iconfont icon-close close" @click="navBack()"></text>
			<view class="loginIcon">LOGIN</view>
			<view class="welcome">欢迎回来！</view>
		</view>
		<!-- 手机号码 验证码 -->
		<view class="input-content">
			<view class="item">
				<view>手机号码</view>
				<input type="number" placeholder="请输入手机号码" v-model="mobile" placeholder-class="#b8b6bc" maxlength="11">
			</view>
			<view class="item">
				<view>验证码</view>
				<view class="row">
					<input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="#b8b6bc" maxlength="6">
					<!-- 验证码 -->
					<authCode style="margin-right: 30rpx;" :mobile="mobile" :templateCode="templateCode"></authCode>
				</view>
			</view>
			<button class="loginBtn" @click="handelLogin" :loading="loading">登录</button>

		</view>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<!-- 社交账号登录  第三方登录 -->
		<view class="other-wrapper">
			<view class="line center">
				<text class="text">社交账号登录</text>
			</view>
			<view class="icon center">
				<img src="/static/share/weixin.png" @click="toProviderLogin('weixin')">
				<!-- #ifdef APP-PLUS -->

				<img src="/static/share/qq.png" @click="toProviderLogin('qq')">
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
		<!-- 协议 -->
		<view class="agreement center">
			<text class="iconfont icon-roundcheckfill" :class="{active: agreement}" @click="checkAgreement"></text>
			<text>请认真阅读并同意</text>
			<text class="tit" @click="navTo('/pages/public/xieyi')">《用户服务协议》</text>
			<text class="tit" @click="navTo('/pages/public/yinsi')">《隐私权政策》</text>
		</view>
	</view>
</template>

<script>
	import authCode from '@/components/authCode/authCode.vue' //验证码
	import systemApi from '@/api/system.js'
	export default {
		components: {
			authCode
		},
		data() {
			return {
				agreement: false, //协议开关
				mobile: "", //手机号码
				code: "", //验证码
				loading: false, // loading加载
				templateCode: 'MSM_1999123123', // 短信模版
			}
		},
		methods: {
			// 协议 按钮
			checkAgreement() {
				this.agreement = !this.agreement
			},

			// 微信、QQ提供商登录
			toProviderLogin(provider) {
				console.log(provider)
			},
			// 登录 
			async handelLogin() {
				// 检验手机号码是否有效 
				console.log(!this.$util.checkStr(this.mobile, 'mobile'))
				if (!this.$util.checkStr(this.mobile, 'mobile')) {
					this.$util.msg("请输入有效手机号码")
					return 
				} else if (!this.$util.checkStr(this.code, 'mobileCode')) { //判断验证码是否填写
					this.$util.msg("验证码输入错误")
					return 
				} else if (!this.agreement) { //判断 安全协议是否开启
					this.$util.msg("请阅读并同意用户服务及隐私协议")
					return 
				}
				// loading开启加载
				this.loading = true
				uni.showLoading({
					title: '登录中',
					mask: true
				})

				try {
					let data = {
						mobile: this.mobile,
						code: this.code,
					}
					let res = await systemApi.getLogin(data)
					if (res.code == 20000) {
						// 登录成功之后调用当前方法将用户信息以及token存储到vuex
						this.setToken(res.data)
						this.loading = false
						uni.hideLoading()
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 存储token 以及userInfo
			setToken(data) {
				this.$store.commit("setToken", data)
				setTimeout(()=>{
					this.navBack()
				},500)
				
			}



		}
	}
</script>

<style lang="scss">
	.login-box {
		.loginHeader {
			padding-top: 200rpx;

			.close {
				padding: 20rpx;
				font-size: 39rpx;
				color: #606266;
				position: absolute;
				top: calc(var(--status-bar-height) + 20rpx);
				left: 20rpx;
				z-index: 90;
			}

			.loginIcon {
				font-size: 130rpx;
				color: #f8f8f8;
			}

			.welcome {
				position: relative;
				top: -45px;
				padding-left: 30px;
				font-size: 23px;
				color: #555;
				text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
			}
		}

		.input-content {
			padding: 0 30rpx;

			.item {




				font-size: 26rpx;
				color: #606266;
				border-radius: 8rpx;
				margin-bottom: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				padding-left: 30rpx;
				background: #f8f6fc;
				height: 120rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.row {
					width: 100%;
				}

				.tit {
					height: 50rpx;
					line-height: 56rpx;
					font-size: 26rpx;
					color: #606266;
				}

				input {
					// flex: 1;
					height: 60rpx;
					font-size: 30rpx;
					color: #303133;
					width: 100%;
				}

				.btn {
					height: 60rpx;
					font-size: 20rpx;
				}
			}

			.loginBtn {
				background-color: $uni-color-primary;
				color: #fff;
			}
		}


		.other-wrapper {
			margin-top: 100rpx;

			.line {

				&::after,
				&::before {
					content: "";
					width: 120rpx;
					border: $i-underline;
				}

				.text {
					margin: 0 32rpx;
					font-size: 24rpx;
					color: #606266;
				}
			}

			.icon {
				img {
					width: 100rpx;
					margin: 40rpx;
				}
			}
		}

		.agreement {
			position: absolute;
			left: 0;
			bottom: 10rpx;
			width: 750rpx;
			height: 90rpx;
			font-size: 24rpx;
			color: #999;

			.iconfont {
				font-size: 36rpx;
				color: #ccc;
				margin-right: 8rpx;

				&.active {
					color: $uni-color-primary;
				}
			}

			.tit {
				color: #40a2ff;
			}

		}
	}
</style>
