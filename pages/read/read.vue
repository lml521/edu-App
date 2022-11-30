<template>
	<view class="container-list">
		<!-- tabBar切换 -->
		<meTabs v-model="tabIndex" :tabs="tabs" :tab-width="150"></meTabs>

		<!-- 下面子数据 -->
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i" :style="{height: height}">

				<mescroll-item 
				ref="mescrollItem" 
				:i="i" 
				:index="tabIndex" 
				:tabs="tabs" 
				:height="height">
				</mescroll-item>

			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import meTabs from '@/components/me-tabs/me-tabs' //tabBar组件
	import MescrollItem from "@/pages/read/components/mescroll-more-item.vue";
	import indexApi from "@/api/index.js"
	export default {

		components: {
			MescrollItem,
			meTabs
		},

		data() {
			return {
				height: "", //高度
				tabIndex: 0, //选中id
				tabs: [],
				tabIndex: 0 // 当前tab下标,必须与mescroll-more.js对应,所以tabIndex是固定变量,不可以改为其他的名字

			};
		},


		onLoad() {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px'
			this.getCategoryList()

		},
		onShow() {
			this.$nextTick(() => {
				console.log(this.$refs["mescrollItem"])
			})
		},
		methods: {
			
			// 轮播菜单
			swiperChange(e) {
				this.tabIndex = e.detail.current
			},
			// 获取数据 
			async getCategoryList() {
				try{
					uni.showLoading({title : '加载中', mask: true})
					let {code,data} =await indexApi.getNavList()
					// console.log(res)
					if(code==20000){
						console.log(data)
						data.unshift({id : null, name : '推荐'})
						this.tabs=data
						console.log(this.tabs)
					}
					uni.hideLoading()
				}catch(e){
					console.log(e)
				}

			}
		},



		// 阅读页面 头部搜索栏 点击跳转搜索页面 
		onNavigationBarSearchInputClicked() {
			this.navTo("/pages/search/search")
		},

	}
</script>

<style lang="scss">
	page,.container-list {
		height: 100%;
		overflow: hidden;
	}
</style>
