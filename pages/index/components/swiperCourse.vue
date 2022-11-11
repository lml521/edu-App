<template>
	
		<!-- 热门推荐大盒子 -->
		 <listBox :name="name" :word="word">
			<swiper :style="{height:`${200*rows}rpx`}">
				<swiper-item v-for="(e,i) in column" :key="i">
					<view class="swiper-item">
						<courseItem :item="item" v-for="(item,index) in courseData.slice(i*rows,(i-1)*rows)" 
						:key="item.id"></courseItem>
					</view>
				</swiper-item>
			</swiper>
		</listBox> 
	
</template>
<script>
	import listBox from './list-box.vue'; // 热门推荐大盒子	
	import courseItem from '@/components/course-item/course-item.vue'; //盒子中每一项
	export default {
		components: {
			listBox,
			courseItem,
		},


		props: {
			// 总数据
			courseData: {
				type: Array,
				default: () =>[]
			},
			// title 名称
			name:{
				type:String,
				default:"热门推荐"	
			},
			word:{
				type:String,
				default:null,
			},
			// 展示 轮播几列
			column: {
				type: Number,
				default: 2,
			},
			// 一列展示几个	
			rows: {
				type: Number,
				default: 5,
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
