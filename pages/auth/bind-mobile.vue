<template>
	<!-- 修改手机号码 -->

	<!-- 修改手机号码 -->
	<view class="box">
		<view class="inputBox">
			<view class="item row">
				<text>手机号:</text>
				<input type="text" placeholder="请输入手机号码" maxlength="11" v-model="mobile">
			</view>
			<view class="item row">
				<text>验证码:</text>
				<!-- mobile: "18888888888" -->
				<!-- templateCode: "SMS_1993234234" -->
				<input type="text" placeholder="请输入验证码" maxlength="6" v-model="code">
				<authCode :mobile="mobile" templateCode="SMS_1993234234"></authCode>
			</view>
		</view>
		<button class="submit" :loading="loading" @click="HandelSubmit">提交</button>
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
				mobile: "", //手机号码
				code: "", //验证码
				loading: false,

			};
		},
		methods: {
			async HandelSubmit() {
				// 登录

				// 检验手机号码是否有效 

				if (!this.$util.checkStr(this.mobile, 'mobile')) {
					this.$util.msg("请输入有效手机号码")
					return
				} else if (!this.$util.checkStr(this.code, 'mobileCode')) { //判断验证码是否填写
					this.$util.msg("验证码输入错误")
					return
				}
				// loading开启加载
				this.loading = true
				uni.showLoading({
					mask: true
				})

				try {
					let data = {
						mobile: this.mobile,
						code: this.code,
					}
					let res = await systemApi.updateMobile(data)
					console.log(res)
					if (res.code == 20000) {
						uni.hideLoading()
						this.$util.msg("更新成功")
						this.loading = false
						this.setToken(res.data)
					}

				} catch (e) {
					console.log(e)
				}
			},
			// 存储token 以及userInfo
			setToken(data) {
				this.$store.commit("setToken", data)
				setTimeout(() => {
					this.navBack()
				}, 500)

			}



		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f9fb;
	}

	.inputBox {
		margin-top: 50rpx;
		background-color: #fff;
		padding: 0 20rpx;

		.item {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;

			input {
				flex: 1;
			}

			text {
				margin-right: 20rpx;
			}

		}

	}

	.submit {
		margin-top: 80rpx;
		background-color: $uni-color-primary;
		color: $uni-text-color-inverse;
	}
</style>
