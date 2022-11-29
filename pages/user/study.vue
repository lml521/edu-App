<template>
	<view class="box">
		<!-- 我的学习 -->
		<view class="list center " v-for="(item,index) in list" :key="index">
			<view class="left column">
				<h4 class="text-ellipsis">{{item.title}}</h4>

				<view class="column">
					<view class="">已学{{item.percent}}%</view>
					<progress :percent="item.percent" stroke-width="2" activeColor="#345DC2" />
				</view>
			</view>
			<view class="right">
				<img :src="item.mainImage" alt="">
			</view>

		</view>
	</view>
</template>

<script>
	import studyApi from '@/api/study.js'
	export default {
		data() {
			return {
				list: []

			};
		},
		// 页面鉴权
		onLoad() {
			this.toPage()
			this.getStudyList()
		},

		methods: {
			async getStudyList() {
				let {
					code,
					data
				} = await studyApi.getStudyList()
				if (code == 20000) {
					this.list = data
				}

			}
		}
	}
</script>

<style lang="scss">
	.list {
		width: 100%;
		padding: 20rpx;

		.left {
			height: 150rpx;
			flex: 1;
			display: flex;
			justify-content: space-between;
			margin-right: 20rpx;
		}

		.right {
			img {
				width: 245rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
