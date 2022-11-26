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
				<input type="number" placeholder="请输入手机号码" placeholder-class="#b8b6bc">
			</view>
			<view class="item">
				<view>验证码</view>
				<view class="row">
					<input type="text" placeholder="请输入验证码" placeholder-class="#b8b6bc">
						<!-- 验证码 -->
						<authCode style="margin-right: 30rpx;"></authCode>
				</view>
			</view>
			<button class="loginBtn">登录</button>

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
	import 	authCode from '@/components/authCode/authCode.vue'
	export default {
		components:{
			authCode
		},
		data() {
			return {
				agreement: false
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
				font-size: 120rpx;
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
					flex: 1;
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
