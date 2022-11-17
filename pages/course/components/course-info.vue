<template>
	<!-- 详情 -->
	<view class="center">
		<img :src="item" v-for="(item,index) in detailUrls">
		
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

	
</style>
