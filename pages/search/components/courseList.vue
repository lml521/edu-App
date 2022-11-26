<template>
	<!-- 课程 -->
	<view v-show="i === index">
		<!-- 下拉筛选组件 -->
		<downBar @search="search" :params="params" :downBars="downBarlist"></downBar>
		
		<mescroll-body 
		:ref="'mescrollRef'+i" 
		@init="mescrollInit" 
		@down="downCallback" 
		@up="upCallback"
		:down="downOption" 
		:up="upOption">
			<courseItem v-for="(item,index) in courseList" :key="index" :item="item"></courseItem>
		</mescroll-body>

	</view>
</template>

<script>
	import downBar from '@/components/common/down-bar.vue'; //下拉赛选 导航组件实现
	import downBarlist from '@/config/course-down-bar.js'; // 下拉菜单 数据 

	import courseItem from '@/components/course-item/course-item.vue' //每一项 item
	import indexApi from '@/api/index.js'; //请求接口
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)

		components: {
			downBar,
			courseItem
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
				// 下拉菜单 数据 
				downBarlist: downBarlist(),
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
				courseList: [],
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
				if(data){
					Object.assign(this.searchData, data)
				}
				this.mescroll.resetUpScroll(true) // 每次搜索 先从第一页开始
			},
			// 上拉加载 回调
			async upCallback(page) {
				console.log(9876)
				this.searchData.content = this.content && this.content.trim() || ""
				this.searchData.current = page.num
				this.searchData.size = page.size
					let res = await indexApi.getCourseList(this.searchData)
					const list = res.data.records
					
					if(page.num==1){
						this.courseList=[],
						this.mescroll.scrollTo(0,0)
					}
					
					this.courseList=this.courseList.concat(list)
				    this.mescroll.endBySize(this.courseList.length,res.data.total)
				// this.mescroll.endSuccess(0) // 关闭 下拉搜索
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
