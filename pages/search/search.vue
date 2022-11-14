<template>

	<!-- 搜索 -->
	<!-- 小程序中搜索 -->

	<view class="search-container">
		<!-- 热门历史关键词提示组件 -->
		<keyword @doSearch="doSearch"></keyword>

	</view>
</template>

<script>
	// 1. 当前页面实例变量，声明外面提高性能
	let currentWebview = null

	import keyword from '@/pages/search/components/keyword.vue'
	import searchInput from '@/components/search-input/search-input.vue'; //小程序中搜索
	export default {
		components: {
			searchInput,
			keyword
		},
		data() {
			return {
				params: null,
				content: null, //搜索内容

			};
		},
		// 监听原生导航按钮事件
		onNavigationBarButtonTap(e) {
			// 取消按钮
			if (e.index === 0) {
				this.navBack()
			}
		},
		// 搜索  实时会获取搜索框你们的内容
		onNavigationBarSearchInputChanged(e) {
			this.content = e.text
		},

		// 针对原生搜索框，用户点击软键盘上的“搜索”按钮时触发
		onNavigationBarSearchInputConfirmed(e) {
			// console.log('用户点击软键盘上的“搜索”按钮', e.text)
			// #ifdef APP-PLUS
			// 失去焦点，收起键盘（有时不会收起）
			currentWebview.setTitleNViewSearchInputFocus(false)
			// #endif
			this.doSearch()
		},



		onLoad(options) {
			// #ifdef APP-PLUS
			currentWebview = this.$mp.page.$getAppWebview()
			// #endif
			if (options.params) {
				this.params = JSON.parse(options.params)
				// this.doSearch()
			} else {
				// #ifdef APP-PLUS
				//点击搜索框获取焦点, 因为分类页会跳转到此页面后不用获取焦点，所以不在pages.json中开启自动获取焦点
				currentWebview.setTitleNViewSearchInputFocus(true)
				// #endif

			}
		},
		methods: {
			// 搜索
			doSearch() {
				uni.showLoading()
			},



			// 搜索
			doSearch(obj) {
				// obj有数据，则获取
				this.content = obj && obj.value ? obj.value : this.content
				// 标识搜索过，隐藏keyword.vue组件内容
				this.searched = true

				// #ifdef MP
				// 传递给小程序 搜索框, 注意上面取 `ref="searchBar"`
				this.$refs.searchBar.searchVal = this.content
				// #endif
				this.storageHistory()

				uni.showLoading()
			},



			// 关键字保留本地 
			storageHistory() {
				const key = 'historyList'
				uni.getStorage({
					key, // 等价于 key: key,
					success: (res) => { //注意箭头函数
						// console.log('获取成功', res.data);
						// 查询到原历史记录，当前输入的是否存在，不存在添加到第1个元素，存在不添加
						this.content && res.data.indexOf(this.content) < 0 && res.data.unshift(this.content)
						// 保存到历史记录
						uni.setStorageSync(key, res.data)
					},
					fail: (error) => { //注意箭头函数
						// 没有历史数据。
						// 当前有输入内容，直接保存，注意是数组
						this.content && uni.setStorageSync(key, [this.content])
					}
				})
			},


		}
	}
</script>

<style lang="scss">

</style>
