<template>
	<!-- 详情 -->
	<view class="center column">
		<img :src="item" v-for="(item,index) in detailUrls" lazy-load mode="widthFix">
		<text class="footer-text">已经到达底部，没有更多内容了</text>
	</view>
</template>

<script>
	export default {
		props: {
			detailUrls: {
				type: Array,
				default: () => [
					'https://img.alicdn.com/imgextra/i2/3603079088/O1CN01V8VO2y2H0M5Bx33L3_!!3603079088.jpg'
				]
			}
		},

		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	img {
		width: 100%;

	}

	.footer-text {
		font-size: 30rpx;
		color: #777777;
		margin: 20rpx 0;
	}
</style>
