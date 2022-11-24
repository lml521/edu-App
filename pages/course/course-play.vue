<template>
	<view class="videoBox">
		<!-- 视频播放 页面 -->
		<video :src="videoUrl" id="myVideo" class="video" :poster="posterUrl"></video>
		<view class="course-info space-between">
			<view class="title text-ellipsis">
				{{course.title}}
			</view>
			<view @click="navTo(`/pages/course/course-details?id=${id}`)">
				详情
				<text class="iconfont icon-right "></text>
			</view>
		</view>


		<!-- 课程章节 -->
		<courseDir @handlePlayVideo="changeVideo" :chapterList="courseList" :activeObject="activeObject" :isBuy="isBuy">
		</courseDir>


		<!-- 底部按钮 分析  评价 -->
		<view class="footerBtn row">
			<!-- #ifdef APP-PLUS -->
			<view class="one center column">
				<text class="iconfont  icon-Share-Outline"></text>
				<text>分享</text>
			</view>
			<!-- #endif -->
			<view class="one center column">
				<text class="iconfont  icon-edit"></text>
				<text>评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	import courseDir from '@/pages/course/components/course-dir.vue' // 每一个视频组件
	import courseApi from '@/api/course.js'
	export default {
		components: {
			courseDir
		},
		data() {
			return {
				isBuy: true, //课程是否购买
				id: null, //id
				//视频播放地址
				videoUrl: "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=164016&resourceType=video&editionType=low&source=aliyun&playUrlType=url_oss",
				// 视频封面的图片
				posterUrl: "/static/images/banner1.jpg",
				course: {},
				videoContext: null, //视频实例对象
				courseList: [], // 保存已购买的课程列表
				activeObject: {
					index: 1, //章  的 数据
					i: 0, //节  的数据
				},

			};
		},
		onLoad(options) {
			console.log(options)
			this.setHandelActive(options)
			this.getCourseBuyList()

			this.getCourseDetail()

		},
		onReady() {
			// 获取 视频 实例对象
			this.videoContext = uni.createVideoContext('myVideo', this)
			this.videoContext.pause()
			setTimeout(() => {
				this.videoContext.play()
			}, 300)
		},

		methods: {
			// 切换下一个视频 
			changeVideo(data, index, i) {
				this.activeObject.index = index
				this.activeObject.i = i
				this.videoContext.pause()
					this.videoUrl = data.videoUrl
				setTimeout(() => {
					this.videoContext.play()
				}, 300)


			},



			// 获取 详细信息 
			async getCourseDetail() {
				// 信息
				let res = await courseApi.courseList(this.id)
				this.course = res.data

			},

			// 获取 购买过后的 数据 
			async getCourseBuyList() {
				let res = await courseApi.getCourseBuyList(this.id)
				this.courseList = res.data
				console.log(this.courseList, 92)
				// #ifndef APP-PLUS
				// 视频封面的图片
				this.posterUrl = this.course.mainImage
				console.log(this.courseList)
				let {
					index,
					i
				} = this.activeObject
				const chapter = this.courseList[index].sectionList[i]
				console.log(chapter, 'chapter')
				this.videoUrl = chapter.videoUrl
				// #endif
			},


			// 设置选中的章节 
			setHandelActive(options) {
				console.log(options)
				this.activeObject.index = Number(options.index)
				this.activeObject.i = Number(options.i)
				console.log(this.activeObject.index, this.activeObject.i)
			}
		}
	}
</script>

<style lang="scss">
	.videoBox {
		width: 100%;
		padding-bottom: 100rpx;

		.video {
			width: 100%;
		}
	}

	.course-info {

		padding: 30rpx;
		font-weight: bold;
		border-bottom: $i-underline;

		.title {
			font-size: 35rpx;
			width: 500rpx;
			line-height: 60rpx;
			color: $uni-text-color-placeholder;

		}
	}

	.footerBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		border-top: $i-underline;

		.one {
			text {
				color: $uni-text-color-grey;
				font-size: 25rpx;
			}

			.iconfont {
				font-size: 35rpx;
			}
		}
	}
</style>
