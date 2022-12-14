import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			isLogin: uni.getStorageSync('token') === "" ? false : true,
			userInfo: {
				nicename: '',
				avatarUrl: '',
			},
			totalCount: 0,
			token: uni.getStorageSync('token')
		}
	},
	getters: {
		// async getCount() {
		// 	if (uni.getStorageSync('token') === "") {
		// 		return 0;
		// 	}
		// 	console.log("getCount")
		// 	const totalcount = await Vue.config.globalProperties.$u.api.cart.getCount()
		// 	return totalcount

		// }
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {

	},
});
