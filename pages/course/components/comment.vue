<template>
	<!-- 五星评价组件 -->
	<!-- catchtouchmove="true" 微信小程序禁止滑动 -->
	<view v-show="isShow" @click="show" class="mask" catchtouchmove="true" @touchmove.stop.prevent="()=>{}">
		<view  class="course-comment center column " @click.stop="()=>{}">
			<uni-rate activeColor="#0c7afe" :size="22" v-model="comment.score"
			 @change="changeValue"></uni-rate>
			<view class="title">
				{{descArr[comment.score-1]}}
			</view>
			<view class="evaluate center">
				<textarea placeholder="请输入评价内容......" class="textarea" 
				@input="changeContent" v-model="comment.content"></textarea>
				<view class="submit" @click="handelSubmit">
					提交
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		props: {
				comment: {
					type: Object,
					default: () => ({
						userId: 1, // 当前用户id
						nickName: "x涛",
						userImage: "xx.jpg",
						content: '', // 评论内容
						score: 5 // 评分值
					})
				},
				descArr: { // 每个评分对象中文说明
					type: Array,
					default: () => [
						'极差,课程很糟糕，我要吐槽。',
						'差,我对课程不满意。',
						'中评,课程一般。',
						'良好,课程还可以。',
						'推荐,课程非常棒。',
					]
				}
		},
		data() {
			return {
				isShow: false,
				
			};
		},
		methods:{
			// 控制 评价弹窗显示隐藏 
			show(){
				this.isShow=!this.isShow
				this.comment.content=""
				this.comment.score=0
			},
			// 修改 评价内容 
			changeContent(e){
				this.comment.content=e.detail.value
				console.log(e.detail.value)
			},
			// 修改五星好评 
			changeValue(e){
				this.comment.score=e.value
				console.log(e.value)
			},
			// 提交评价 
			handelSubmit(){
				console.log(this.comment)
				this.comment.content = this.comment.content.trim()
				this.$emit('handelSubmit',this.comment)
				
			}
		}
	}
</script>

<style lang="scss">
.course-comment{

	background-color: #fff;
	position: absolute;
	left: 10%;
	right:10%;
	top: 40%;
	border-radius: 20rpx;
	padding: 20rpx;
	.title{
		margin: 20rpx 0;
	}
	.evaluate{
		
	 border-top: $i-underline;
	 width: 100%;
	 // 不换行
	 white-space: nowrap;
	 }
	 .textarea {
	 font-size: 30rpx;
	 padding: 10rpx;
	 width: 100%;
	 height: 100rpx;
	 background-color: #F8F9FB;
	 border-radius: 0 0 0 16rpx;
	 }
	 .submit{
		 color:$text-color-blue ;
	 }
	
	
}

</style>
