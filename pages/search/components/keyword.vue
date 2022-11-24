<template>
	<view class="keyword">
		<view class="title">热门搜索</view>
		<view class="tag-list">

			<view v-for="(item,index) in hotList" :key="index" @click="clickTagHandler(item)">
				{{item}}
			</view>
		</view>
		<view class="title space-between">
			<text>历史搜索</text>
			<text @click="clearHistory">清空</text>
		</view>
		<view class="tag-list">
			<view v-for="(item,index) in  historyList " :key="index" @click="clickTagHandler(item)">{{item}}</view>

		</view>
	</view>
</template>

<script>
	let historyList = "historyList"
	export default {
		data() {
			return {
				//热门搜索
				hotList: ['Java', 'SpringBoot', 'SpringCloud', 'Python', 'Vue', 'React'],
				// 微信小程序本地存储
				// #ifdef MP-WEIXIN
				historyList: wx.getStorageSync(historyList),
				// #endif 
				// h5 与 app 本地存储 
				// #ifndef MP-WEIXIN
				historyList:uni.getStorageSync(historyList) , //历史搜索
				// #endif 
				// historyList: uni.getStorageSync(historyList)
				content: '',
			}
		},

		methods: {
			// 清空 
			clearHistory() {
				this.historyList = []
				// uni.removeStorageSync(historyList)
				// 微信小程序本地存储
				// #ifdef MP-WEIXIN
				wx.removeStorageSync(historyList)
				// JSON.parse()
				// #endif 

				// h5 与 app 本地存储 
				// #ifndef MP-WEIXIN
				uni.removeStorageSync(historyList) //历史搜索
				// #endif 

			},
			// 点击 胶囊按钮
			clickTagHandler(item) {
				this.handelSetSearch(item)
				this.$emit("doSearch", {
					value: item
				})
			},

			storageHistory() {
				uni.getStorage({
					historyList,
					success: (res) => { 
						// 当本地有数据 往本地头部添加数据
						this.content && res.data.indexOf(this.content) < 0 && res.data.unshift(this.content)
						// 保存到历史记录

						// #ifdef MP-WEIXIN
						wx.setStorageSync(historyList, res.data)
						// #endif 

						// #ifndef MP-WEIXIN
						uni.setStorageSync(historyList, res.data)
						// #endif 

					},
					fail: (error) => { 
						// 当本地没有 数据  添加 数据 
						// #ifdef MP-WEIXIN
						this.content && wx.setStorageSync(historyList, [this.content])
						// #endif 

						// #ifndef MP-WEIXIN
						this.content && uni.setStorageSync(historyList, [this.content])
						// #endif 						
					}
				})
			},

		}
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
