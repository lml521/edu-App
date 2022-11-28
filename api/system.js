import request from '@/utils/request.js'
/**
 * 获取验证码
 * data:{
	mobile: "14444444444"
	templateCode: "MSM_1999123123"
 }
*/
const getAuthCode = (data) => {
	return request({
		url: "/system/sms/code",
		method: "POST",
		data
	})
}
/**
 * 登录
 * data：{
	mobile  手机号码
	code    验证码
} */

const getLogin = (data) => {
	return request({
		url: "/auth/login",
		method: "POST",
		data
	})
}

// 退出登录 
const getLogout=(accessToken)=>{
	return request({
		url:"/auth/logout",
		data:{accessToken}
	})
	
}

export default {
	getAuthCode,
	getLogin,
	getLogout
}
