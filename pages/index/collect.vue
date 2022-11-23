<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar :border-bottom="false" title="我的收藏"></u-navbar>
		<view class="">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in prodList" :key="item.title"
				@click="deleteCollection" @open="openSwipe" :options="options">
				<view class="u-flex u-p-30 u-row-between" @click="gotoProd(item)">
					<image :src="item.goodsUrl" mode="aspectFill" class="product-item-image"></image>
					<view class="title-wrap">
						<text class="u-line-3">{{item.title}}</text>
						<view class="u-flex">
							<text style="color: #f11">￥&nbsp;{{item.price}}</text>
						</view>
					</view>
				</view>
			</u-swipe-action>
			<u-loadmore :status="loadStatu" bgColor="#f2f2f2" @loadmore="getOrderList"></u-loadmore>
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
				loadStatu: 'loadmore',
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
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad() {

		},
		onReachBottom() {
			console.log("loading...")
			this.loadStatu = "loading"
			setTimeout(() => {
				this.getOrderList();
			}, 1200);
		},
		methods: {
			getOrderList() {
				for (let i = 0; i < 3; i++) {
					let index = this.$u.random(0, this.prodList.length - 1)
					let data = JSON.parse(JSON.stringify(this.prodList[index]))
					this.prodList.push(data)
				}
				this.loadStatu = 'loadmore'
			},
			gotoProd(item) { 
				uni.navigateTo({
					url: "/pages/product/productDetail"
				})
			},
			deleteCollection(idx,opt) {
				console.log(`${this.options[opt].text} ${this.prodList[idx].title}`)
			},
			openSwipe() {

			}
		}
	}
</script>

<style lang="scss">
	.product-item-image {
		width: 200rpx;
		flex: 0 0 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
</style>
