<template>
	<view>
		<!-- 嵌入搜索框的头部导航 -->
		<u-navbar :border-bottom="false">
			<view style="padding-left: 10rpx;">
				<u-search v-model="keyword" :actionStyle="searchBtnStyle" @search="searchSubmit" @custom="searchSubmit">
				</u-search>
			</view>
		</u-navbar>
		<view>
			<view class="page-top">
				<!-- 商品信息 -->
				<view class="shop-info">
					<image :src="shop.shopUrl" style="height: 60rpx; width:60rpx;border-radius: 50%; flex"
						mode="aspectFill">
					</image>&nbsp;
					<text class="shop-item-text">{{shop.title}}</text>
				</view>
				<!-- tab选择栏 -->
				<view class="page-top-tab">
					<view class="page-top-tab-item" v-for="(item,index) in tabList" @click="change(index)">
						<text>{{item.name}}</text>
						<view class="page-top-tab-slide" v-if="current==index">
						</view>
					</view>
				</view>
			</view>
			<view v-if="current==0">
				<view class="page-body-top" :style="{top:navHeight}">
					<view @click="sort = 1">
						<text :style="(sort === 1 ? {color:'#fa3534'} : {})">
							推荐</text>
					</view>
					<view @click="sort = 2">
						<text :style="(sort === 2 ? {color:'#fa3534'} : {})">
							销量</text>
					</view>
					<view @click="sort = 3">
						<text :style="(sort ===3 ? {color:'#fa3534'} : {})">
							价格</text>
					</view>
					<view @click=" isAvailable=!isAvailable">
						<text :style="(isAvailable ? {color:'#fa3534'} : {})">
							仅看有货</text>
					</view>
				</view>
				<prodGrid></prodGrid>
			</view>
			<prodList v-if="current==1" :list="prodList" :isKill="true"></prodList>
			<prodList v-if="current==2" :list="prodList" :isKill="false"></prodList>
		</view>
	</view>
</template>

<script>
	import prodGrid from '@/components/prodGrid.vue'
	import prodList from '@/components/prodList.vue'
	export default {
		components: {
			prodList,
			prodGrid
		},
		data() {
			return {
				navHeight: "",
				keyword: "",
				searchBtnStyle: {
					backgroundColor: "#f15d07",
					color: "#fff",
					borderRadius: "10px",
					zIndex: "998",
					position: "relative",
					left: "-50px"
				},
				shop: {
					title: "Apple Store 官方旗舰店",
					shopUrl: "https://image.geihui.com/uploadfiles/shopimgs/201607/578c9a19c93fa.jpg",
				},
				tabList: [{
						name: "商品"
					},

					{
						name: "活动"
					},

					{
						name: "上新"
					}
				],
				seckillList: [{
						goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
						title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
						price: '348.58',
						date: "1668300000000",
						progress: 33
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
				prodList: [{
						goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
						title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
						price: '348.58',
						date: "1668300000000",
						progress: 33
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
				current: 0,
				sort: 1,
				isAvailable: false
			};
		},
		onLoad() {
			let custom = wx.getMenuButtonBoundingClientRect()
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2
			this.navHeight = navigationBarHeight + statusBarHeight + "px"
		},
		methods: {
			searchSubmit() {
				uni.navigateTo({
					url: "/pages/search/search?keyword=" + this.keyword
				})
			},
			change(idx) {
				this.current = idx;
			}
		}
	}
</script>

<style lang="scss">
	// 店铺页头部
	.page-top {
		background: linear-gradient(to right, #00baad 0%, #7948ea 95%);
		display: flex;
		flex-direction: column;
		color: #fff;
	}

	// 店铺信息
	.shop-info {
		display: flex;
		padding: 30rpx 30rpx 0;
		align-items: center;

		image {
			margin-right: 30rpx;
		}
	}

	// 店铺页tab栏
	.page-top-tab {
		display: flex;
		justify-content: space-around;

		.page-top-tab-item {
			display: flex;
			flex-direction: column;
			padding: 30rpx;
			align-items: center;
		}

		// tab 底部显示条
		.page-top-tab-slide {
			width: 50rpx;
			height: 7rpx;
			background-color: #fff;
			border-radius: 15px;
			margin-top: 10rpx;
		}
	}

	.page-body-top {
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1rpx solid #e4e7ed;
		position: sticky;
		position: -webkit-sticky;
		z-index: 999;
		background-color: #fff;

		.page-body-top-item {}

		.page-body-top-item:hover {
			color: #fa3534;
		}
	}
</style>
