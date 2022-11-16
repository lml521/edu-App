<template>
		<!-- 问答 -->
		<view v-show="i === index">
			
		 <!-- 下拉筛选组件 -->
		 <downBar @search="search" :params="params"></downBar> 
		 <!-- 加载数据列表 -->
		 <!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序
		 可固定值为 ref="mescrollRef")
		 downOption 和 upOption 在 mescroll-more-item.js 已经定义了,页面中可不定义
		 downCallback 下拉刷新的回调 可以不写，mixins已默认，
		 会调用upCallback上拉加载方法，统一在upCallback中实现查询逻辑
		 -->
		 <mescroll-body 
		 :ref="'mescrollRef'+i" 
		 @init="mescrollInit" 
		 @down="downCallback"
		 @up="upCallback" 
		 :down="downOption" 
		 :up="upOption">
		 
		 </mescroll-body>
	
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
