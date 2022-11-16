<template>
	<view class="article-item">
		<view class="article-content row">
			<view class="left-text column">
				<text class="title text-ellipsis">
					{{ item.title }}
				</text>
				<text class="summary text-ellipsis">
					{{ item.summary }}
				</text>
			</view>
			<view v-if="item.imageUrl" class="right-image">
				<image :src="item.imageUrl"></image>
			</view>
		</view>
		<view class="article-info">
			<text>
				{{ item.nickName }}
			</text>
			<text>
				· {{item.updateDate}}
			</text>
			<text>
				· {{ item.thumhup }} 赞
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						id: 10,
						imageUrl: "https://img.alicdn.com/bao/uploaded/i2/3603079088/O1CN01rGCkfb2H0M1O7Lj45_!!0-item_pic.jpg",
						nickName: "曾秀英",
						summary: "民须各号有行作被切县发支料海保会队其织中飞支体门日府三元展形收何农张例写论习员联命号米但间里要下打团把阶或面部而识战设群积影照叫广育大质北代积选阶子较总战原存亲大它她光万知和样内力放品县有团。",
						thumhup: 69307,
						title: "性集主里白研量南较身证于及由织同。",
						updateDate: "2018-07-02 02:20:44",
						userId: 1,
						viewCount: 59642,
					}
				}
			}
		},
		computed: {
			updateDate() {
				// return this.$util.dateFormat(this.item.updateDate,'YYYY年MM月DD日')
			}
		},
		mounted() {
			// console.log("old time", this.item.updateDate)
			// console.log("for", this.$util.dateFormat(this.item.updateDate))
		}
	}
</script>
<style lang="scss">
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis; //显示省略号
		-webkit-line-clamp: 2; //最多2行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal;
	}

	.article-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #f1f1f1;

		.article-content {
			.left-text {
				.title {
					font-size: 35rpx;
					font-weight: bold;
				}

				.summary {
					padding-top: 5rpx;
					font-size: 26rpx;
					color: #999;
					-webkit-line-clamp: 1; //最多1行
				}
			}

			.right-image {
				min-width: 220rpx;
				margin-left: 5rpx;

				image {
					width: 220rpx;
					height: 140rpx;
					border-radius: 10rpx;
				}
			}
		}

		.article-info {
			text {
				font-size: 26rpx;
				color: #999;
				padding-right: 10rpx;

				&:first-child {
					color: #222222;
				}
			}
		}
	}
</style>
