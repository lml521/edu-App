<template>
	<!-- 课程 -->
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
			 <articleItem v-for="(item,index) in articleList" :key="index" :item="item"></articleItem>
		</mescroll-body> 

	</view>
</template>

<script>
	import downBar from '@/components/common/down-bar.vue'; //下拉赛选 导航组件实现

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
					auto: false,
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4,
					empty: {
						tip: "暂无相关数据",
						icon: ""
					}
				},
				articleList: [],
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
				console.log(data,'data')
				this.mescroll.resetUpScroll(true) // 每次搜索 先从第一页开始
			},
			// 上拉加载 回调
			async upCallback(page) {
				// this.searchData.content = this.content && this.content.trim() || ""
				// this.searchData.current = page.num
				// this.searchData.size = page.size
					let res = await indexApi.getArticleList(this.searchData)
					const list = res.data.records
					console.log(page,'page')
					if(page.num==1){
						this.articleList=[],
						this.mescroll.scrollTo(0,0)
					}
					this.articleList=this.articleList.concat(list)
					console.log(this.articleList.length,res.data.total,666)
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
		// margin: auto;
		// display: inline-block !important;
		margin: auto !important;
		background-color: pink;

		img {
			display: inline-block !important;
		}
	}
</style>
