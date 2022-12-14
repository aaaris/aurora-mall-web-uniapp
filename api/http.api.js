// api统一管理

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue) => {
	let vm = Vue.config.globalProperties

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		// wx用户登录接口
		login: (params = {}) => vm.$u.post('/user/login', params),
		cart: {
			// 获取购物车购物项
			getCartItems: (params = {}) => vm.$u.get('/cart/cartItem', params),
			// 获取购物车中商品项总数
			getCount: (params = {}) => vm.$u.get('/cart/count', params),
			// 商品加入购物车
			addItem: (params = {}) => vm.$u.post('/cart/add', params),
			// 删除购物车中的购物项
			deleteItem: (params = {}) => vm.$u.post('/cart/delete', params),
			// 更新购物项的商品数量
			updateItemCount: (params = {}) => vm.$u.post('/cart/updateItemCount', params)
		},
		prod: {
			// 搜索商品
			search: (params = {}) => vm.$u.get('/product/getProdList', params),
			// 获取商品详情
			getDetail: (params = {}) => vm.$u.get('/product/details', params),
		},
		order: {
			// 获取订单列表
			getOrderList: (params = {}) => vm.$u.get('/order/getOrderList', params),
			// 更新订单状态
			updateStat: (params = {}) => vm.$u.post('/order/updateStat', params),
			// 创建订单
			createOrder: (params = {}) => vm.$u.post('/order/add', params),
		}
	};
}

export default {
	install
}
