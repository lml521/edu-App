<template>
	<!-- 确认购买 页面 -->
	<view class="purchase">
		<!-- 商品信息 -->
		<view class="commodityInformation">
			<view class="">商品信息</view>
			<view v-if="course&& course.list&&course.list.length>0">
				<courseItem :item="item" v-for="(item,index) in course.list" :key="index"></courseItem>
			</view>
			<courseItem :item="course" v-else></courseItem>
		</view>
		<!-- 支付方式 -->
		<view class="card payBox">
			<view class="payText">支付方式</view>

			<!-- ios端布局 -->
			<view class="iosPay" v-if="isIos">
				<text>余额：</text>
				<text>0.00 币(不足支付)</text>
			</view>



			<!-- 不是 ios 端布局 -->
			<radio-group v-else @change="handelPayChanger">
				<!-- 不是微信平台   才有支付宝支付 -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="pay-item space-between center">
					<view class="left center row">
						<img src="/static/pay/alipay.png" alt="">
						<text>支付宝</text>
					</view>
					<radio class="right" :checked="provider=='alipay'" value="alipay" />
				</view>
				<!-- #endif -->
				<!-- 不是支付宝平台上 才有微信支付 -->
				<!-- #ifndef MP-ALIPAY -->
				<view class="pay-item space-between center">
					<view class="left center row">
						<img src="/static/pay/wxpay.png" alt="">
						<text>微信</text>
					</view>
					<radio class="right" value="wxpay" :checked="provider=='wxpay'" />
				</view>
				<!-- #endif -->
			</radio-group>
		</view>

		<!-- 商品金额 优惠价 -->
		<view class="card price">
			<view class="space-between center">
				<text>商品金额</text>
				<text v-if="course&& course.list&&course.list.length>0">￥{{course.totalPrice}}</text>
				<text v-else>￥{{course.priceOriginal}}</text>
			</view>
			<view class="space-between center">
				<text>优惠价</text>
				<text v-if="course&& course.list&&course.list.length>0">￥{{course.groupPrice}}</text>
				<text v-else>￥{{course.priceDiscount}}</text>
			</view>
		</view>

		<view style="height: 150rpx;"></view>
		<!-- 尾部 订单 -->
		<view class="footer space-between center">
			<view class="payment">
				<text>实付金额：</text>
				<text v-if="course&& course.list&&course.list.length>0">￥{{course.groupPrice}}</text>
				<text v-else>￥{{course.priceDiscount}}</text>
			</view>
			<view>
				<!-- 在ios上 显示 充值并支付 -->
				<button class="payBtn center" v-if="isIos" @click="iosPayHandler">充值并支付</button>

				<!-- H5   支付宝-->
				<!-- #ifndef MP-WEIXIN -->
				<button class="payBtn center" :loading="loading" :disabled="loading" v-else
					@click="payHandler">提交订单</button>
				<!-- #endif -->

				<!-- 微信上面展示 -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="payBtn center" v-else @click="wxPayHandler">提交订单</button>
				<!-- #endif -->
			</view>

		</view>
	</view>
</template>

<script>
	import courseItem from '@/components/course-item/course-item.vue'
	export default {
		data() {
			return {
				course: {}, //传递过来的数据 
				isIos: false, //判断 是否是在 ios平台 
				provider: 'alipay', //默认是那种支付
				loading: false, //loading加载
			};
		},
		components: {
			courseItem,
		},
		onLoad(options) {
			// 不是微信 

			// #ifndef MP-WEIXIN
			if (options.course) {
				const course = decodeURIComponent(options.course.replace(/%/g, '%25'))
				this.course = JSON.parse(course)
			}

			if (options.groupList) {
				const course = decodeURIComponent(options.groupList.replace(/%/g, '%25'))
				this.course = JSON.parse(course)
			}
			// #endif

			// 微信 
			// #ifdef MP-WEIXIN
			if (options.course) {
				const course = decodeURIComponent(options.course)
				this.course = JSON.parse(course)
			}
			if (options.groupList) {
				const course = decodeURIComponent(options.groupList)
				this.course = JSON.parse(course)
			}
			// #endif

			console.log(this.course)

			// 在app端 ios 与安卓布局不同 
			// #ifdef APP-PLUS
			this.getIsIos()
			// #endif
			// 判断是否 是在微信 则默认使用 微信支付
			// #ifdef MP-WEIXIN
			this.checkIsWx()
			// #endif
		},
		methods: {
			// 获取 到 是否是在ios设备上 
			getIsIos() {
				this.isIos = uni.getSystemInfoSync().platform == 'ios'
				console.log(this.isIos)
			},
			// 切换 支付方式 
			handelPayChanger(e) {
				console.log(e.detail.value)
			},
			// 当小程序的时候 默认用微信支付
			checkIsWx() {
				provider: 'wxpay'
			},

			// ios上触发 提交 
			iosPayHandler() {
				console.log('ios')
			},
			// H5 触发
			payHandler() {
				this.loading = true
				console.log('H5')
				setTimeout(() => {
					this.loading = false
				}, 3000)
			},
			// 微信上触发 
			wxPayHandler() {
				console.log('微信')
			},
		}
	}
</script>

<style lang="scss">
	.purchase {
		color: #333;
		font-size: 30rpx;
	}

	.commodityInformation {
		padding: 10rpx;
	}

	.payBox {

		.iosPay {
			height: 80rpx;
			line-height: 80rpx;

			text:nth-child(2) {
				color: $uni-color-error;

			}
		}

		.payText {
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: $i-underline;
		}

		.pay-item {
			.left {
				padding: 10rpx;

				img {
					width: 60rpx;
					height: 60rpx;
				}

				text {
					margin-left: 20rpx;
				}
			}

			.right {
				transform: scale(.8);
			}

		}
	}

	.price {
		view:nth-child(1) {
			border-bottom: $i-underline;
		}

		>view {
			height: 90rpx;
		}
	}

	.footer {
		padding: 0 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: #fff;
		border-top: $i-underline;

		.payment {
			text:nth-child(2) {
				font-size: 36rpx;
				color: $uni-color-error;
				font-weight: 700;
			}
		}

		.payBtn {
			height: 80rpx;
			background-color: $uni-color-primary;
			color: $uni-bg-color;
			border-radius: 40rpx;
			width: 260rpx;
		}
	}

	.card {
		border-radius: 20rpx;
		margin-top: 30rpx;
		background-color: #fff;
		padding: 0 30rpx;
		box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.08);
	}
</style>
