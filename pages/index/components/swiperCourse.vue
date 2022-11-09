<template>
	<view>
		<!-- 热门推荐大盒子 -->
		<listBox>
			<!-- 盒子中的每一项 -->
			<courseItem v-for="item in 8"></courseItem>
		</listBox>
	</view>
</template>
<script>
	import listBox from './list-box.vue';// 热门推荐大盒子	
	import courseItem from '@/components/course-item/course-item.vue';//盒子中每一项
	export default {
		components:{
			listBox,
			courseItem,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
