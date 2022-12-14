// common/http.interceptor.js

// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.config.globalProperties.$u.http.setConfig({
		// 本地环境
		// baseUrl: 'http://172.30.206.89:8201/mall-admin', // 请求的本域名
		// 测试mock环境
		baseUrl: 'https://mock.apifox.cn/m1/1830376-0-default',
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.config.globalProperties.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		const token = uni.getStorageSync('token');
		// 如果没token,也不是跳转到登录页,提示登录
		if (token == "" && config.url !== '/user/login') {
			uni.showToast({
				title: '请先登录',
				icon: 'error'
			});
			setTimeout(() => {
				Vue.config.globalProperties.$u.route('/pages/user/login')
			}, 1500)
			return false;
		}
		config.header.token = token;
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if (config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.config.globalProperties.$u.http.interceptor.response = async (res) => {
		if (res.code == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if (res.code == 201) {
			// 返回201状态码，表示token过期
			// 尝试更新token,访问refreshtoken接口
			const {
				data: res
			} = await uni.request({
				url: Vue.config.globalProperties.$u.http.config.baseUrl +
					'/mall-common/jwt/refreshToken',
				method: 'get',
			})
			if (res.code == 200) {
				// 如果返回200，说明更新成功
				console.log("reflushToken success")
				// 更新pinia中存储的token信息
				uni.setStorageSync('token', JSON.stringify({
					token: res.data,
				}));
				// 重新发送业务请求
				let obj = Vue.config.globalProperties.$u.http.options;
				const {
					data: res3
				} = await uni.request(JSON.parse(JSON.stringify(obj)))
				// 返回请求结果给用户 
				return res3.data
			} else {
				//如果返回其他，说明reflushToken也过期，则跳转登录
				uni.showToast({
					title: '验证失败，请重新登录',
					icon: 'error'
				})
				setTimeout(() => {
					// 此为uView的方法，详见路由相关文档
					Vue.config.globalProperties.$u.route('/pages/user/login')
				}, 1500)
				return false;
			}
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}
