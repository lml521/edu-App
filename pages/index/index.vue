<template>
	<view class="content">
		<!-- 小程序中搜索 -->
		<!-- #ifdef MP-WEIXIN -->
		<searchInput></searchInput>
		<!-- #endif -->

		<!-- 轮播图 -->
		<Banner :bannerList="bannerList"></Banner>

		<mescroll-body 
		ref="mescrollRef"
		@init="mescrollInit" 
		@down="downCallback" 
		@up="upCallback" 
		:down="downOption"
		:up="upOption"
		>
			<!-- 分类模块 -->
			<categoryBox :categoryList="categoryList"></categoryBox>

			<!-- 热门推荐、近期上新、免费精选 、付费精品、 -->
			<view class="list-container">
				<!-- 热门推荐 -->
				<swiperCourse name="热门推荐" word="HOT" :courseData="hotCourseList"></swiperCourse>

				<!-- 近期上新 -->
				<scrollCourse name="近期上新" word="NEW" :courseData="newCourseList"></scrollCourse>

				<!-- 免费精选 -->
				<swiperCourse name="免费精选" word="FREE" :courseData="freeCourseList"></swiperCourse>

				<!--付费精品 -->
				<listCourse name="付费精选" word="NICE" :courseData="payCourseList"></listCourse>
			</view>
		</mescroll-body>

	</view>
	</view>
</template>

<script>
	import searchInput from '@/components/search-input/search-input.vue'; //小程序中搜索
	import categoryBox from '@/components/category-box/category-box.vue'; //分类模块
	import Banner from '@/components/banner/banner.vue'; //轮播图
	import swiperCourse from '@/pages/index/components/swiperCourse.vue'; //热门推荐
	import scrollCourse from '@/pages/index/components/scrollCourse.vue'; //近期上新
	import listCourse from "@/pages/index/components/list-course.vue"; //付费精品

	import api from '@/api/index.js'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			searchInput, //小程序中搜索
			categoryBox, //分类模块
			Banner, //轮播图
			swiperCourse, //热门推荐
			scrollCourse, //近期上新
			listCourse, //付费精品	

		},
		data() {
			return {
				bannerList: [], //广告信息
				categoryList: [], //分类信息
				hotCourseList: [], //热门推荐信息
				newCourseList: [], //近期上新信息
				freeCourseList: [], //免费精选信息
				payCourseList: [], //付费精品信息

				downOption: {
					offset: 50, //距离下面还有多少加载
				},
				upOption: {
					textLoading: '亲亲，在查询下页数据中',
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10, // 每页数据的数量
					},
					textNoMore: '-- 已加载完所有数据 --',
				},
			}
		},

		// app 扫码 
		onNavigationBarButtonTap: function(e) {
			const index = e.index
			if (index === 0) {
				this.handleOpenScanCode()
			}
		},


		onLoad() {

			// #ifdef APP-PLUS
			// 搜索框提示信息，只在APP中有
			this.placeholderData()
			// #endif

			this.loadData()
		},
		methods: {

			loadData() {
				this.getBanner()
				this.getNavList()
				this.getHotCourse()
				this.getNewCourseList()
				this.getFreeCourseList()
			},

			// 搜索框滚动数据
			placeholderData() {
				//获取当前页面实例, 仅 App 支持写在APP-PLUS条件编译下
				let webview = this.$scope.$getAppWebview();
				// webview.setStyle() 接收WebviewStyles对象改变样式
				// 修改导航输入框提示信息
				let arr = ['APP · 微信小程序', 'Java · SprinBoot', 'SpringCloud·SpringSecurity', 'Vue · React'];

				// 执行马上调用，如果在定时器自调用会报错，所以第一次放外面
				let i = 0;
				webview.setStyle({
					'titleNView': {
						"searchInput": {
							"placeholder": arr[i]
						}
					}
				})

				setInterval(() => {
					// 定时循环显示每个元素，3最后一个元素，又从0第1个元素开始
					i = i < 3 ? ++i : 0;
					webview.setStyle({
						'titleNView': {
							"searchInput": {
								"placeholder": arr[i]
							}
						}
					})
				}, 3000) // () 自调用第一次立即执行，但是ios会报错，所以在定时器外面执行第一次
			},
			// 扫码
			async handleOpenScanCode() {
				try {
					let res = await uni.scanCode()
					console.log(res[1].result, 'res');
					uni.navigateTo({
						url: `/pages/public/web-view?url=${res[1].result}`
					})
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}
			},
			// 获取 轮播图 
			async getBanner() {
				try {
					let res = await api.getBannerList()
					this.bannerList = res.data
				} catch (e) {
					console.log(e, '广告信息')
				}
			},

			// 分类模块 
			async getNavList() {
				try {
					let res = await api.getNavList()
					this.categoryList = res.data
				} catch (e) {
					confirm.log(e, '分类信息')
				}
			},

			// 热门推荐
			async getHotCourse() {
				try {
					let res = await api.getCourseList({
						sort: "hot",
						current: 1,
						size: 8
					})
					this.hotCourseList = res.data.records
				} catch (e) {
					confirm.log(e, '热门推荐')
				}
			},

			// 近期上新
			async getNewCourseList() {
				try {
					let res = await api.getCourseList({
						current: 1,
						isFree: 0,
						size: 8
					})
					this.newCourseList = res.data.records
				} catch (e) {
					confirm.log(e, '近期上新')
				}
			},

			// 免费精选信息
			async getFreeCourseList() {
				try {
					let res = await api.getCourseList({
						sort: "new",
						current: 1,
						size: 10
					})
					this.freeCourseList = res.data.records
				} catch (e) {
					confirm.log(e, '免费精选信息')
				}
			},


			async upCallback(page) {				
				if (page.num === 1) {
					this.loadData()
					this.payCourseList = []
				}
				let res = await api.getCourseList({
					isFree: 1,
					current: page.num,
					size: page.size
				})
				let currentList=res.data.records
				this.payCourseList = this.payCourseList.concat(currentList)
				this.mescroll.endBySize(currentList.length, res.data.total)
			}
		}
	}
</script>

<style lang="scss">
	.list-container {
		padding: 0 30rpx;
	}
</style>
