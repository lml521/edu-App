<template>
	<!-- 分类模块 -->
	<view class="category-box">
		<view v-for="(item, index) in categoryList.slice(0, 7)" :key="index">{{item.name}}</view>
		<view>全部分类</view>
	</view>
</template>

<script>
	export default {
		name: "category-box",
		props: {
			categoryList: {
				type: Array,
				default: () => [],
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.category-box {
		display: flex;
		// 换行，
		flex-wrap: wrap;
		// 两侧的间隔相等
		justify-content: space-around;
		padding: 20rpx 30rpx 0 30rpx;

		>view {
			width: 160rpx;
			height: 70rpx;
			background-color: pink;
			background-color: $color-grey;
			line-height: 70rpx;
			text-align: center;
			font-size: 26rpx;
			margin-top: 15rpx;
			// 文字超出宽度隐藏
			overflow: hidden;
			border-radius: 20rpx;
		}
	}
</style>
