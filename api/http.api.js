// api统一管理

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue) => {
	let vm = Vue.config.globalProperties

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		// wx用户登录接口
		login: (params = {}) => vm.$u.post('/user/login', params),
		// 购物车获取购物项
		cart: {
			getCartItems: (params = {}) => vm.$u.get('/cart/cartItem', params),
			getCount: (params = {}) => vm.$u.get('/cart/count', parmas),
			addItem: (params = {}) => vm.$u.post('/cart/add', parmas),
			deleteItem: (params = {}) => vm.$u.post('/cart/delete', parmas),
			updateItemCount: (params = {}) => vm.$u.post('/cart/updateItemCount', params)
		},
		prod: {
			search: (params = {}) => vm.$u.get('/product/getProdList', params),
			getDetail: (params = {}) => vm.$u.get('/product/details', params),
		},
		order: {
			getOrderList: (params = {}) => vm.$u.get('/order/getOrderList', params),
			updateStat: (params = {}) => vm.$u.post('/order/updateStat', params),
			createOrder: (params = {}) => vm.$u.post('/order/add', params),
		}
	};
}

export default {
	install
}
