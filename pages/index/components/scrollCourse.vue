<template>
	<listBox :name="name" :word="word">

		<scroll-view scroll-x class="list-scroll noScorll">
			<view class="list-scroll-view" v-for="item in courseData" :key="item.id">
				<courseItem :isColumn="true" :item="item"></courseItem>
			</view>
		</scroll-view>
	</listBox>
</template>

<script>
	import listBox from '@/pages/index/components/list-box.vue'
	import courseData from '@/mock/courseData.js'
	import courseItem from '@/components/course-item/course-item.vue'
	export default {
		components: {
			courseItem,
			listBox,
		},
		props: {
			// title 名称
			name: {
				type: String,
				default: "热门推荐"
			},
			word: {
				type: String,
				default: null,
			},

			courseData: {
				type: Array,
				default: courseData
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		// 内容一行显示不换行
		white-space: nowrap;
		height: 380rpx;

		.list-scroll-view {
			display: inline-block;
			width: 310rpx;
			background-color: #fff;
			padding: 0 10rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
			box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
		}
	}
</style>
