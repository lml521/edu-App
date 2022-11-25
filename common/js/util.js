let _throttleRunning = false // 判断是否开启节流 开关

/** 
 * callback 是一个 函数方法  就是要执行 的函数
 * delay  延时的时间 默认 为500
 */

// 节流 
export const throttle = (callback, delay = 500) => {
	/**
	 * 判断节流开关是否正在使用 如果为true 则是正在运行  不能再次执行
	 * 为false  就是没有在执行  这个时候就可以执行    需要 把_throttleRunning 设置成true  这个时候再次点击 就不能执行
	 * 
	 *接着执行定时器  callback() 是 要执行的函数  执行玩之后 需要把 _throttleRunning 设置成 false 就是说 运行结束了   可以进行下次使用
	 */
	if (_throttleRunning) return
	_throttleRunning = true
	setTimeout(() => {
		callback()
		_throttleRunning = false
	}, delay)

}

// 封装toast提示
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}