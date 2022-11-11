<template>
	<listBox :name="name" :word="word">
		<courseItem :item="item" v-for="(item,index) in courseData"
		:key="index"></courseItem>
	</listBox>
</template>

<script>
	import listBox from '@/pages/index/components/list-box.vue'
	
	import courseItem from '@/components/course-item/course-item.vue'; //盒子中每一项
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
				
			// 总数据
			courseData: {
				type: Array,
				default:() =>[]
			},
			},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
