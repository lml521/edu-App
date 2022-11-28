<template>
	<view>
		<!-- 	个人信息 -->
		<userList :list="list"></userList>
		<button style="background-color: #fff;" @click="logout">退出</button>
	</view>
</template>

<script>
	import userList from '@/pages/user/components/userList.vue'
	import list from '@/config/user-list-bar.js'
	import systemApi from '@/api/system.js'
	export default {
		components: {
			userList
		},

		data() {
			return {
				list: list()
			};
		},
		onLoad() {
			this.toPage()
		},
		onShow() {
			this.list=list()
		},
		methods: {
			logout() {
				uni.showModal({
					title: '确定退出登录?',
					content: '退出后不会删除任何历史数据',
					success: async (res) => {
						if (res.confirm) {
							try {
								let {code} = await systemApi.getLogout(this.$store.state.accessToken)
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
			}
		}
	}
</script>

<style lang="scss">

</style>
