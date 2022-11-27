<template>
	<!-- 封装 -->
	<view class="list-box">

		<view class="list" v-for="(item,index) in list " :key="index">
			<view class="list-item space-between center" hover-class="active" :hover-stay-time="50"
				v-for="(ele,i) in item" @click="handleClickItem(ele)">
				<view class="left center">
					<text v-if="ele.icon" :class="ele.icon"></text>
					<view class="title">{{ele.title}}</view>
				</view>
				<view class="right center">

					<img v-if="ele.src" :src="ele.src" alt="">

					<text v-if="ele.text">{{ele.text}}</text>

					<text v-if="ele.rightIcon" class="iconfont icon-right"></text>

					<switch v-if="ele.checked||ele.checked==false" :checked="ele.checked" />

				</view>
			</view>
		</view>
	</view>
	</view>


	</view>
</template>

<script>
	export default {
		props: {
			// 传递过来的展示 数据
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};

		},
		methods: {
			handleClickItem(item) {
				console.log(item)
				// 判断点击是否要跳转页面新的页面
				if (item.page) {
					this.navTo(item.page, {
						login: item.login
					})

				} else if (item.event) { // 判断点击是否有事件操作 
					this.$emit(item.event, item)
				}

			}
		}
	}
</script>

<style lang="scss">
	.list-box {
		background-color: $color-grey;
		padding-top: 20rpx;

		.list {
			background-color: #FFFFFF;
			margin-bottom: 20rpx;

			.list-item {
				padding: 26rpx 39rpx;
				border-bottom: $i-underline;

				.left {
					font-size: 33rpx;

					text:first-child {
						margin-right: 20rpx;
					}
				}

				.right {
					text {
						font-size: 35rpx;
						color: $uni-text-color-grey;
						margin-left: 15rpx;
					}


					image {

					img {
						width: 120rpx;
						height: 120rpx;
						border-radius: 60px;

					}

					switch {
						margin-right: -10rpx;
					}
				}
			}

			.active {
				background-color: #fafafa;
			}
		}
	}
	}
</style>
