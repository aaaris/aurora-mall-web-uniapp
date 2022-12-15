<template>
	<view class="loading">
		<u-loading :show="loading" size="70" color="#fa3534"></u-loading>
	</view>
	<view style="display: flex; flex-direction: column; height: 100%;">
		<u-navbar :border-bottom="false" title="提交订单">
		</u-navbar>
		<view v-if="loading===false" class="addr-info-bar">
			<text style="font-size: 16px;">收货人信息</text>
			<view class="addr-info-item">
				<u-icon custom-prefix="custom-icon" name="zuobiaofill" size="60" color="#fe770f"></u-icon>
				<view class="u-flex-col u-m-l-15">
					<text style="margin-bottom: 10rpx;">{{addrInfo.name}}&nbsp;{{addrInfo.phone}}</text>
					<text>{{addrInfo.region +  addrInfo.desc}}</text>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<image v-if="loading===false" style="height: 3px; display: block; width: 100%;" src="../../static/image/gap.png"
			mode="aspectFill">
		</image>
		<!-- 购物车商品 -->
		<!-- 以店铺划分的购物项区域，可滚动 -->
		<view v-if="loading===false" style="flex: 1;overflow: scroll; background-color: #f3f4f5; ">
			<!-- 店铺购物项区域 -->
			<view class="u-skeleton-fillet order-body" v-for="(item, index1) in cartItemList" :key="item.id">
				<!-- 购物项头部，店铺名 -->
				<view class="u-p-30 u-skeleton-fillet">
					<u-icon custom-prefix="custom-icon" name="dianpu" size="34">
					</u-icon>&nbsp;
					<!-- 店铺名 -->
					<text>{{item.store}}</text>
				</view>
				<!-- 购物项主体，店铺商品 -->
				<view class="u-p-l-30 u-p-r-30 ">
					<view class="item u-skeleton-fillet" v-for="(prod,index2) in item.prodList" :key="prod.title">
						<!-- 商品图片 -->
						<image mode="aspectFill" :src="prod.goodsUrl" />
						<!-- 商品描述 -->
						<view class="title-wrap u-skeleton-fillet">
							<!-- 文字描述 -->
							<text class="title u-line-2">{{ prod.title }}</text>
							<text style="margin-top:15rpx; display: block;">{{prod.type}}</text>
							<view class="u-flex u-m-t-15 u-row-between">
								<!-- 价格 -->
								<text style="color: #fa3534; font-size:11px">￥<text
										style="font-size: 16px;">{{prod.price}}</text></text>
								<text>×{{prod.count}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="price-info">
				<view class="price-info-item">
					<text>商品金额</text>
					<text>￥{{totalPrice}}</text>
				</view>
				<view class="price-info-item">
					<text>退还无忧</text>
					<text>￥0.00</text>
				</view>
				<view class="price-info-item">
					<text>运费</text>
					<text>￥0.00</text>
				</view>
				<view class="price-info-item">
					<text>合计：<text style="color: #fa3534; font-size:12px">￥<text
								style="font-size: 18px;">{{totalPrice}}</text></text>
					</text>
				</view>
			</view>
			<view class="pay-info">
				<text>支付方式</text>
				<text>微信支付</text>
			</view>
		</view>
		<view v-if="loading===false" class="page-foot  u-border-top">
			<!-- 总价展示 -->
			<view>
				<text style="color: #fa3534; font-size:12px">￥<text
						style="font-size: 18px;">{{totalPrice}}</text></text>
			</view>
			<!-- 结算按钮-->
			<view class="">
				<u-button type="error" size="medium" shape="circle" @click="paySubmit">立即结算</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrInfo: {
					name: "张三",
					phone: "13511111111",
					desc: "翻斗市区翻斗大街A1104",
					region: "北京市朝阳区",
					inUse: true
				},
				// 购物项列表，以店铺划分
				cartItemList: [],
				loading: true
			};
		},
		onLoad() {
			uni.$on('createOrder', (obj) => {
				if (obj) {
					this.cartItemList = obj;
				}
			})
			setTimeout(() => {
				this.loading = false
			}, 2000)
		},
		onUnload() {
			uni.$off('createOrder')
			this.cartItemList = []
		},
		computed: {
			totalPrice() {
				let price = 0.00
				this.cartItemList.forEach((shop) => {
					shop.prodList.forEach(item => {
						price += item.count * Number.parseFloat(item.price)
					})
				})
				return price
			}
		},
		methods: {
			paySubmit() {
				let orderList = []
				this.cartItemList.forEach((item) => {
					let order = {}
					order.storeId = item.id
					order.prodList = []
					item.prodList.forEach(p => {
						order.prodList.push({
							id: p.id,
							count: p.count
						})
					})
					orderList.push(order)
				})
				uni.showLoading({
					title: '正在支付',
					mask: true
				});
				this.$u.api.order.createOrder({
					AddOrderReq: {
						orderList
					}
				}).then(() => {
					uni.hideLoading();
					uni.switchTab({
						url: "/pages/index/cart"
					})
					uni.showToast({
						title: "下单成功！",
						mask: true
					})
				})
			},
		}
	}
</script>
<style>
	@import "@/static/font/iconfont.css";

	page {
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	// 加载中
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.addr-info-bar {
		background-color: #fff;
		border-radius: 16px;
		padding: 30rpx;

		.addr-info-item {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
		}
	}

	/* 店铺内购物项区 */
	.item {
		margin: 0 0 30rpx;
		display: flex;
		padding: 30rpx 0;
		border-bottom: 1px solid #f3f4f6;
	}

	/* 最后一个购物项 */
	.item:last-child {
		border-bottom: 0;
	}

	/* 购物车主体 */
	.order-body {
		background-color: #fff;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		margin: 30rpx 0;

		/* 商品图片 */
		image {
			width: 200rpx;
			flex: 0 0 200rpx;
			height: 200rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
	}

	.order-info {
		height: 500rpx;
		background-color: #fff;
		border-radius: 16px;
		padding: 30rpx;
		margin: 50rpx 0 30rpx;
	}


	.title-wrap {
		height: 100%;
	}

	/*  */
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
	}


	.price-info {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 16px;
		margin-bottom: 30rpx;

		.price-info-item {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;

			&:last-child {
				border-top: 2px solid #f3f4f6;
				justify-content: flex-end;
			}
		}
	}

	.pay-info {
		background-color: #fff;
		padding: 30rpx;
		display: flex;
		border-radius: 16px;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}


	.page-foot {
		background-color: #fff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		margin-bottom: calc(env(safe-area-inset-bottom));
	}
</style>
