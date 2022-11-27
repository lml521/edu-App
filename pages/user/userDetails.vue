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
	export default {
		components: {
			userList
		},

		data() {
			return {
				list: list()
			};
		},
		methods: {
			logout() {
				uni.showModal({
					title: '确定退出登录?',
					content: '退出后不会删除任何历史数据',
					success:(res)=>{
						if (res.confirm) {
							console.log('用户点击确定');
							this.$store.commit("logout")
							this.navBack()

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
