import request from '@/utils/request.js'
// 轮播图 
const getBannerList = () => {
	return request({
		url: '/article/api/advert/show/1',
		method: "GET"
	})
}


// 分类模块 
const getNavList = () => {
	return request({
		url: '/article/api/category/label/list',
		method: "GET"
	})
}

//  数据
const getCourseList = (data) => {
	return request({
		url: '/course/api/course/search',
		method: "POST",
		data,
	})
}

// 文章模块 数据  
const getArticleList  =(data)=>{
	return request({
		url:"/article/api/article/search",
		method: "POST",
		data,
	})
}


export default {
	getBannerList,
	getNavList,
	getCourseList,
	getArticleList


}
