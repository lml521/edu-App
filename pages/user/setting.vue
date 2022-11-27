<template>
	
		<view>
				<!-- 设置 -->
				<userList 
				:list="list" 
				@setWifiPlay="setWifiPlay" 
				@setWifiDownload="setWifiDownload"
				@setAutoPlay="setAutoPlay"
				@clearStorage="clearStorage"></userList>
			</view>
	
</template>
<script>
import list from '@/config/setting-list-bar.js'//展示数据
	import userList from '@/pages/user/components/userList.vue'
	export default {
		components:{
			userList
		},
		data() {
			return {
				list:list()
			};
		},
		methods:{
			
			fn(data,key){
				let checked=!data.checked
				this.$set(data,'checked',checked)
				uni.setStorageSync(key,checked)
			},
			
			// 允许非WIFI网络播放
			setWifiPlay(data){
				console.log('允许非WIFI网络播放',data)
				this.fn(data,'wifi-play')
			},
			// 允许非WIFI网络缓存
			setWifiDownload(data){
				console.log('允许非WIFI网络缓存')
				this.fn(data,'wifi-download')
			},
			// 视频自动连续播放
			setAutoPlay(data){
				console.log('视频自动连续播放')
				this.fn(data,'auto-play')
			},
			// 视频自动连续播放
			clearStorage(obj){

				uni.showModal({
					title: '您确定清除应用缓存吗?',
						content: '(该操作不会删除缓存课程)',
						success:(res)=>{
							if (res.confirm) {
								uni.clearStorageSync()
								console.log('用户点击确定');
								this.$set(obj,'text','0KB')
								this.$util.msg("清除成功")
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