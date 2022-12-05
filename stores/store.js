import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			isLogin: uni.getStorageSync('tokenInfo') === '' ? false : true,
			userInfo: {
				id: uni.getStorageSync('userId'),
				nicename: '',
				avatarUrl: ''
			},
			tokenInfo: uni.getStorageSync('tokenInfo') === '' ? undefined : JSON.parse(
				uni.getStorageSync('tokenInfo')),
		}
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {},
});
