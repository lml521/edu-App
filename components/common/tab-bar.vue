<template>
	<!-- @touchmove.stop.prevent 禁止滑动，给一个空函数 -->
	<view class="tab-bar" >
		<view class="bar-view center">
			
			<view class="bar-item" v-for="(item,index) in tabs" :key="index"  :class="{current:index===value}" 
			@click="handelChangeTab(index)">
				{{item.name}}
				
			</view>
			
		</view>
	</view>
</template>
<script>
	export default{
		props:{
			value:{
				type:[Number,String],
				default:0,
			},
			// tabBar 栏 数据 
			tabs:{
				type:Array,
				default:()=>[
					{
						id:1,
						name:'课程'
					},{
						id:2,
						name:'文章'
					},{
						id:3,
						name:'问答'
					},
				]
			}
		},
		
		methods:{
			// tabBar 切换 
			handelChangeTab(index){
				console.log(index)
				this.$emit('input',index)
			}
		}
		
	}
</script>


<style lang="scss">
	.tab-bar {
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #efeff4;

		.bar-view {
			width: 100%;
			text-align: center;

			.bar-item {
				flex: 1;
				font-size: 30rpx;
				line-height: 80rpx;
				position: relative;

				&:after {
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border-bottom: 6rpx solid $text-color-blue;
					border-radius: 20rpx;
					left: 50%;
					bottom: 6rpx;
					transform: translateX(-50%);
					transition: .3s;
				}
			}

			.current {
				color: $text-color-blue;

				&:after {
					width: 60rpx;
				}
			}
		}
	}
</style>
