<template>
	<!-- 意见反馈 -->
	<view class="feed-back">
		<radio-group>
			<label v-for="(item,index) in items" :key="index">
				<radio :value="item.value" :checked="item.value == current" style="transform: scale(.7);" />
				<text>{{item.name}}</text>
			</label>
		</radio-group>
		<textarea placeholder="请填写具体内容帮助我们了解您的意见和反馈" v-model="formData.content"></textarea>
		<input type="text" placeholder="填写您的QQ" v-model="formData.qq">
		<input type="text" placeholder="填写您的微信" v-model="formData.weixin">
		<button type="primary" hover-class="button-hover" @click="submitHandler">提交</button>

	</view>
</template>

<script>
	import systemApi from '@/api/system.js'
	export default {
		data() {
			return {
				location: "",
				formData: {
					content: "",
					qq: "",
					weixin: "",
				},

				current: 1,
				items: [{
						value: "1",
						name: "内容意见",
						checked: "true",
					},
					{
						value: "2",
						name: "产品建议",
					},
					{
						value: "3",
						name: "其他",
					},
				],
			}
		},
		methods: {

			radioChange(e) {
				console.log("e==>", e);
			},
			async submitHandler() {
				let data = {
					...this.formData,
					type: this.current
				}

				console.log(data)
				// 校验反馈的内容不能少于10个字符
				if (data.content.length < 10) {
					this.$util.msg("反馈内容至少输入10个字符")
					return
				}

				// 校验qq号格式是否正确 //QQ号 4到9个数字
				if (!this.$util.checkStr(data.qq, 'QQ')) {
					this.$util.msg("您输入qq号格式不正确")
					return
				}
				// 校验微信号格式是否正确  //微信号5到19字母
				if (!this.$util.checkStr(data.weixin, 'weixin')) {
					this.$util.msg("您输入微信号格式不正确")
					return
				}

				try {
					uni.showLoading({})
					let res = await systemApi.sendFeedBack(data)
					console.log(res)
					if (res.code == 20000) {
						uni.hideLoading()
						uni.showModal({
							content: '您的意见反馈成功',
							showCancel: false,
							success: (res) => {
								console.log(1)
								if (res.confirm) {
									console.log(2)
									this.navBack(1)
								}
							}
						});
					}

				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}




			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-grey;
		height: 100% !important;
		overflow: hidden;
	}


	.feed-back {
		box-sizing: border-box;
		padding: 0 40rpx;
	}

	radio-group {
		margin: 30rpx 0;
		text-align: center;

		label {
			margin-right: 30rpx;
			font-size: 30rpx;
		}
	}

	textarea {
		width: 100%;
		border: 1px solid #e9e9e9;
		padding: 10rpx;
		line-height: 60rpx;
	}

	input {
		width: 100%;
		margin-top: 30rpx;
		border: 1px solid #e9e9e9;
		height: 70rpx;
		padding: 10rpx;
	}

	button[type="primary"] {
		width: 100%;
		margin-top: 50rpx;
		// background-color: $i-text-color-blue;
	}

	.button-hover[type="primary"] {
		width: 100%;
		margin-top: 50rpx;
		// background-color: $i-color-primary;
	}

	.location {
		margin: 50rpx 0;
		align-self: flex-start;
		/* 左对齐 */
		font-size: 30rpx;
		// color: $i-text-color-grey;
		line-height: 50rpx;

		text {
			// color: $i-text-color-black;
		}
	}
</style>
