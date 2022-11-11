<template>
	<view class="classifyBox">
		<scroll-view scroll-y="true" class="left noScorll">
			<view v-for="(item,index) in classifyList" class="title" :class="{active:activeIndex==index}"
				@click="ChangeActiveIndex(index)">
				{{item.name}}
			</view>
		</scroll-view>

		<scroll-view scroll-y="true" class="right noScorll">
			<view class="tag" v-for="(ele,i) in labelList" :key="i" @click="handelSearch">
				{{ele.name}}
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import indexApi from '@/api/index.js'
	export default {
		data() {
			return {
				classifyList: [], //分类全部数据
				activeIndex: 0, //高亮选中
				labelList: [], //选中的子数据
			};
		},

		onLoad() {
			this.getClassifyList()
		},
		
		// 点击 头部搜索 跳转 
		onNavigationBarButtonTap(e){ 
			console.log(e)
			if(e.index==0){
				// 跳转  
			}
			
		},
		methods: {
			// 获取 分类数据 
			async getClassifyList() {
				let res = await indexApi.getNavList()
				this.classifyList = res.data
				this.labelList = res.data[this.activeIndex].labelList
				console.log(this.classifyList, this.labelList)
			},

			// 切换 分类名称
			ChangeActiveIndex(index) {
				console.log(index)
				this.activeIndex = index
				this.labelList = this.classifyList[index].labelList
			},
			
			
			// 点击每一项跳转页面 
			handelSearch(){
				console.log(1)
				
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
