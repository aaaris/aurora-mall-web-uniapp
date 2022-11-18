<template>
	<view>
		<!-- 嵌入搜索框的头部导航 -->
		<u-navbar :border-bottom="false">
			<view style="padding-left: 10rpx;">
				<u-search v-model="keyword" :actionStyle="searchBtnStyle" @search="searchSubmit" @custom="searchSubmit">
				</u-search>
			</view>
		</u-navbar>
		<!-- tab选择区 -->
		<view class="wrap">
			<view>
				<u-tabs-swiper ref="uTabs" :list="tabList" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
				class="swiper-box">
				<!-- 所有商品 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view>
							<u-dropdown>
								<u-dropdown-item v-model="value1" title="综合" :options="options1"></u-dropdown-item>
								<u-dropdown-item v-model="value2" title="销量" :options="options2"></u-dropdown-item>
							</u-dropdown>
						</view>
						<view>
							<itemResultList :list="prodList.concat(prodList)" :isKill="false"></itemResultList>
						</view>
						<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<!-- 最新商品 -->
				<swiper-item class="swiper-item">
					<scroll-view style="height: 100%;width: 100%;" scroll-y @scrolltolower="onreachBottom">
						<u-sticky>
						</u-sticky>
						<view>
							<itemResultList :list="prodList.concat(prodList)" :isKill="false"></itemResultList>
						</view>
						<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>

					</scroll-view>
				</swiper-item>
				<!-- 店铺 -->
				<swiper-item class="swiper-item">
					<scroll-view style="height: 100%;width: 100%;" scroll-y @scrolltolower="onreachBottom">
						<u-sticky>
						</u-sticky>
						<view>
							<view class="shop-item" v-for="(item,index) in shopList.concat(shopList)" :key="index">
								<!-- 店铺图片和名称 -->
								<view class="shop-item-top">
									<view class="shop-item-title">
										<image :src="item.shopUrl"
											style="height: 60rpx; width:60rpx;border-radius: 50%;" mode="aspectFill">
										</image>&nbsp;
										<text class="shop-item-text">{{item.title}}</text>
									</view>
									<u-button type="error" shape="circle" size="mini" @click="gotoShop(item.id)">进店
									</u-button>
								</view>
								<!-- 店铺点击量最高前三个商品 -->
								<view class="shop-item-bottom">
									<image :src="item.prodList[0].goodsUrl" mode="aspectFill"></image>
									<image :src="item.prodList[1].goodsUrl" mode="aspectFill"></image>
									<image :src="item.prodList[2].goodsUrl" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<u-loadmore :status="loadStatus[2]" bgColor="#f2f2f2"></u-loadmore>

					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import itemResultList from "@/components/itemResultList.vue"
	export default {
		components: {
			itemResultList
		},
		data() {
			return {
				keyword: "",
				searchBtnStyle: {
					backgroundColor: "#f15d07",
					color: "#fff",
					borderRadius: "10px",
					zIndex: "998",
					position: "relative",
					left: "-50px"
				},
				tabList: [{
						name: '所有商品'
					},
					{
						name: '最新上市'
					},
					{
						name: '店铺'
					},
				],
				prodList: [{
						goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
						title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
						price: '348.58',
						date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
						progress: 33
					}, {
						goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
						title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
						type: '4K，广色域',
						deliveryTime: '珍藏10年好酒',
						price: '1543',
						date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
						progress: 33
					},
					{
						goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
						title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
						type: '一打',
						deliveryTime: '口感好',
						price: '120',
						date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
						progress: 33
					}, {
						goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
						title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
						type: '容量大，速冻',
						deliveryTime: '保质5年',
						price: '2354',
						date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
						progress: 33
					}
				],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				shopList: [{
						title: "Apple Store 官方旗舰店",
						shopUrl: "https://image.geihui.com/uploadfiles/shopimgs/201607/578c9a19c93fa.jpg",
						prodList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								price: '348.58',
								date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}, {
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}, {
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}
						],
					},
					{
						title: "Apple Store 官方旗舰店",
						shopUrl: "https://image.geihui.com/uploadfiles/shopimgs/201607/578c9a19c93fa.jpg",
						prodList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								price: '348.58',
								date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}, {
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}, {
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}
						],
					},
					{
						title: "Apple Store 官方旗舰店",
						shopUrl: "https://image.geihui.com/uploadfiles/shopimgs/201607/578c9a19c93fa.jpg",
						prodList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								price: '348.58',
								date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}, {
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								date: "Thu Nov 17 2022 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}, {
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								date: "Thu Nov 17 2023 13:02:26 GMT+0800 (中国标准时间)",
								progress: 33
							}
						],
					}
				], 
				value1: 1,
				value2: 1,
				options1: [{
						label: '默认排序',
						value: 1
					},
					{
						label: '价格升序',
						value: 2
					},
					{
						label: '价格降序',
						value: 3
					}
				],
				loadStatus: ['loadmore', 'loadmore', 'loadmore'],
				options2: [{
						label: '销量降序',
						value: 1
					},
					{
						label: '销量升序',
						value: 2
					},
				]
			};
		},
		onLoad(query) {
			if (query.keyword)
				this.keyword = query.keyword
		},
		methods: {
			searchSubmit(word) {
				console.log(word)
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						// this.getOrderList(this.current);
					}, 1200);
				}
			},
			gotoShop(id) {
				uni.navigateTo({
					url: "/pages/shop/shopDetail?id=" + id
				})
			},  
			getOrderList(idx){
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		// background-color: #f2f2f2;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.dropdown-menu-bar {
		display: flex;
		justify-content: space-around;
	}

	.shop-item {
		margin: 30rpx;
		display: flex;
		flex-direction: column;

		.shop-item-top {
			display: flex;
			justify-content: space-between;
			margin: 10rpx;

			.shop-item-title {
				display: flex;
				align-items: center;
			}
		}

		.shop-item-bottom {
			margin: 10rpx;
			display: flex;

			image {
				height: 200rpx;
				width: 200rpx;
				margin-left: 30rpx;
			}
		}
	}

	.swiper-item {
		height: 100%;
	}

	.swiper-box {
		flex: 1;
	}
</style>
