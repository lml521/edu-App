<template>

	<view v-show="i === index">
		
		<downBar @search="search" :params="params" ></downBar>
		<mescroll-body 
		:ref="'mescrollRef'+i" 
		@down="downCallback" 
		@up="upCallback"
		:down="downOption" 
		:up="upOption">
		
			<articleItem v-for="(item,index) in articleList" :key="index" :item="item"></articleItem>
		</mescroll-body>

	</view>
</template>


<script>
	import downBar from '@/components/common/down-bar.vue'; //下拉赛选 导航组件实现
	import downBarlist from '@/config/course-down-bar.js'; // 下拉菜单 数据 

	import articleItem from '@/components/article-item/article-item.vue' //每一项 item
	import indexApi from '@/api/index.js'; //请求接口
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";

	

	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)

		components: {
			downBar,
			articleItem
		},
		props: {
			i: {
				type: Number,
				default: 0,
			},
			index: {
				type: Number,
				default: 0,
			},
			// 传递参数 
			params: {
				type: Object,
				default: () => {}
			},
			content: { //搜索框内容
				type: String,
				default: '',
			},
		},
		data() {
			return {
			
				downOption: {
					auto: true,
				},
				upOption: {
					auto: true, // 不自动加载
					noMoreSize: 4,
					empty: {
						tip: "暂无相关数据",
						icon: ""
					}
				},
				articleList: [],//全部数据
				// 用来保存搜索的参数
				searchData: {
					content: '', // 要查询的内容
					current: 1, // 分页的页码
					size: 10, // 分页的条数
					sort: null, // 排序
					isFree: null, // 0 付费 1免费 null 全部课程
					labelId: null, // 标签id
					categoryId: null // 类别id
				}
			}
		},
		methods: {
			// 搜索
			search(data) {
			},
			// 上拉加载 回调
			async upCallback(page) {
				console.log(1234)
					let res = await indexApi.getArticleList(this.searchData)
					const list = res.data.records
					if(page.num==1){
						this.articleList=[],
						this.mescroll.scrollTo(0,0)
					}
					
					this.articleList=this.articleList.concat(list)
				    this.mescroll.endBySize(this.articleList.length,res.data.total)
				
			}
	}
	}

</script>
<style lang="scss">
	.mescroll-body {
		min-height: 1087rpx !important;
		height: 100% !important;
	}

	.empty-icon {
		background-color: pink !important;
		margin: auto !important;
		background-color: pink;

		img {
			display: inline-block !important;
		}
	}
</style>
