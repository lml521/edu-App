// 详情页面 
import request from '@/utils/request.js'

const courseList =()=>{
	return request({
		url:"/course/api/course/null",
		method: "GET",
	})
}


// 章节数据
const chapterList =()=>{
	return request({
		url:"/course/api/chapter/section/list/null",
		method: "GET",
	})
}

// /course/api/comment/list/null
// 评论 数据
const commentList =()=>{
	return request({
		url:"/course/api/comment/list/null",
		method: "GET",
	})
}

export default{
	courseList,
	chapterList,
	commentList,
}