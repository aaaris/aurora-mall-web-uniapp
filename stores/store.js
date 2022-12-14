import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			isLogin: uni.getStorageSync('token') === "" ? false : true,
			userInfo: {
				nicename: '',
				avatarUrl: ''
			},
			token: uni.getStorageSync('token')
		}
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {},
});
