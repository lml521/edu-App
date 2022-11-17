<template>
	<view class="dir-box">
		<!-- 章节 -->

		<view class="dir-item" v-for="(item,index) in chapterList" :key="index">
			<h3 class="item-title">
				第{{item.id}}章 {{item.name}}
			</h3>
			<view class="item-content" v-for="(e,i) in item.sectionList">

				<i class="iconfont icon-roundrightfill"></i>
				<span>{{item.id}}-{{e.id}}</span>
				<span>{{e.name}}</span>

				<text class="trysee" v-if="e.isFree">试看</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			chapterList: { //章节信息
				type: Array,
				default: () => [{
						id: 1,
						name: '课程介绍',
						sectionList: [ //课节信息
							{
								id: 1,
								name: '什么是uni-app框架',
								isFree: 1, // 是否付费（0付费，1免费）
							},
							{
								id: 2,
								name: '安装HBuilderX和插件',
								isFree: 0, // 是否付费（0付费，1免费）
							},
							{
								id: 3,
								name: '创建uni-app项目和运行Web浏览器',
								isFree: 0, // 是否付费（0付费，1免费）
							}
						]
					},
					{
						id: 2,
						name: '初始化梦学谷在线教育APP项目',
						sectionList: [ //课节信息
							{
								id: 1,
								name: '创建运行项目和完善项目目录',
								isFree: 0, // 是否付费（0付费，1免费）
							},
							{
								id: 2,
								name: '拷贝静态资源到项目和mixin混合讲解',
								isFree: 0, // 是否付费（0付费，1免费）
							}
						]
					}
				]
			}
		},

		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.dir-box {
		padding: 20rpx 30rpx;

		.dir-item {
			margin-top: 15px;
			margin-bottom: 5px;
			color: #333;
			font-size: 17px;
			font-weight: 700;

			.item-title {
				margin: 15rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				white-space: normal;

			}

			.item-content {
				padding: 10px 0;
				font-weight: normal;
				font-size: 15px;
				border-bottom: 0.5px solid #efeff4;
				line-height: 20px;
				color: #3d3c40;
				position: relative;

				span {
					margin: 0 10rpx;
				}

				.trysee {
					position: absolute;
					right: 0;
					color: #238cff;
				}
			}

		}
	}
</style>
