<template>
	<view class="list-box">
		<view class="list">
			<view class="list-item space-between center" hover-class="active" :hover-stay-time="50">
				<view class="left center">
					<text class="iconfont mxg-icon-host-color"></text>
					<view class="title">我的订单</view>
				</view>
				<view class="right center">
					<!-- 右侧图标 -->
					<text class="iconfont icon-right"></text>
				</view>
			</view>
	<view class="list-item space-between center" hover-class="active" :hover-stay-time="50">
		<view class="left center">
			<text class="iconfont mxg-icon-lock-color"></text>
			<view class="title">我的余额</view>
		</view>
		<view class="right center">
			<!-- 右侧图标 -->
			<text class="iconfont icon-right"></text>
		</view>
	</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.list-box {
		background-color: $color-grey;
		padding-top: 20rpx;

		.list {
			background-color: #FFFFFF;
			margin-bottom: 20rpx;

			.list-item {
				padding: 26rpx 39rpx;
				border-bottom: $i-underline;

				.left {
					font-size: 33rpx;

					text:first-child {
						margin-right: 20rpx;
					}
				}

				.right {
					text {
						font-size: 35rpx;
						color: $uni-text-color-grey;
						margin-left: 15rpx;
					}

					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 60px;

					}

					switch {
						margin-right: -10rpx;
					}
				}
			}

			.active {
				background-color: #fafafa;
			}
		}
	}
</style>
