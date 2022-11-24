<template>
		<!-- 问答 -->
		<view class="">
			<!-- 问答 -->
		</view>
		
</template>

<script>
	import downBar from '@/components/common/down-bar.vue'; //下拉赛选 导航组件实现
	
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
	 import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			downBar,
		},
		props: {
			i:{
				type:Number,
				default:0,
			},
			index:{
				type:Number,
				default:0,
			},
			params: {
				type: Object,
				default: () => {}
			},
			content: { //搜索框内容
				type: String,
				default: '',
			},
		},
	data(){
		return {
			downOption:{
				auto:false,
			},
			upOption:{
				auto:false, // 不自动加载
				noMoreSize: 4, 
				empty:{
				  tip : "暂无相关数据",
				}
			},
		}
	},
		methods: {
		// 搜索
		search(data) {
			console.log(data)
		},
		
		// 上拉加载 回调 
		upCallback(page){
			console.log('page',page)
			
		}
		}
	}
</script>

<style lang="scss">
	.mescroll-body{
		min-height: 1087rpx !important;
		height: 100% !important;
	}
</style>
