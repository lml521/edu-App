<template>
	<!-- 每一个盒子 -->
	<view class="item-box" :class="{column : isColumn}">
		<view class="left">
			<img :src="item.mainImage" alt="">
			<text class="item-time">{{item.totalTime}}</text>
		</view>
		<view class="right">
			<h2 class="right-title text-ellipsis">{{item.title}}</h2>

			<view class="info">
				<view class="nickname">
					<i class="iconfont icon-laoshi2"></i>
					{{item.nickName}}
				</view>
				<view class="count">
					<text v-if="item.isFree" class="money">免费</text>
					<text v-else class="money">{{item.priceDiscount||item.priceOriginal}}</text>
					<text class="iconfont">{{item.studyTotal}} 人在学</text>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		name: "course-item",
		props: {

			isColumn: {
				type: Boolean,
				default: false
			},

			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.item-box {
		display: flex;
		width: 100%;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #fbfbfb;

		.left {
			width: 290rpx;
			height: 160rpx;
			position: relative;
			margin-right: 20rpx;

			img {
				width: 100%;
				height: 100%;
				border-radius: 15rpx;
			}

			.item-time {
				position: absolute;
				bottom: 0;
				background-color: rgba(0, 0, 0, .2);
				padding: 3rpx 8rpx;
				border-radius: 15rpx;
				font-size: 14rpx;
				right: 0;
				color: #fff;

			}
		}

		.right {
			justify-content: space-between;
			height: 80px;
			padding-top: 2px;
			padding-left: 2px;

			.right-title {
				max-width: 182px;
				height: 35px;
				line-height: 17px;
				font-size: 14px;
				font-weight: 700;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				white-space: normal;
			}




			.info {
				.nickname {
					font-size: 12rpx;
					color: #9e9e9e;
				}

				.count {
					display: flex;
					-webkit-box-align: center;
					align-items: center;

					.money {
						color: #fb6932;
						width: 65px;
						font-size: 14px;
					}

					.iconfont {
						font-size: 11px;
						color: #222;
					}
				}
			}
		}
	}
</style>
