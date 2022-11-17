<template>
	<!-- 轮播图 -->
	<view class="banner-box">
		<view class="bannerBg" 
		:style="{'background-image':`linear-gradient( ${bannerBackground || '#345dc2'} 50%, #F8F9FB)`}"></view>
		<swiper class="swiper" 
		:indicator-dots="true" 
		:autoplay="true" 
		:interval="3000"
		:duration="1000"
		indicator-color="rgba(255,255,255,.5)"
		indicator-active-color="#fff"
		circular
		@change="handelChangeSwiper"
		>
		<swiper-item class="swiper-item" 
		v-for="item in bannerList" :key="item.id">
			<img class="swiper-img" @click="navTo(`${item.advertUrl}`)"
			 :src="item.imageUrl" />
		</swiper-item>
		</swiper>


	</view>
</template>

<script>
	export default {
		name: "banner",
		// 接收父组件传递的数据
		props: {
			bannerList: { // 轮播图数据
				type: Array,
				default: () => [],
			}
		},
		data() {
			return {
				current:0,//当前轮播图的下标
				bannerBackground:"",//轮播图背景颜色
			};
		},
		
		methods:{
				// 改变轮播图
			handelChangeSwiper(e){
				this.current=e.detail.current
				this.bannerBackground=this.bannerList[this.current].background
			}
		}
	}
</script>

<style lang="scss">
	.banner-box {
		position: relative;
		padding-top: 120rpx;

		.bannerBg {
			position: absolute;
			width: 100%;
			top: 0;
			height: 470rpx;
			/* #ifdef APP-PLUS */
			 height: calc(var(--status-bar-height) + 470rpx);
			 /* #endif */
			 transition : 0.5s;
		}

			
        .swiper{
			width: 100%;
			height: 350rpx;

			.swiper-item { 
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.swiper-img { 
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
				}
			}
			
		}
	}
</style>
