<template>
	<view>
		<!-- 个人信息 -->
		<userList :list="list" @chooseImg="chooseImg" @editUsername="editUsername" @editMobile="editMobile"
			@editName="editName" @chooseSex="chooseSex"></userList>
		<button style="background-color: #fff;" @click="logout">退出</button>

		<view v-if="isUpdate" class="nickname row">
			<input type="text" v-model="nickname">
			<text @click="ChangeName">修改</text>

		</view>
	</view>
</template>

<script>
	import userList from '@/pages/user/components/userList.vue' //子组件
	import list from '@/config/user-list-bar.js' //展示数据
	import systemApi from '@/api/system.js' //页面接口
	import uploadApi from '@/api/upload.js' //修改头像api
	import {
		mapState
	} from "vuex"; //调取 vuex
	export default {
		components: {
			userList
		},

		data() {
			return {
				list: list(),
				isUpdate: false,
				nicknam: ""
			};
		},
		computed: {
			...mapState(["userInfo"]), //获取到用户信息
		},
		onLoad() {
			this.toPage()
		},
		onShow() {
			this.list = list()
		},
		methods: {
			// 返回按钮 
			onBackPress() {
				console.log(this.isUpdate)
				if (this.isUpdate) {
					this.isUpdate = false
					return true
				}
			},



			// 退出 
			logout() {
				uni.showModal({
					title: '确定退出登录?',
					content: '退出后不会删除任何历史数据',
					success: async (res) => {
						if (res.confirm) {
							try {
								let {
									code
								} = await systemApi.getLogout(this.$store.state.accessToken)
								if (code == 20000) {
									this.$store.commit("logout")
									setTimeout(() => {
										this.navBack()
									}, 300)
								}
							} catch (e) {
								console.log(e)
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			// 更换头像 
			chooseImg() {
				console.log("更换头像")
				uni.chooseImage({
					count: 1, //默认9
					success: async (res) => {
						console.log(res, 1)
						const file = res.tempFilePaths[0];
						uni.showLoading({
							title: "更换头像中",
							mask: true,
						});
						try {
							let response = await uploadApi.uploadImg(file)
							console.log(response)
							if (response.code == 20000) {
								console.log(123)
								this.userInfo.imageUrl = response.data;
								this.handleUpdataUserInfo()
							} else {
								uni.hideLoading();
							}
						} catch (e) {
							uni.hideLoading();
							console.log(e)
						}
					}
				});
			},
			// 修改 本地数据 
			async handleUpdataUserInfo() {
				let res = await systemApi.updateUserInfo(this.data)
				this.$store.commit("setToken", {
					userInfo: this.userInfo
				});
				this.list = list()
				uni.hideLoading();
			},



			// 修改用户名
			editUsername() {
				console.log("修改用户名")
				this.$util.msg("用户名不能被修改")
			},
			// 修改手机号码
			editMobile() {
				console.log("修改手机号码")
			},
			// 修改昵称 
			editName(data) {
				console.log("修改昵称")
				this.isUpdate = true
				this.nickname = data.text
			},
			// 提交修改姓名
			ChangeName() {
				console.log(this.nickname)
				this.userInfo.nickName = this.nickname
				this.$store.commit("setToken", {
					userInfo: this.userInfo
				});
				this.list = list()
				this.isUpdate = false
			},
			// 修改性别
			chooseSex() {
				console.log("修改性别")
				uni.showActionSheet({
					itemList: ['男', '女'],
					success: (res)=>{
						console.log(res.tapIndex);
						this.userInfo.sex = res.tapIndex
						this.$store.commit("setToken", {
							userInfo: this.userInfo
						});
						this.list = list()
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}


		}
	}
</script>

<style lang="scss">
	.nickname {
		position: fixed;
		background-color: #fff;
		left: 0;
		right: 0;
		top: var(--window-top);
		bottom: 0;
		z-index: 99;

		input {
			width: 650rpx;
			height: 90rpx;
			font-size: 35rpx;
			padding: 0 20rpx;
			background-color: #ffffff;
			border: $i-underline;
			margin: 0 10rpx;
		}

		text {
			z-index: 100;
			width: 100rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			color: $text-color-blue;
		}
	}
</style>
