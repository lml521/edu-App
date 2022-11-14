export default { 
	data(){
		return {
			
		}
	},
	
	methods:{
		// 跳转 
		navTo(url,options={}){
			console.log(124)
			if(!url) return 
			if(options.login){
				uni.navigateTo({
					url:"/pages/auth/login"
				})
			}
			
			uni.navigateTo({
				url
			})
			
			
		},
		
		// 返回上一级
		navBack(delta=1){
			uni.navigateBack({delta})
		}
		
	}
}