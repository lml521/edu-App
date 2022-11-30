import request from '@/utils/request.js'

// 获取详情页面 
const getArticleList =(id)=>{
	return request({
		url:`/article/api/article/${id}`
	})
}

// 获取 评论 数据
const getCommentList =(id)=>{
	return  request({
		url:`/article/api/comment/list/${id}`
	})
}

// 提交评论 
const submitComment=(data)=>{
	return request({
		url:"/article/comment",
		method:"POST",
		data
	})
}

export default {
	getArticleList,
	getCommentList,
	submitComment
}