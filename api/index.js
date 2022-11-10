import request from '@/utils/request.js'

const getBannerList =()=>{
	return request({url:'/article/api/advert/show/1',method:"GET"})
}

export default{
	getBannerList
}