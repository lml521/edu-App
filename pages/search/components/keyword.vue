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
	let historyList="historyList"
	export default {
		data() {
			return {
				//热门搜索
				hotList: ['Java', 'SpringBoot', 'SpringCloud', 'Python', 'Vue', 'React'],
				historyList: uni.getStorageSync(historyList), //历史搜索
				content:'',
			}
		},

		methods: {
			// 清空 
			clearHistory() {
				this.historyList = []
				uni.removeStorageSync(historyList)

			},
			clickTagHandler(item) {
				console.log(item)
				// #ifdef APP-PLUS
				const currentWebview = this.$mp.page.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText(item);
				// #endif
				// #ifdef H5
				const placeholder = document.querySelector('.uni-page-head-search-placeholder')
				placeholder.innerHTML = ''
				const inputSearch = document.querySelector('.uni-input-input[type=search]');
				inputSearch.value = item;
				// #endif
				this.storageHistory()
				// 开始搜索
				this.$emit('doSearch', {value: item})
			},

			storageHistory() {
				
			 uni.getStorage({
					historyList, // 等价于 key: key,
					success: (res) => { //注意箭头函数
						// console.log('获取成功', res.data);
						// 查询到原历史记录，当前输入的是否存在，不存在添加到第1个元素，存在
						不添加
						this.content && res.data.indexOf(this.content) < 0 &&
							res.data.unshift(this.content)
						// 保存到历史记录
						uni.setStorageSync(historyList, res.data)
					},
					fail: (error) => { //注意箭头函数
						// 没有历史数据。
						// 当前有输入内容，直接保存，注意是数组
						this.content && uni.setStorageSync(historyList, [this.content])
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
