// 详情页面 
import request from '@/utils/request.js'

const courseList =(id)=>{
	return request({
		url:`/course/api/course/${id}`,
		method: "GET",
	})
}


// 章节数据
const chapterList =(id)=>{
	return request({
		url:`/course/api/chapter/section/list/${id}`,
		method: "GET",
	})
}

// /course/api/comment/list/null
// 评论 数据
const commentList =(id)=>{
	return request({
		url:`/course/api/comment/list/${id}`,
		method: "GET",
	})
}

// 套餐数据 
// /course/api/group/list/null
const groupList =(id)=>{
	return request({
		url:`/course/api/group/list/${id}`,
		method: "GET",
	})
}

export default{
	courseList,
	chapterList,
	commentList,
	groupList,
}