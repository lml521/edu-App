<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 全局样式 */
	@import url('common/css/common.css');

	/* 字体图标样式表 */
	@import url("~@/static/icon/iconfont.css");
	
	
	
	/* #ifndef APP-NVUE */
		/* 导入字体彩色图标 */
		@import url("~@/static/icon/iconfont-app-icon.css");
		/* #endif */
	
	
	
	/*
		 微信小程序开发工具上，不支持网络链接，只支持本地方式
		 打包上线时，只支持在线方式
		 */
	/* @import url("https://at.alicdn.com/t/font_2116121_4hwc792r6yl.css");*/
</style>
