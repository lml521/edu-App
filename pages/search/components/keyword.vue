<template>
	<view class="keyword">
		<view class="title">热门搜索</view>
		<view class="tag-list">

			<view v-for="(item,index) in hotList" :key="index">
				{{item}}
			</view>

		</view>
		<view class="title space-between">
			<text>历史搜索</text>
			<text @click="clearHistory">清空</text>
		</view>
		<view class="tag-list">
			<view v-for="(e,i) in historyList " :key="index">{{e}}</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//热门搜索
				hotList: ['Java', 'SpringBoot', 'SpringCloud', 'Python', 'Vue', 'React'],
				historyList: [1, 2, 3] // ['Vue', 'Java'], //历史搜索

			}
		},



	}
</script>

<style lang="scss">
	.keyword {
		padding: 25rpx;

		.title {
			font-size: 30rpx;
			color: #222222;

			text:last-child {
				color: #999;
			}
		}

		.tag-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			margin-bottom: 60rpx;

			view {
				font-size: 25rpx;
				color: #999;
				border: 1rpx solid #999;
				border-radius: 8rpx;
				padding: 6rpx 15rpx;
				margin: 10rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
