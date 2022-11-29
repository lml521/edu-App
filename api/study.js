import request from '@/utils/request.js'
const  getStudyList=()=>{
	return request({
		url : '/course/course/study/list'
	})
}
export default{
	getStudyList
}