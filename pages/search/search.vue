<template>
	<view class="search-container">
		<!-- 搜索 -->
		<!-- 小程序中搜索 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-search-bar v-model="content" :focus="focus" placeholder="搜索你想要的内容" @confirm="doSearch" @cancel="navBack()"
			radius="100" clearButton="auto" cancelButton="always">
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

		<block v-if="searched">
			<courseList ref="mescrollItem0" :i="0" :index="tabBarId" :params="params" :content="content"></courseList>
			<articleList ref="mescrollItem1" :i="1" :index="tabBarId" :params="params" :content="content"></articleList>
			<questionList ref="mescrollItem2" :i="2" :index="tabBarId" :params="params" :content="content"></questionList>
		</block>

	</view>
</template>

<script>
	import keyword from '@/pages/search/components/keyword.vue'; //热门历史关键词提示组件

	import tabBar from '@/components/common/tab-bar.vue'; //tabBar 栏 切换 

	import searchInput from '@/components/search-input/search-input.vue'; //小程序中搜索

	import courseList from "@/pages/search/components/courseList.vue"//课程
	import articleList from "@/pages/search/components/articleList.vue"//文章
	import questionList from "@/pages/search/components/questionList.vue"//问答

	import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js";
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			searchInput,//小程序中搜索
			tabBar,//tabBar 栏 切换 
			keyword,//热门历史关键词提示组件
			courseList,//课程
			articleList,//文章
			questionList//问答
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
			this.content = e.text
		},

		// 针对原生搜索框，用户点击软键盘上的“搜索”按钮时触发
		onNavigationBarSearchInputConfirmed(e) {
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

				// 判断是否 传递有参数  也就是说 在分类页面 点击 胶囊按钮   有参数进行查询 
				if (JSON.stringify(options) !== "{}") {
					console.log(options, 'options')
					this.params = options
					console.log(this.params, 'this.params')

					this.content = options.labelName
					// 调用设置搜索框值的方法
					this.handelSetSearchValue()
					// 调用搜索查询的方法的
					this.doSearch()
				} else {
					// 在APP中 如果没有传递参数 则 搜索框聚焦
					// #ifdef APP-PLUS
					// 没有参数,则需要让搜索框获取到焦点
					this.currentWebview.setTitleNViewSearchInputFocus(true)
					// #endif

					// 微信小程序 取消焦点 
					// #ifdef MP-WEIXIN
					this.focus = true
					// #endif

				}

			},
			handelSetSearchValue(item) {
				this.handelSetSearch(item) // 点击胶囊按钮 跳转页面  mixins 混入
			},

			// 搜索  查询 
			doSearch(obj) {
				// obj有数据，则获取数据
				this.content = obj && obj.value ? obj.value : this.content
				this.searched = true

				// 节流 搜索 
				this.$nextTick(() => {
					this.$util.throttle(() => {
						this.$refs[`mescrollItem${this.tabBarId}`].search()
					})
				})
				// 保留关键字
				this.storageHistory()
			},



			// 关键字保留本地 
			storageHistory() {
				const key = 'historyList'
				uni.getStorage({
					key, 
					success: (res) => { 
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
					fail: (error) => {
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
		margin: 0;
		padding: 0;
	}

	
</style>
