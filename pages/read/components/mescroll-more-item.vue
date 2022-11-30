<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<view v-show="i === index">


		<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" 
		:down="downOption" @down="downCallback"
			:up="upOption" @up="upCallback"
			:height="height">
			<!-- 数据列表 -->
			 <articleItem v-for="(item,index) in articleList"  
			:key="index" :item="item"></articleItem>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	// import {apiGoods} from "@/api/mock.js"
	import indexApi from '@/api/index.js'
	import articleItem from '@/components/article-item/article-item.vue'
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			articleItem,
		},
		props: {
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default () {
					return 0
				}
			},
			tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
				type: Array,
				default () {
					return []
				}
			},
			height: [Number,String] // mescroll的高度
		},
		data() {
			return {
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载

					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					}
				},
				articleList: [] //列表数据
			}
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				console.log(page)
				const current = page.num
				const size = page.size
				try {
					const categoryId = this.tabs[this.index].id
					const data = {
						current,
						size,
						categoryId
					}

					let res = await indexApi.getArticleList(data)
					console.log(res)
					let list = res.data.records
					console.log(list)
					if (page.num === 1) {
						this.articleList = []
						this.mescroll.scrollTo(0, 0)
					}
					this.articleList = this.articleList.concat(list)
					this.mescroll.endBySize(this.articleList.length, res.data.total)
				} catch (e) {
					console.log(e)
				}
			},

		}
	}
</script>

<style lang="scss">
	// .mescroll-body {
	// 	padding-top: 0 !important;
	// }
</style>
