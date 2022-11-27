<template>
	<view class="box">
		<!-- 头部信息 -->
		<view class="header">
			<view class="header-content space-between center"
				@click="hasLogin ? navTo('/pages/user/userDetails') : navTo('/pages/auth/login')">
				<view class="left center">
					<img :src="userInfo.imageUrl || '../../static/logo.png'" />

					<view v-if="hasLogin" class="header-info column">
						<text class="nickname">{{userInfo.nickName}}</text>
						<text class="username">用户名：{{userInfo.username}}</text>
					</view>
					<view v-if="!hasLogin" class="header-info">请登录</view>
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
	
	<!-- 我的订单 -->
	<userList :list="list"></userList>
	
	
	</view>
</template>

<script>
	import {mapState,mapGetters} from "vuex";
		import userList from '@/pages/user/components/userList.vue'
	
		import list from '@/config/my-list-bar.js'
	export default {
		components:{
			userList,
		},
		data() {
			return {
		list:list()
			};
		},
		computed: {
			...mapState(["userInfo"]),
			...mapGetters(["hasLogin"]),
		},
	}
</script>

<style lang="scss">
	.box {
		.header {
			padding-top: 100rpx;
			background-color: #085ebc;

			.header-content {
				padding: 25px 19px;
				background-color: #fff;
				border-radius: 15px 15px 0 0;

				.left {
					img {
						width: 150rpx;
						height: 150rpx;
						border-radius: 60px;

					}

					.header-info {
						margin-left: 30rpx;
						font-weight: bold;
						font-size: 39rpx;

						.nickname {
							font-size: 39rpx;
							font-weight: 500;
						}

						.username {
							font-size: 33rpx;
							color: $uni-text-color-grey;
						}
					}
				}

			}
		}
	}
</style>
