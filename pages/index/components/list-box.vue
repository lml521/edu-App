<template>
	<!-- 热门推荐 盒子 -->
	<view class="list-box">
		<!-- 标题 -->
		<view class="title">
			<view class="center">
				<text class="name">{{name}}</text>
				<text class="word">{{word}}</text>
			</view>
			<view class="all ">
				<text>全部</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
			
		props:{
			name:{
				type:String,
				default:"热门推荐"
			},
			word:{
				type:String,
				default:"HOT"
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.list-box {
		margin-top: 50rpx;
		.title {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.center {
			margin-bottom: 10rpx;

			.name {
				font-size: 38rpx;
				font-weight: 500;
				color: #303133;
				margin-right: 10rpx;
			}

			.word {
				font-size: 20rpx;
				border-radius: 30rpx 30rpx 30rpx 0;
				padding: 0 10rpx;
				color: #fff;
				background-image: linear-gradient(to right, $color-orange, $text-color-red);
			}
		}

		.all {
			color: #b2b8bd;
		}

	}
</style>
