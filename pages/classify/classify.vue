<template>
	<!-- 分类页面 -->

	<view class="classifyBox">
		<scroll-view scroll-y="true" class="left noScorll">
			<view v-for="(item,index) in classifyList" class="title" :class="{active:activeIndex==index}"
				@click.stop="ChangeActiveIndex(index,item)">
				{{item.name}}
			</view>
		</scroll-view>

		<scroll-view scroll-y="true" class="right noScorll">
			<view class="tag" v-for="(ele,i) in labelList" :key="i" @click.stop="handelSearch(ele)">
				{{ele.name}}
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import indexApi from '@/api/index.js'
	export default {

		props: {
			// 搜索页面 传递过来的 当前一项 
			value: {
				type: Object,
				default: () => {}
			}

		},
		data() {
			return {
				classifyList: [], //分类全部数据
				activeIndex: 0, //高亮选中
				labelList: [], //选中的子数据
			};
		},
		mounted() {
			this.getClassifyList()
		},

		// 点击 头部搜索 跳转 
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				// 跳转  
				this.navTo("/pages/search/search")
			}

		},
		methods: {
			// 获取 分类数据 
			async getClassifyList() {
				let res = await indexApi.getNavList()
				this.classifyList = res.data
				this.labelList = res.data[this.activeIndex].labelList

				// 判断是否 点击了全部分类 展示的分类页面  
				//  如果是 需要添加一个  "全部分类"  每一项中添加一个  "不限"
				if (this.value) {
					this.classifyList.forEach(item => {
						item.labelList.unshift({
							id: null,
							name: "不限",
							cname: item.name,
							categoryId: item.id
						})
					})
					this.classifyList.unshift({
						id: null,
						name: "全部分类"
					})
					this.activeIndex = this.value.activeIndex > -1 ? parseFloat(this.value.activeIndex) + 1 : this.activeIndex
				}
			},
			searchPageChangeLabel(item) {
				if (this.value.name !== item.name && this.value.name !== item.cname) {
					// 赋值给搜索面显示名称，如果有分类名就取分类名，没有就取标签名
					this.value.name = item.cname || item.name
					// 标签id
					this.value.id = item.id || null
					// 分类id (点击`不限`是分类id，)
					this.value.categoryId = item.categoryId || null
					// 解决父组件，搜索新数据
					this.$emit('searchByLabel', this.value)
				}
				this.value.active = false

			},

			// 切换 分类名称
			ChangeActiveIndex(index, item) {
				if (item && item.name === "全部分类") {
					this.searchPageChangeLabel(item)
					return
				}
				this.activeIndex = index
				this.labelList = this.classifyList[index].labelList
			},

			// 点击每一项跳转  搜索 页面 
			handelSearch(item) {
				if (this.value) {
					this.searchPageChangeLabel(item)
					return
				}

				this.navTo(
					`/pages/search/search?labelId=${item.id}&labelName=${item.name}&activeIndex=${this.activeIndex}`)
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.classifyBox {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			background-color: #f8f9fb;
			position: relative;

			.title {
				height: 150rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #8c8c8c;
			}

			.active {
				color: #365fc2;
				font-weight: 900;

				&:before {
					content: "";
					width: 4rpx;
					height: 60rpx;
					background-color: #365fc2;
					position: absolute;
					left: 0rpx;
					transition: .5s;
				}
			}
		}

		.right {
			display: flex;
			flex: 1;

			.tag {
				display: inline-block;
				width: 160rpx;
				height: 70rpx;
				margin: 30rpx 10rpx 0 10rpx;
				border: 1px solid #dadada;
				font-size: 28rpx;
				border-radius: 30rpx;
				line-height: 70rpx;
				text-align: center;


			}
		}
	}
</style>
