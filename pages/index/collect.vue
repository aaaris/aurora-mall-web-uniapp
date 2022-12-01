<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar :border-bottom="false" title="我的收藏"></u-navbar>
		<view class="">
			<u-swipe-action :index="index" v-for="(item, index) in prodList" :key="item.title" @click="deleteCollection"
				@open="openSwipe" :options="options">
				<!-- 商品条 -->
				<view class="product" @click="gotoProd(item)">
					<!-- 商品图片 -->
					<view class="left">
						<image :src="item.goodsUrl" style="height:200rpx; width:200rpx; border-radius: 10rpx;"
							mode="aspectFill"></image>
					</view>
					<!-- 商品描述区 -->
					<view class="right">
						<!-- 商品名 -->
						<view class='u-line-3'>
							<text>{{item.title}}</text>
						</view>
						<!-- 商品售价 -->
						<view class="bottom">
							<text style="color: #ff1d1d;"><text style="font-size: 10px;">￥</text>{{item.price}}</text>
						</view>
					</view>
				</view>
			</u-swipe-action>
			<u-loadmore :status="loadStatu" bgColor="#f2f2f2" @loadmore="getOrderList"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
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
				let obj = JSON.parse(JSON.stringify(item))
				uni.navigateTo({
					url: "/pages/product/productDetail",
					success: () => {
						obj.timestamp = 888888
						obj.isCollect = false
						obj.isKill = true
						obj.count = 1
						setTimeout(() => {
							uni.$emit('gotoProdDetail', obj)
						}, 500)
					}
				})
			},
			deleteCollection(idx, opt) {
				console.log(`${this.options[opt].text} ${this.prodList[idx].title}`)
				uni.showModal({
					title: '温馨提示', //提示标题
					content: '确定删除选中商品吗？', //提示内容 
					success: function(res) {
						if (res.confirm) { //confirm为ture，代表用户点击确定
							console.log('点击了确定按钮');
							uni.showToast({
								title: "删除成功！",
							})
						} else if (res.cancel) { //cancel为ture，代表用户点击取消
							console.log('点击了取消按钮');
						}
					}
				})
			},
			openSwipe() {

			}
		}
	}
</script>

<style lang="scss">
	// 商品条
	.product {
		display: flex;
		padding: 30rpx;

		// 商品图片
		.left {
			margin-right: 20rpx;
			flex-basis: 200rpx;
			border-radius: 10rpx;
		}

		// 商品描述区
		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			// 商品描述底部 包含价格和抢购按钮
			.bottom {
				margin-bottom: 35rpx;
			}
		}
	}
</style>
