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

// 评论 数据
const commentList =(id)=>{
	return request({
		url:`/course/api/comment/list/${id}`,
		method: "GET",
	})
}

// 套餐数据 
const groupList =(id)=>{
	return request({
		url:`/course/api/group/list/${id}`,
		method: "GET",
	})
}

// 获取已购买的 数据 
const getCourseBuyList =(id)=>{
	return request({
		url:`/course/course/buy/list/${id}`
	})
}

// 信息 
const getCourseDetail=(id)=>{
	return request({
		url:`/course/course/buy/list/${id}`
	})
}

export default{
	courseList,
	chapterList,
	commentList,
	groupList,
	getCourseBuyList
}