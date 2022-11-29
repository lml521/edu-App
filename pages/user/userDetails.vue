<template>
	<view>
		<!-- 个人信息 -->
		<userList :list="list" @chooseImg="chooseImg" @editUsername="editUsername" @editMobile="editMobile"
			@editName="editName" @chooseSex="chooseSex"></userList>
		<button style="background-color: #fff;" @click="logout">退出</button>
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
				list: list()
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
				console.log(456)
				let res = await systemApi.updateUserInfo(this.data)
				console.log(res)
				console.log(this.userInfo)
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
			editName() {
				console.log("修改昵称")
				
			},
			// 修改性别
			chooseSex() {
				console.log("修改性别")
				
			}


		}
	}
</script>

<style lang="scss">

</style>
