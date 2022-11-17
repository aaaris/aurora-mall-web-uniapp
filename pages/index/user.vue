<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar :background="{backgroundColor:'#fe5e48'}" :border-bottom="false" title="个人中心" title-color="#fff"
			back-icon-color="#fff"></u-navbar>
		<!-- 用户信息 -->
		<view class="user-info">
			<!-- 用户头像框 -->
			<image class="user-avator" lazy-load
				src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
				alt=""></image>
			<!-- 用户文本信息 -->
			<view class="user-info-text">
				<text>uu</text>
			</view>
		</view>
		<!-- 订单栏 -->
		<view class="order-bar">
			<!-- 订单栏标题 -->
			<view class="order-bar-title">
				<text style="font-size: 16px;">订单</text>
				<u-icon @click="goToOrderStatus(0)" name="arrow-right" label="全部订单" labelPos="left" color="#a7a7a7"
					size="20"></u-icon>
			</view>
			<!-- 订单状态栏 -->
			<view class="order-bar-items">
				<view class="order-bar-item" v-for="(item,index) in orderStatusList" :key="index">
					<u-icon custom-prefix="custom-icon" :name="item.iconName" size="45" color="#a7a7a7"
						@click="goToOrderStatus(index)"></u-icon>
					<text style="display: block;">{{item.desc}}</text>
				</view>
			</view>
		</view>
		<!-- 设置选项列表 -->
		<view class="setting-items">
			<view class="setting-item" @click="goToSetting(index)" v-for="(item,index) in settingItemList" :key="index">
				<text style="font-size: 16px;margin-right: 0rpx;">{{item.title}}</text>
				<u-icon name="arrow-right" color="#a7a7a7" size="20"></u-icon>
			</view>
		</view>
		<!-- 底部导航 -->
		<navBar></navBar>
	</view>
</template>

<script>
	import navBar from '@/components/navBar.vue'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				orderStatusList: [{
					iconName: "custom-icon-wallet",
					desc: "待付款"
				}, {            
					iconName: "custom-icon-product-fill",
					desc: "待发货"
				}, {            
					iconName: "custom-icon-kuaidi",
					desc: "待收货"
				}],
				settingItemList: [{
						title: "我的收货地址"
					},
					{
						title: "关于我们"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转订单页对应状态tab
			goToOrderStatus(idx) {
				console.log(`go to order status page ${idx}`)
				uni.navigateTo({
					url:"/pages/order/order"
				})
			},
			// 跳转设置页
			goToSetting(idx) {
				console.log(`go to setting page ${idx}`)
				if (idx === 0) { 
					uni.navigateTo({
						url:"/pages/addressbook/addressBook"
					})
				}else if (idx === 1) {
					uni.navigateTo({
						url:"/pages/index/about"
					})
				}
			}
		}
	}
</script>
<style>
	@import "@/static/iconfont.css";

	/* 页面背景色设置 */
	page {
		background-color: #f7f7f7;
	}

	/* 用户信息框 */
	.user-info {
		margin: -1rpx 0 50rpx;
		padding: 75rpx 0 0 75rpx;
		background-color: #fe5e48;
		width: 100%;
		height: 350rpx;
		display: flex;
	}

	/* 用户头像框 */
	.user-avator {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		border-color: rgba(255, 255, 255, 0.5);
		border-width: 4px;
		border-style: solid;
	}

	/* 用户信息文本 */
	.user-info-text {
		margin-left: 30rpx;
		padding-top: 20rpx;
		color: #fff;
	}

	/* 订单栏 */
	.order-bar {
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-items: center;
		background-color: #fff;
		margin: 0 30rpx;
		padding: 30rpx 20rpx;
	}

	.order-bar-title {
		display: flex;
		justify-content: space-between;
	}

	/* 订单栏内状态栏 */
	.order-bar-items {
		margin-top: 50rpx;
		display: flex;
		align-items: center;
	}

	/* 订单状态栏内的状态项 */
	.order-bar-item {
		height: 100rpx;
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 设置选项列表 */
	.setting-items {
		background-color: #fff;
		border-radius: 20rpx;
		margin: 30rpx 30rpx 0;
	}

	.setting-item:last-child {
		margin-bottom: 0rpx;
		border-bottom: 0
	}

	.setting-item {
		padding: 30rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.setting-item:active {
		background-color: #f7f7f7;
	}
</style>
