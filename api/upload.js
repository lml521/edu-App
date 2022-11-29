import upload from "@/utils/upload.js"

const uploadImg=(file)=>{
		return upload({url : '/article/file/upload', file})
}

export default{
	uploadImg
}