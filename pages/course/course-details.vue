<template>
	<!-- 详情页面 -->
	<view v-cloak>
		<courseHeader :item="courseData"></courseHeader>
		<view class="course-details" :style="{height : pageHeight + 'px'}">
			<tabBar :tabs="list" v-model="index"></tabBar>
			<swiper class="swiper-box" :current="index" circular @change="changeCurrwnt">
				<swiper-item v-for="(item,i) in 4" :key="i">
					<scroll-view upper-threshold="0" @scrolltoupper="scrolltoupper" class="scroll-view"
						:scroll-y="enableScroll">
						<view class="details-info">
							<!-- 详情 -->
							<courseInfo v-if="index === 0" :detailUrls="detailUrls"></courseInfo>
							<!-- 章节 -->
							<courseDir v-else-if="index === 1" :chapterList="chapterList" :activeObject="activeObject"
								:isBuy="isBuy" @handlePlayVideo="handlePlayVideo"></courseDir>
							<!-- 评论 -->
							<courseComment v-else-if="index === 2" :commentList="commentList"></courseComment>
							<!-- 套餐 -->
							<courseGroup v-else-if="index === 3" :groupList="groupList"></courseGroup>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="BuyNow">
			<button class="button" @click="purchasePlay">{{isBuy ||courseData.isFree?'立即观看':'立即购买'}}</button>
		</view>

		<!-- 遮罩 视频 播放 -->
		<view class="mask videoBox" @click="videoClose" v-if="videoUrl" @handlePlayVideo="handlePlayVideo">
			<view class="title">
				免费试看
				<i class="iconfont icon-close"></i>
			</view>
			<video :src="videoUrl" id="myVideo" class="video"></video>
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

	import courseApi from '@/api/course.js'
	export default {
		components: {
			courseHeader,
			tabBar,
			courseInfo,
			courseDir,
			courseComment,
			courseGroup
		},
		data() {
			return {
				isBuy: true, //是否购买课程
				index: 0,
				list,
				pageHeight: 300, //页面高度
				enableScroll: false, //详情 是否开启滚动 
				detailTop: 0,
				statusNavHeight: 0, // 状态栏  +  导航栏的高度
				courseData: {}, //详情页头部信息
				detailUrls: [], //详情页数据 
				chapterList: [], //章节数据
				commentList: [], //评论数据
				groupList: [], //套餐
				coursePlayStatus: false,
				courseId: null, //视频id
				videoUrl: null, //视频播放的地址
				// 视频选中的 id 
				activeObject: {
					index: 0,
					i: 0
				},
				videoContext: null, //音频实例对象

			};
		},

		onLoad(option) {
			console.log(option.id)
			this.getpageHeight() //获取页面高度
			this.getCourseId(option.id)
		},
		onReady() {
			// 获取 视频 实例对象 
			this.videoContext = uni.createVideoContext('myVideo')
		},


		// 页面滚动到底部 (滚动条滚动到底部)
		onReachBottom() { // 默认滚动到页面据底部还有50的时候会触发onReachBottom
			this.enableScroll = true
		},
		created() {
			this.getCourseList()
			this.getChapterList()
			this.getCommentList()
			this.getGroupList()
		},
		methods: {
			// 点击 视频  play
			handlePlayVideo(data, index, i) {
				this.activeObject.index = index;
				this.activeObject.i = i;
				// 判断是否购买章节  如果购买了章节 跳转 视频播放页面
				if (this.isBuy) {
					this.navTo(
						`/pages/course/course-play?id=${this.courseId}&index=${this.activeObject.index}&i=${this.activeObject.i}`
						)
					return
				}


				this.$nextTick(() => {
					this.videoUrl = data.videoUrl
					// 视频实例对象 方法 play 自动播放 
					this.videoContext.play()
				})
			},
			videoClose() {
				this.videoContext.stop() //停止播放
				this.videoUrl = null
			},
			// 按钮  立即购买 立即播放
			purchasePlay() {
				console.log(this.isBuy, this.courseData.isFree, 555)
				// 当isBuy为true 则是购买过课程  ,isFree 为 1是免费   跳转 视频播放页面
				if (this.isBuy || this.courseData.isFree) {
					this.navTo('/pages/course/course-play')
				}
			},




			// 获取课程id
			getCourseId(id) {
				this.courseId = id
			},

			// 请求 详情 信息 
			async getCourseList() {
				let res = await courseApi.courseList(this.courseId)
				this.courseData = res.data
				this.detailUrls = res.data.detailUrls

				uni.setNavigationBarTitle({
					title: this.courseData.title
				})
			},

			// 请求章节 
			async getChapterList() {
				let res = await courseApi.chapterList(this.courseId)
				this.chapterList = res.data
			},

			// 获取 评论 数据 
			async getCommentList() {
				let res = await courseApi.commentList(this.courseId)
				this.commentList = res.data
			},

			// 获取 套餐 数据 
			async getGroupList() {
				let res = await courseApi.groupList(this.courseId)
				this.groupList = res.data
			},


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
			},


		}
	}
</script>

<style lang="scss">
	[v-cloak] {
		display: none;
	}

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

	.BuyNow {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.button {
			width: 90%;
			margin: auto;
			border-radius: 40rpx;
			height: 80%;
			color: #fff;
			background-color: #345dc2;
		}
	}

	.videoBox {
		color: #fff;
		padding-top: 400rpx;
		text-align: center;

		.title {
			margin: 30rpx 0;
		}

		.video {
			width: 750rpx;
			height: 380rpx;
		}

	}
</style>
