<!-- @touchmove.stop.prevent 禁止滚动 -->
<template>
	<view class="down-bar row sticky-box" @touchmove.stop.prevent="()=>{}">
	    
		<view class="one" v-for="(item,index) in downBarList" :key="index" @click="handelSort(item)">
			<view class="center " :class="{active : item.active || (item.id)}">
				<text>{{item.name}}</text>
				<text class="iconfont icon-down1" v-show="!item.active"></text>
				<text class="iconfont icon-up" v-show="item.active"></text>
			</view>


			<view class="item-list" v-show="item.active">
				<classify v-if="item.isCategory" class="category" :value="item" @searchByLabel="searchByLabel">
				</classify>
				<view class="name" v-else v-for="(e,i) in item.list" :key="i" @click="handelChangeSort(item,e)"
					:class="{active:activeSortName==e.name}">{{e.name}}</view>
			</view>

			<!-- 蒙层 -->
			<view class="cover" v-show="item.active"></view>
		</view>
	</view>
</template>


<script>
	// 引入 分类页面 
	import classify from '@/pages/classify/classify.vue'
	export default {
		components: {
			classify,
		},
		props: {
			params: {
				type: Object,
				default: () => {}
			},
			// 下拉选项 数据 
			downBars: {
				type: Array,
				default: () => [{
						type: 'sort',
						name: '综合排序',
						active: false,
						list: [{
								id: null,
								name: '综合排序'
							},
							{
								id: 'new',
								name: '最新排序'
							},
							{
								id: 'hot',
								name: '热门排序'
							}
						]
					},
					{
						type: 'label',
						name: '全部分类',
						active: false,
						isCategory: true
					}
				]
			}

		},
		data() {
			return {
				downBarList: null,
				activeSortName: '综合排序', //综合排序
			};
		},
		created() {
			this.downBarList = this.downBars
		},
		watch: {
			params: {
				handler(newVal) {
					if (newVal) {
						console.log(newVal)
						const obj = this.downBars[this.downBars.length - 1]
						obj.name = newVal.labelName
						obj.id = newVal.labelId
						obj.activeIndex = newVal.activeIndex
					}
					
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 切换下拉组件
			handelSort(item) {
				this.activeSortName = item.name
				// for循环 总数据  判断当前点击的这一项active是否为true 如果不是则定义true  
				this.downBarList.forEach(i => {
					i.active = (item.type == i.type) ? !i.active : false
				})


			},

			// 点击 综合排序 
			handelChangeSort(item, ele) {
				// if(item.name==ele.name) return 
				item.name = ele.name
				item.id = ele.id
				this.$emit("search", {
					[item.type]: item.id
				})

			},


			searchByLabel(label) {
				this.$emit("search", {
					labelId: label.id,
					categoryId: label.categoryId
				})
			}
		}


	}
</script>

<style lang="scss">
	.down-bar {
		z-index: 100;
		background-color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
		display: flex;
	}

	.item-list {
		z-index: 100;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;

		.name {
			padding-left: 50rpx;
		}

		.category {
			height: 580rpx;
		}
	}

	// 被点击之后的效果
	.active {
		color: $text-color-blue;
	}

	// 粘顶
	.sticky-box {
		position: -webkit-sticky;
		// 查看渲染效果。 5. 重构 down-bar.vue 声明 props 和 点击事件函数， 
		position: sticky;
		/* 其他浏览器 */
		top: var(--window-top);
	}

	/*蒙层*/
	.cover {
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		top: 170rpx;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.1 !important;
	}
</style>
