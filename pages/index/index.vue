<template>
	<view class="content skeleton">
		<!-- 头部导航栏 -->
		<!-- <u-skeleton :loading="isLoading" :animation="true" bgColor="#fff"></u-skeleton> -->
		<u-navbar :background="{backgroundColor:'#fc141d'}" :is-back="false" :border-bottom="false">
			<view style="padding-left: 40rpx;">
				<u-icon name="level" color="#fff">
				</u-icon> &nbsp;&nbsp;
				<text style="color: #fff;">极光商城</text>
			</view>
		</u-navbar>
		<!-- 轮播图和搜索框 -->
		<view class="body">
			<!-- 搜索框 -->
			<view style="margin: 0 30rpx 50rpx;">
				<u-search v-model="keyword" :showAction="false"></u-search>
			</view>
			<!-- 高点击商品轮播图 -->
			<view style="margin: 0 30rpx;">
				<u-swiper :list="swiperImgList" indicatorMode="line" circular :loading="isLoading" click="swiperClick">
				</u-swiper>
			</view>
		</view>
		<!-- 分类轮播菜单 -->
		<view class="categoryMenu">
			<swiper style="width:100%;height:300rpx; margin-top:30rpx" @change="swiperChange">
				<swiper-item>
					<u-grid :col="5" @click="click" hover-class="hover-class" :border="false">
						<u-grid-item v-for="(item, index) in categoryList.slice(0,10)" :index="index" :key="index">
							<u-icon :name="item.icon" :size="46"></u-icon>
							<text class="grid-text">{{ item.name }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="5" @click="click" hover-class="hover-class">
						<u-grid-item v-for="(item, index) in categoryList.slice(10,)" :index="index + 10" :key="index">
							<u-icon :name="item.icon" :size="46"></u-icon>
							<text class="grid-text">{{ item.name }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>
			<!-- 轮播图指示器 -->
			<view class="indicator-dots" v-if="isSwiper">
				<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
				</view>
				<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
				</view>
			</view>
		</view>
		<!-- 秒杀专区 -->
		<view class="killBar">
			<text style="font-size: 16px; font-weight: bold;">秒杀专区</text>
			<view style="height: 10rpx;margin: 20rpx; background-color: #fc141d;"></view>
			<u-swiper :list="killItemlist" :effect3d="true" mode="round"></u-swiper>
		</view>
		<view class="itemShowBar">
			<text style="font-size: 16px; font-weight: bold;">最热商品</text>
			<view style="height: 10rpx;margin: 20rpx; background-color: #fc141d;"></view>
			<itemShowList></itemShowList>
		</view>
		<u-back-top :scroll-top="scrollTop" top="400"></u-back-top>
		<navBar></navBar>
	</view>
</template>

<script>
	import itemShowList from '@/components/itemShowList.vue'
	import navBar from '@/components/navBar.vue'
	export default {
		components: {
			itemShowList,
			navBar
		},
		data() {
			return {
				scrollTop: 0,
				isSwiper: false,
				isLoading: true,
				title: 'Hello',
				keyword: '',
				swiperImgList: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				current: 0,
				categoryList: [{
					icon: 'integral',
					imgSrc: '',
					name: '女装'
				}, {
					icon: 'kefu-ermai',
					imgSrc: '',
					name: '男装'
				}, {
					icon: 'coupon',
					imgSrc: '',
					name: '鞋包'
				}, {
					icon: 'gift',
					imgSrc: '',
					name: '手表配置'
				}, {
					icon: 'scan',
					imgSrc: '',
					name: '内衣'
				}, {
					icon: 'pause-circle',
					imgSrc: '',
					name: '运动户外'
				}, {
					icon: 'wifi',
					imgSrc: '',
					name: '童装童鞋'
				}, {
					icon: 'email',
					imgSrc: '',
					name: '面部护肤'
				}, {
					icon: 'list',
					imgSrc: '',
					name: '电子产品'
				}, {
					icon: 'integral',
					imgSrc: '',
					name: '医疗用品'
				}],
				killItemlist: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				itemList: [{
						imgSrc: "",
						desc: "",
						price: "",
					},
					{
						imgSrc: "xxx",
						desc: "",
						price: "",
					}
				]
			}
		},
		onLoad() {
			// setTimeout(() => {
			// 	this.isLoading = false;
			// 	this.isSwiper = true;
			// }, 2000)
			this.isLoading = false;
			this.isSwiper = true;
		},

		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			swiperClick() {},

			swiperChange(e) {
				this.current = e.detail.current;
			},
			click(index) {
				console.log(`click ${index}`)
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 主页面
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	// 轮播图和搜索框
	.body {
		/* padding-top: 30rpx; */
		width: 100%;
		padding: 10rpx 10rpx 30rpx;
		display: flex;
		flex-direction: column;
		background-color: #fc141d;
	}

	// 分类轮播菜单 
	.categoryMenu {
		width: 100%;
		margin: 10rpx 0 50rpx;
	}

	.swiper {
		width: 100%;
		margin-top: 30rpx;
	}

	// 分类宫格
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	// 分类轮播菜单指示器
	.indicator-dots {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// 分类轮播菜单指示器 点
	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}

	// 指向器 当前点样式
	.indicator-dots-active {
		background-color: $u-type-primary;
		width: 30px;
		border-radius: 4px;
	}

	// 秒杀专区
	.killBar {
		width: 100%;
		text-align: center;
		margin-bottom: 40rpx;
	}

	.itemShowBar {
		width: 100%;
		text-align: center;
	}
</style>
