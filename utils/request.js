import config from '@/config/index.js'

const request=(options)=>{
	return new Promise((resove,reject)=>{
		url.request({
			url: config.baseUrl+options.url,
			method:options.method || 'GET',
			header:{
				...options.header
			},
			data:options.data|| {},
			success: res => {
				if(res.data.code===20000){
					resove(res.data)
				}
			},
			fail: (error) => {
				reject(error)
			},

		})
		
	})
	
}