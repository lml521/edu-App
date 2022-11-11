<template>

	<!-- 搜索 -->
	<!-- 小程序中搜索 -->

	<view class="search-container">
		<!-- 热门历史关键词提示组件 -->
		<keyword></keyword>


	</view>
</template>

<script>
	// 1. 当前页面实例变量，声明外面提高性能
	let currentWebview = null

	import keyword from './components/keyword.vue'
	import searchInput from '@/components/search-input/search-input.vue'; //小程序中搜索
	export default {
		components: {
			searchInput,
			keyword,
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
				uni.navigateBack()
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
		}
	}
</script>

<style lang="scss">

</style>
