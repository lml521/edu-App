<template>
	<view class="search-container">
		<!-- 搜索 -->
		<!-- 小程序中搜索 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-search-bar v-model="content" :focus="focus" placeholder="搜索你想要的内容" @confirm="handleSearch"
			@cancel="navBack()" radius="100" clearButton="auto" cancelButton="always">
			<template v-slot:searchIcon>
				<text class="iconfont icon-search"></text>
			</template>
			<template v-slot:clearIcon>
				<text class="iconfont icon-roundclosefill"></text>
			</template>

		</uni-search-bar>
		<!-- #endif -->


		<!-- 热门历史关键词提示组件 -->
		<keyword @doSearch="doSearch" v-if="!searched"></keyword>

		<!-- tabBar 栏 切换 -->
		<tabBar v-if="searched" v-model.sync="tabBarId"></tabBar>
		<!-- 下拉赛选 导航组件 -->

		<downBar v-if="searched" :params="params"></downBar>
		<!-- <view v-for="item in 90">{{item}}</view> -->

	</view>
</template>

<script>
	import keyword from '@/pages/search/components/keyword.vue'; //热门历史关键词提示组件

	import tabBar from '@/components/common/tab-bar.vue'; //tabBar 栏 切换 
	import downBar from '@/components/common/down-bar.vue'; //下拉赛选 导航组件实现



	import searchInput from '@/components/search-input/search-input.vue'; //小程序中搜索

	export default {
		components: {
			searchInput,
			tabBar,
			downBar,
			keyword
		},
		data() {
			return {
				params: null,
				content: "", //搜索内容
				focus: false, //搜索框是否聚焦
				searched: false,
				tabBarId: 0, //tabBar 栏选中的 

				// #ifdef APP-PLUS
				currentWebview: null

				// #endif

			};
		},
		// 监听原生导航按钮事件
		onNavigationBarButtonTap(e) {
			// 取消按钮
			if (e.index === 0) {
				this.navBack()
			}
		},
		// 实时会获取搜索框你们的内容
		onNavigationBarSearchInputChanged(e) {
			// console.log(e.text)
			this.content = e.text
		},

		// 针对原生搜索框，用户点击软键盘上的“搜索”按钮时触发
		onNavigationBarSearchInputConfirmed(e) {
			// console.log('用户点击软键盘上的“搜索”按钮', e.text)
			// #ifdef APP-PLUS
			// 失去焦点，收起键盘（有时不会收起）
			this.currentWebview.setTitleNViewSearchInputFocus(false)
			// #endif
			this.doSearch()
		},


		// 传递过来的数据 
		onLoad(options) {
			this.listenerParams(options)
		},

		methods: {

			// 监听 
			listenerParams(options) {

				// 在app 端获取 实例
				// #ifdef APP-PLUS
				this.currentWebview = this.$mp.page.$getAppWebview()
				// #endif
				// console.log(JSON.stringify(options), JSON.stringify(options) !== "{}")
				// 判断是否 传递有参数  也就是说 在分类页面 点击 胶囊按钮   有参数进行查询 
				if (JSON.stringify(options) !== "{}") {
					// console.log(options, 'options')
					this.params = options
					console.log(this.params, 'this.params')
					
					this.content = options.labelName
					// 调用设置搜索框值的方法
					this.handelSetSearchValue()
					// 调用搜索查询的方法的
					this.doSearch({
						value: options.labelName
					})
				} else {
					// 在APP中 如果没有传递参数 则 搜索框聚焦
					// #ifdef APP-PLUS
					// 没有参数,则需要让搜索框获取到焦点
					this.currentWebview.setTitleNViewSearchInputFocus(true)
					// console.log(this.currentWebvie'w, 'currentWebview')
					// #endif

					// #ifdef MP-WEIXIN
					this.focus = true
					// #endif

				}

			},
			handelSetSearchValue(item) {
				this.handelSetSearch(item)
			},

			// 搜索  查询 
			doSearch(obj) {
				// console.log('搜索')
				
				// obj有数据，则获取
				this.content = obj && obj.value ? obj.value : this.content
				// 标识搜索过，隐藏keyword.vue组件内容
				this.searched = true


				// 调用设置搜索框值的方法
				// this.handleSetSearchValue(options.labelName)

				// 调用搜索查询的方法的
				this.storageHistory()

				// uni.showLoading()
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
						// #ifdef MP-WEIXIN
						wx.setStorageSync(key, res.data)
						// #endif 

						// #ifndef MP-WEIXIN
						uni.setStorageSync(key, res.data) //历史搜索
						// #endif 


						uni.setStorageSync(key, res.data)
					},
					fail: (error) => { //注意箭头函数
						// 没有历史数据。
						// 当前有输入内容，直接保存，注意是数组
						// this.content && uni.setStorageSync(key, [this.content])

						// #ifdef MP-WEIXIN
						this.content && wx.setStorageSync(key, [this.content])
						// #endif 

						// #ifndef MP-WEIXIN
						this.content && uni.setStorageSync(key, [this.content])
						// #endif 




					}
				})
			},


		}
	}
</script>

<style lang="scss">
	.search-container {
		width: 750rpx;
		/* 全屏，不然后面`下拉筛选粘组件`粘顶会失效 */
		margin: 0;
		padding: 0;
	}

	uni-search-bar {}
</style>
