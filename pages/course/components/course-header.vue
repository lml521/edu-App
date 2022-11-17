<template>
	<view class="course-header">
		<img :src="item.mainImage" alt="">
		<view class="course-con">
			<view class="pic">
				<text class="">
					￥{{item.priceDiscount}}
				</text>
				<text class="preferential">
					￥{{item.priceOriginal}}
				</text>
				<text class="pic-icon">
					优惠价
				</text>
			</view>

			<h3>{{item.title}}</h3>

			<view class="studyTotal">
				<text class="iconfont icon-haoping2">{{item.goodRate}}好评</text>
				<text class="iconfont icon-touxiang2">{{item.studyTotal}}在学</text>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({
					"id": 10,
					"title": "Uniapp兼容多端在线教育项目实战",
					"studyTotal": 590, //在学人数
					"goodRate": '100%', //好评率
					"mainImage": "https://gd4.alicdn.com/imgextra/i4/3603079088/O1CN01dczOSM2H0LvTowhkl_!!3603079088.png",
					"isFree": 0, // 0 付费，1免费
					"priceOriginal": 614.51, //原价
					"priceDiscount": 281.91 // 优惠价
				})
			}
		},
		data() {
			return {

			}
		},
	}
</script>

<style lang="scss">
	.course-header {
		img {
			width: 100%;
			height: 500rpx;
		}

		.course-con {
			width: 100%;
			padding: 10rpx 30rpx;
			border: 25rpx solid #f8f9fb;
			border-right: 0;
			border-left: 0;

			.pic {
				color: #fa140e;
				font-weight: 900;
				font-size: 48rpx;

				text {
					margin: 0 5rpx;
				}

				.preferential {
					font-size: 28rpx;
					color: #bfbec3;
					font-weight: normal;
					text-decoration: line-through;

				}

				.pic-icon {
					font-size: 24rpx;
					color: #fa1813;
					border-radius: 10rpx;
					border: 2px solid #fa1813;
				}
			}

			h3 {
				margin: 10rpx 0;
			}

			.studyTotal {
				margin: 20rpx 0;
				text {
					background-color: #f8f9fb;
					padding: 10rpx 5rpx;
					margin-right: 10rpx;
					font-size: 24rpx;
					border-radius: 30rpx;
				}
			}

		}
	}
</style>
