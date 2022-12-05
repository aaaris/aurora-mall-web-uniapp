// api统一管理

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue) => {
	let vm = Vue.config.globalProperties

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		// wx用户登录接口
		login: (params = {}) => vm.$u.get('/user/login', params),
		// 购物车获取购物项
		cart: {
			getCartItems: (params = {}) => vm.$u.get('/cart/cartItem', params)

		}
	};
}

export default {
	install
}
