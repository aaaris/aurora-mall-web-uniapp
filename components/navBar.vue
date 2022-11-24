<!-- 该组件用于展示自定义的底部导航栏 -->
<template>
	<u-tabbar v-model="tabIdx" :list="tabList"></u-tabbar>
</template>


<script>
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
						count: 2,
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
						pagePath: '/pages/index/user'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			getCapsule() {
				//获取胶囊位置并改变顶部自定义导航栏的位置
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				console.log(menuButtonInfo, '胶囊top位置')
				//让自定义导航栏头部组件始终和胶囊对齐 做到兼容各手机型号
				this.top = menuButtonInfo.top + 'px';
			},
		}
	}
</script>

<style>
</style>
