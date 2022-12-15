<!-- 该组件用于展示自定义的底部导航栏 -->
<template>
	<u-tabbar v-model="tabIdx" :list="tabList"></u-tabbar>
</template>


<script>
	import {
		mapStores
	} from 'pinia'
	import {
		useUserStore
	} from '@/stores/store'
	export default {
		data() {
			return {
				tabIdx: 0,
				tabList: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/index/index'
					},
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '分类',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/index/category'
					}, {
						iconPath: "shopping-cart",
						selectedIconPath: "shopping-cart-fill",
						text: '购物车',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath: '/pages/index/cart'
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/user/user'
					}
				]
			}
		},
		computed: {
			tabList() {
				let list = [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/index/index'
					},
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '分类',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/index/category'
					}, {
						iconPath: "shopping-cart",
						selectedIconPath: "shopping-cart-fill",
						text: '购物车',
						count: this.userStore.totalCount,
						isDot: false,
						customIcon: false,
						pagePath: '/pages/index/cart'
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/user/user'
					}
				]
				return list;
			},
			// 允许访问 this.userStore
			...mapStores(useUserStore),
		},
	}
</script>

<style>
</style>
