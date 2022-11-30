<template>
	<view class="details-box">
		<!-- 详情 -->
		<view class="tabList ">
			<uniTab class="tag-view" :text="item.name" size="small" 
			type="primary" inverted circle
			v-for="(item,index) in articleDetail.labelList"></uniTab>
		</view>
		<view class="title">
			<h2 class="text-ellipsis">{{articleDetail.title}}</h2>
			<view class="info">
				<img :src="articleDetail.userImage||'/static/logo.png'" alt="">
				<text class="name">{{articleDetail.nickName}}</text>
				<text class="time">· {{articleDetail.updateDate}}</text>
				<text class="time">· {{articleDetail.viewCount}}人阅读</text>
			</view>

			<!-- 文章内容区域 -->
			<!-- #ifdef MP-WEIXIN -->
			<rich-text nodes="<h2>hello word1</h2>"></rich-text>
			<!-- #endif -->
			<!-- #ifndef  MP-WEIXIN-->
			<view v-html="articleDetail.htmlContent"></view>
			<!-- #endif -->
		</view>

		<view class="footer">
			<!-- 热门评论 -->
			<view class="comment">
				<view class="footer-header">
					<text class="title">热门评论</text>
				</view>
				<view class="comment-item row" v-for="(item,index) in commentList" :key="index">
					<image :src="item.userImage||'/static/logo.png'" mode=""></image>
					<view class="right column">
						<view class="space-between">
							<text>{{item.nickName}}</text>
							<text>{{item.createDate}}</text>
						</view>
						<text class="content">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 发表评论 -->
		<view class="bottom center">
			<textarea @input="handleWatchValue" v-model="content" 
			placeholder="有何高见,展开讲讲……" class="textarea" />
			<button size="mini" :disabled="disabled || !content.trim()" class="btn"
			@click="handleSubmitComment">提交</button>
		</view>

	</view>
</template>

<script>
	import uniTab from '@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue'
	import articleApi from "@/api/article.js"
	export default {
		components: {
			uniTab
		},
		data() {
			return {
				arr: "<h1>123</h1>",
				articleId: "", // 文章id
				articleDetail: {}, // 文章详情数据
				commentList: [], // 评论列表
				content: "", // 发布的评论
				disabled: true, // 按钮的状态
			};
		},
		onLoad(options) {
			this.articleId = options.id
			this.getArticleList()
			this.getCommentList()
		},
		methods: {
			// 获取文章详情 
			async getArticleList() {
				let {code,data} = await articleApi.getArticleList(this.articleId)
				data.htmlContent = data.htmlContent.replace(
					"/<img/ig",
					'<img style="width:100%; height: auto;"'
				);
				uni.setNavigationBarTitle({
					title: data.title,
				});
				if (code == 20000) {
					this.articleDetail = data
					console.log(this.articleDetail)
				}
			},

			// 获取评论数据 
			async getCommentList() {
				try {
					let {code,data} = await articleApi.getCommentList(this.articleId)
					console.log(code, data)
					if (code == 20000) {
						this.commentList = data
						console.log(this.commentList)
					}
				} catch (e) {
					console.log(e)
				}
			},
			handleWatchValue() {
				if (this.content !== "") {
					this.disabled = false;
				}
			},
			async handleSubmitComment() {
				if (this.disabled) return;
				if (!this.content) return;
				uni.showLoading({
					title: "提交中",
					mask: true
				});

				if (!this.$store.getters.hasLogin) {
					this.navTo("/pages/auth/login");
					return;
				}
				try {
					const data = {
						articleId: this.articleId,
						content: this.content.trim(),
					};
					let {code} = await articleApi.submitComment(data)
	
					if (code == 20000) {
						this.getCommentList();
						uni.hideLoading();
						this.$util.msg("评论成功", {
							icon: "success"
						});
						this.content = "";
					} else {
						uni.hideLoading();
						this.$util.msg("评论失败，请重试!");
					}
				} catch (e) {
					console.log(e)
				}
			}
		}

	}
</script>

<style lang="scss">
	.details-box {}

	.tabList {
		padding: 20rpx;

		.tag-view {
			margin: 30rpx 10rpx 0 10rpx !important;
		}
	}

	.title {
		padding: 20rpx;

		.info {
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			margin: 15px 0;

			img {
				width: 80rpx;
				height: 80rpx;
				margin: 0 10rpx;
				border-radius: 50%;
			}

			.name {
				font-size: 15px;
				color: #303133;
			}

			.time {
				margin-left: 5px;
				font-size: 12px;
				color: #999;
			}

		}
	}

	.footer {
		background-color: #fff;
		margin-top: 20rpx;

		padding-bottom: 140rpx;

		.comment {
			.footer-header {
				font-size: 30rpx;
				color: #303133;
				font-weight: bold;
				padding: 25rpx;

				&::before {
					content: "";
					width: 0;
					height: 40rpx;
					margin-right: 25rpx;
					border-left: 6rpx solid $uni-color-primary;
				}
			}

			.comment-item {
				padding: 20rpx 25rpx;

				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50rpx;
					margin-right: 20rpx;
				}

				.right {
					width: calc(100% - 80rpx);
					font-size: 25rpx;
					color: #666;

					.content {
						font-size: 30rpx;
						color: $text-color-black;
						margin: 10rpx 0;
					}
				}
			}
		}
	}


	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		white-space: nowrap;
		padding: 20rpx;
		border-top: $i-underline;

		.textarea {
			font-size: 30rpx;
			padding: 15rpx 20rpx;
			width: 100%;
			height: 70rpx;
			background-color: #F8F9FB;
			border-radius: 30rpx;
		}

		.btn {
			padding: 0 20rpx;
			margin-left: 15rpx;
		}
	}
</style>
