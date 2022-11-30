<template>
	<view class="content skeleton">
		<!-- 头部导航栏 -->
		<u-skeleton :loading="isLoading" :animation="true" elColor="#f3f4f5"></u-skeleton>
		<u-navbar :background="{
		background: 'linear-gradient(to right, #00baad 0%, #7948ea 95%)'}" :is-back="false" :border-bottom="false">
			<view style="padding-left: 40rpx; ">
				<u-icon name="level" color="#fff">
				</u-icon> &nbsp;&nbsp;
				<text style="color: #fff;">极光商城</text>
			</view>
		</u-navbar>
		<!-- 轮播图和搜索框 -->
		<view class="top">
			<!-- 搜索框 -->
			<view class="u-skeleton-fillet" style="margin: 0 30rpx 50rpx;">
				<u-search v-model="keyword" :showAction="false" :disabled="true" @click="gotoSearch"></u-search>
			</view>
			<!-- 高点击商品轮播图 -->
			<view class="u-skeleton-fillet u-m-l-30 u-m-r-30">
				<u-swiper :list="swiperImgList" indicatorMode="line" circular :loading="isLoading" click="swiperClick">
				</u-swiper>
			</view>
		</view>
		<!-- 分类轮播菜单 -->
		<view class="categoryMenu u-skeleton-fillet">
			<swiper style="width:100%;height:450rpx; margin-top:30rpx" @change="swiperChange">
				<swiper-item>
					<u-grid :col="5" @click="click" hover-class="hover-class" :border="false">
						<u-grid-item @click="gotoCategory(index)" v-for="(item, index) in categoryList.slice(0,10)"
							:index="index" :key="index">
							<image :src="item.imgUrl" mode="aspectFill" class="u-skeleton-circle" style="height: 100rpx; width: 100rpx;"></image>
							<text class="grid-text">{{ item.name }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="5" @click="click" hover-class="hover-class" :border="false">
						<u-grid-item @click="gotoCategory(index + 10)" v-for="(item, index) in categoryList.slice(10,)" :index="index + 10" :key="index">
							<image :src="item.imgUrl" mode="aspectFill" class="u-skeleton-circle" style="height: 100rpx; width: 100rpx;"></image>
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
		<view class="killBar u-skeleton-fillet">
			<text style="font-size: 16px; font-weight: bold;">秒杀专区</text>
			<view style="height: 10rpx;margin: 20rpx; background-color: #fc141d;"></view>
			<u-swiper :list="killItemlist" :effect3d="true" mode="round" @click="gotoSeckill"></u-swiper>
		</view>
		<!-- 最热商品 -->
		<view class="itemShowBar u-skeleton-fillet">
			<text style="font-size: 16px; font-weight: bold;">最热商品</text>
			<view style="height: 10rpx;margin: 20rpx; background-color: #fc141d;"></view>
			<prodGrid :list="prodList"></prodGrid>
		</view>
		<u-back-top :scroll-top="scrollTop" top="400"></u-back-top>
		<navBar></navBar>
	</view>
</template>

<script>
	import prodGrid from '@/components/prodGrid.vue'
	import navBar from '@/components/navBar.vue'
	export default {
		components: {
			prodGrid,
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
						"name": "女装",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg"
					},
					{
						"name": "美食",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/2/1.jpg"
					},
					{
						"name": "美妆",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/3/1.jpg"
					},
					{
						"name": "居家日用",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/4/1.jpg"
					},
					{
						"name": "男装",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/5/1.jpg"
					},
					{
						"name": "鞋品",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/6/1.jpg"
					},
					{
						"name": "数码家电",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/7/1.jpg"
					},
					{
						"name": "母婴",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/8/1.jpg"
					},
					{
						"name": "箱包",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/9/1.jpg"
					},
					{
						"name": "内衣",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/10/1.jpg"
					},
					{
						"name": "文娱车品",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/11/1.jpg"
					},
					{
						"name": "配饰",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/12/1.jpg"
					},
					{
						"name": "家装家纺",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/13/1.jpg"
					},
					{
						"name": "户外运动",
						"imgUrl": "https://cdn.uviewui.com/uview/common/classify/14/1.jpg"
					}
				],
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
				prodList: [{
						goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
						title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
						price: '348.58',
						date: "1668300000000",
						progress: 33, 
					}, {
						goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
						title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
						type: '4K，广色域',
						deliveryTime: '珍藏10年好酒',
						price: '1543',
						date: "1668300000000",
						progress: 33
					},
					{
						goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
						title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
						type: '一打',
						deliveryTime: '口感好',
						price: '120',
						date: "1768900000000",
						progress: 0
					}, {
						goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
						title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
						type: '容量大，速冻',
						deliveryTime: '保质5年',
						price: '2354',
						date: "1768900000000",
						progress: 0
					}
				],
			}
		},
		onLoad() {
			
			setTimeout(() => {
				this.isLoading = false;
				this.isSwiper = true;
			}, 2000) 
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
			gotoSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			gotoSeckill(idx) {
				uni.navigateTo({
					url: "/pages/sale/seckill"
				})
			},
			gotoCategory(idx) {
				uni.switchTab({
					url: "/pages/index/category",
					success() { 
						uni.$emit('gotoCategory', {
							index: idx
						})
					}
				})
			}
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
	.top {
		/* padding-top: 30rpx; */
		margin-top: -1px;
		width: 100%;
		padding: 10rpx 10rpx 30rpx;
		display: flex;
		flex-direction: column; 
		background: linear-gradient(to right, #00baad 0%, #7948ea 95%);
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
