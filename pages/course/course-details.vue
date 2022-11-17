<template>
	<view>
		<courseHeader></courseHeader>

		<view class="course-details" :style="{height : pageHeight + 'px'}">
			<tabBar :tabs="list" v-model="index"></tabBar>
			<swiper class="swiper-box" :current="index" circular @change="changeCurrwnt">
				<swiper-item v-for="(item,i) in 4" :key="i">

					<scroll-view upper-threshold="0" @scrolltoupper="scrolltoupper" class="scroll-view"
						:scroll-y="enableScroll">
						<view class="details-info">
							<!-- <view v-for="(item,index) in 90">123</view> -->
							<courseInfo v-if="index === 0"></courseInfo>
							<courseDir v-else-if="index === 1"></courseDir>
							<courseComment v-else-if="index === 2"></courseComment>
							<courseGroup v-else-if="index === 3"></courseGroup>
						</view>
					</scroll-view>
				</swiper-item>

			</swiper>
		</view>
	</view>
</template>

<script>
	import courseHeader from "@/pages/course/components/course-header.vue"; //详情页面 头部
	import tabBar from '@/components/common/tab-bar.vue'; //tabBar 组件
	import list from '@/config/course-details-tabs.js'
	
	import courseInfo from "@/pages/course/components/course-info.vue"
	import courseDir from "@/pages/course/components/course-dir.vue"
	import courseComment from "@/pages/course/components/course-comment.vue"
	import courseGroup from "@/pages/course/components/course-group.vue"
	export default {
		components: {
			courseHeader,
			tabBar,courseInfo,courseDir,courseComment,courseGroup
		},
		data() {
			return {
				index: 0,
				list,
				pageHeight: 300,
				enableScroll: false,
				detailTop: 0,
				statusNavHeight: 0, // 状态栏  +  导航栏的高度
			};
		},

		onLoad() {
			this.getpageHeight()
		},
		// 页面滚动到底部 (滚动条滚动到底部)
		onReachBottom() { // 默认滚动到页面据底部还有50的时候会触发onReachBottom
			this.enableScroll = true
		},
		methods: {
			// 改变 当前 轮播 
			changeCurrwnt(event) {
				this.index = event.detail.current
				const res = uni.getSystemInfoSync()
				uni.pageScrollTo({
					scrollTop: res.windowHeight,
					duration: 150
				})
			},

			// 监听scroll-view滚动条滚动到距离顶部还剩50px的时候触发
			scrolltoupper() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
				this.enableScroll = false
			},
			// 获取 页面高度 
			getpageHeight() {
				// 获取系统信息 
				const res = uni.getSystemInfoSync()
				//获取 当前是在 安卓 还是 ios 
				let system = res.platform

				// 获取状态栏的高度
				let statusBarHeight = res.statusBarHeight

				// 当时 是 ios 导航栏是44  安卓的时候是48
				if (system == 'ios') {
					this.statusNavHeight = statusBarHeight + 44
				} else if (system == 'android') {
					this.statusNavHeight = statusBarHeight + 48
				}

				// 页面高度
				console.log(res.windowHeight)
				this.pageHeight = res.windowHeight - this.statusNavHeight
			}
		}
	}
</script>

<style lang="scss">
	.course-details {
		overflow: hidden;

		.swiper-box,
		.scroll-view {
			height: 100%;
		}

		.details-info {
			padding-bottom: 180rpx;
		}
	}
</style>
