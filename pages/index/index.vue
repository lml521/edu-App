<template>
	<view class="content">
		<!-- 小程序中搜索 -->
		<!-- #ifdef MP-WEIXIN -->
		<searchInput></searchInput>
		<!-- #endif -->

		<!-- 轮播图 -->
		<Banner></Banner>

		<!-- 分类模块 -->
		<categoryBox ></categoryBox>


		<!-- 热门推荐、近期上新、免费精选 、付费精品、 -->
		<view class="list-container">
			<!-- 热门推荐 -->
			<swiperCourse name="热门推荐" word="HOT"></swiperCourse>
			
		</view>
	</view>
	</view>
</template>

<script>
	import searchInput from '@/components/search-input/search-input.vue'; //小程序中搜索
	import categoryBox from '@/components/category-box/category-box.vue'; //分类模块
	import Banner from '@/components/banner/banner.vue'; //轮播图
	
	import swiperCourse from '@/pages/index/components/swiperCourse.vue';//热门推荐
	
	export default {
		components: {
			searchInput, //小程序中搜索
			categoryBox, //分类模块
			Banner, //轮播图
			swiperCourse,//热门推荐
		},
		data() {
			return {}
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 搜索框提示信息，只在APP中有
			this.placeholderData()
			// #endif
		},
		methods: {

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
		}
	}
</script>

<style lang="scss">
	
.list-container{
	margin-top: 50rpx;
	padding: 0 30rpx;
}
</style>
