<template>
	<!-- 验证码 -->
	<view class="code center">
		<view class="code-btn" @click="getSensCode">
			{{countDown?countDown+'s':'验证码'}}
		</view>
	</view>
</template>

<script>
	import systemApi from '@/api/system.js'
	export default {
		name: "authCode",
		props: {
			// 手机号
			mobile: {
				type: String,
				default: ""
			},
			// 短信模版
			templateCode: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				countDown: null, //60秒定时器
				Time: null, //定时器的实例 
				flag: false, //节流开关  
			};
		},

		methods: {
			// 点击 获取验证码
			async getSensCode() {
				// 判断是否正在获取验证码  如果是则return 
				let mobileRegExp = /^1[3|4|5|7|8]\d{9}$/
				// 判断手机号码是否输入
				if (!this.mobile) {
					this.$util.msg("请输入手机号码")
					return
					this.$util.checkStr
				} else if (!this.$util.checkStr(this.mobile,'mobile')) { // 判断手机号是否格式正确 
					this.$util.msg("手机号码格式不正确")
					return
				}

				if (this.flag) { // 如果正在倒计时,则不继续往下执行
					uni.showModal({
						content: `请在${this.countDown}秒后重试`,
						showCancel: false
					})
					return
				}

				// 获取验证码 参数
				let data = {
					mobile: this.mobile.trim(),
					templateCode: this.templateCode.trim()
				}

				try {
					// 开启加载
					uni.showLoading({
						mask: true
					})
					let res = await systemApi.getAuthCode(data)
					if (res.code == 20000) {
						this.$util.msg("发送成功")
					} else {
						this.$util.msg("验证码发送失败")
					}
					// 隐藏loading
					uni.hideLoading()
					this.countDown = 5 //规定定时器秒数
					this.flag = true //节流开关
					// setTimeout() 只执行一次
					// setInterval() 不清除一直执行
					this.Time = setInterval(() => {
						this.countDown--
						// 当定时器秒数小与0清除定时器
						if (this.countDown <= 0) {
							clearInterval(this.Time)
							this.Time = null
							this.flag = null
						}
					}, 1000)
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss">
	.code {
		width: 160rpx;
		background-color: #345dc2;
		border-radius: 10rpx;

	}

	.code-btn {
		padding: 10rpx 0;
		font-size: 25rpx;
		color: #FFFFFF;
	}
</style>
