<template>
	<view style="position: absolute; top: 50%; left: 50%; z-index: 999;">
		<u-loading :show="loading" size="70" color="#fa3534"></u-loading>
	</view>
	<view style="display: flex; flex-direction: column; height: 100%;">
		<u-navbar :background="{
		background: 'linear-gradient(to right, #00baad 0%, #7948ea 95%)'}" :border-bottom="false" title="订单详情"
			title-color="#fff" back-icon-color="#fff"></u-navbar>
		<!-- 订单状态栏 -->
		<view v-if="loading===false" style="flex: 1; overflow: scroll; background-color: #f3f4f5;">
			<view class="order-stat-bar">
				<view class="u-flex u-m-b-15">
					<u-icon customPrefix="custom-icon" :name="iconStyle[order.dealStat]" size="50" color="#fff">待收货
					</u-icon>
					&nbsp;
					<text style="color: #fff;">{{order.deal}}</text>
				</view>
				<text v-if="order.dealStat === 1" style="color: #fff;">距离自动取消订单还有{{restTime}}</text>
				<text v-if="order.dealStat === 3" style="color: #fff;">距离自动确认收货还有{{restTime}}</text>
			</view>
			<!-- 分割线 -->
			<image style="height: 3px; display: block; width: 100%;" src="../../static/image/gap.png" mode="aspectFill">
			</image>
			<!-- 地址信息 -->
			<view class="addr-info-bar">
				<text style="font-size: 16px;">收货人信息</text>
				<view class="addr-info-item">
					<u-icon custom-prefix="custom-icon" name="zuobiaofill" size="60" color="#fe770f"></u-icon>
					<view class="u-flex-col u-m-l-15">
						<text style="margin-bottom: 10rpx;">{{addrInfo.name}}&nbsp;{{addrInfo.phone}}</text>
						<text>{{addrInfo.region +  addrInfo.desc}}</text>
					</view>
				</view>
			</view>
			<!-- 购物车商品 -->
			<!-- 店铺购物项区域 -->
			<view class="order-body">
				<!-- 购物项头部，店铺名 -->
				<view class="u-p-30 u-skeleton-fillet">
					<u-icon custom-prefix="custom-icon" name="dianpu" size="34">
					</u-icon>&nbsp;
					<!-- 店铺名 -->
					<text>{{order.store}}</text>
				</view>
				<!-- 购物项主体，店铺商品 -->
				<view class="u-p-l-30 u-p-r-30 ">
					<view class="item u-skeleton-fillet" v-for="(prod,index2) in order.prods" :key="prod.title">
						<!-- 商品图片 -->
						<image mode="aspectFill" :src="prod.goodsUrl" />
						<!-- 商品描述 -->
						<view class="title-wrap u-skeleton-fillet">
							<!-- 文字描述 -->
							<text class="title u-line-2">{{ prod.title }}</text>
							<view class="u-flex u-row-between">
								<!-- 价格 -->
								<text style="color: #fa3534; font-size:11px">￥<text
										style="font-size: 16px;">{{prod.price}}</text></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 价格信息 -->
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
				<view class="price-info-bottom">
					<text>合计：<text style="color: #fa3534; font-size:12px">￥<text
								style="font-size: 18px;">{{totalPrice}}</text></text>
					</text>
				</view>
			</view>
			<view class="price-info">
				<view class="price-info-item">
					<text>订单编号</text>
					<text>{{order.id}}</text>
				</view>
				<view class="price-info-item">
					<text>支付方式</text>
					<text>{{order.payMode}}</text>
				</view>
				<view class="price-info-item">
					<text>下单时间</text>
					<text>{{this.$u.date(order.createTime, "yyyy-mm-dd hh:MM:ss")}}</text>
				</view>
			</view>
		</view>
		<view v-if="loading===false" class="page-foot  u-border-top">
			<view class="">
				<u-button v-if="(order.dealStat===1||order.dealStat===2)"  size="medium" shape="circle"
					@click="changeOrderStat(0)">取消订单</u-button>
				&nbsp;
				<u-button v-if="(order.dealStat===1)" type="warning" size="medium" shape="circle"
					@click="changeOrderStat(2)">立刻付款</u-button>
				&nbsp;
				<u-button v-if="(order.dealStat===3)" type="error" size="medium" shape="circle"
					@click="changeOrderStat(4)">确认收货</u-button>
				&nbsp;
				<u-button v-if="(order.dealStat===4)" type="success" size="medium" shape="circle"
					@click="changeOrderStat(-1)">重新购买</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 收件人信息
				addrInfo: {
					name: "张三",
					phone: "13511111111",
					desc: "翻斗市区翻斗大街A1104",
					region: "北京市朝阳区",
					inUse: true
				},
				// 购物项列表，以店铺划分
				order: {
					id: 1,
					store: '',
					deal: '',
					dealStat: 1,
					payMode: "",
					prods: [],
					createTime: 0
				},
				// 加载
				loading: true,
				// 自动收货确认时间 或 自动取消订单时间 
				restTime: "",
				// 订单状态图标
				iconStyle: [
					// 0 已取消
					"ordercancle-fill",
					// 1 未支付  
					"wallet",
					// 2 待发货
					"product-fill",
					// 3 待收货
					"kuaidi",
					// 4 已完成
					"yiwancheng"
				]
			};
		},
		onLoad() {
			uni.$on('gotoDetail', (obj) => {
				if (obj) {
					this.order = obj
				}
			})
			setTimeout(() => {
				this.loading = false
				console.log(this.order)
			}, 2000)
		},
		onUnload() {
			uni.$off('gotDetail');
		},
		mounted() {
			let that = this;
			this.timer = setInterval(() => {
				that.updateRestTime()
			}, 500);
		},
		computed: {
			totalPrice() {
				let price = 0.00
				this.order.prods.forEach(item => {
					price += item.count * Number.parseFloat(item.price)
				})
				return price
			},
		},
		methods: {
			paySubmit() {
				uni.showLoading({
					title: '正在支付',
					mask: true
				});
				setTimeout(function() {
					uni.hideLoading();
					uni.navigateTo({
						url: "/pages/order/orderDetail"
					})
				}, 2000);
			},
			updateRestTime() {
				let limit = 0
				if (this.order.dealStat === 1) {
					limit = (15 * 60 * 1000)
				} else {
					limit = (7 * 24 * 60 * 60 * 1000)
				}
				let timestamp = this.order.createTime + limit - Date.now()
				let day = parseInt(timestamp / (24 * 60 * 60 * 1000))
				timestamp -= day * (24 * 60 * 60 * 1000)
				let hour = parseInt(timestamp / (60 * 60 * 1000))
				timestamp -= hour * (60 * 60 * 1000)
				let min = parseInt(timestamp / (60 * 1000))
				let sec = parseInt(timestamp / 1000 - min * 60)
				this.restTime = this.order.dealStat === 1 ? `${min}分${sec}秒` : `${day}天${hour}时${min}分${sec}秒`
			},
			changeOrderStat(stat) {
				console.log(`change order's stat to ${stat}`)
			}
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
	// 订单状态栏
	.order-stat-bar {
		background: linear-gradient(to right, #00baad 0%, #7948ea 95%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200rpx;
	}

	// 收货地址信息栏
	.addr-info-bar {
		background-color: #fff;
		border-radius: 16px;
		padding: 30rpx;
		margin-top: 30rpx;

		.addr-info-item {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
		}
	}

	/* 订单项栏 */
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

		.title-wrap {
			height: 100%;
		}

		/*  */
		.title {
			text-align: left;
			font-size: 28rpx;
			color: $u-content-color;
		}
	}

	// 订单信息栏
	.order-info {
		height: 500rpx;
		background-color: #fff;
		border-radius: 15rpx;
		padding: 30rpx;
		margin: 50rpx 0 30rpx;
	}

	// 订单价格栏
	.price-info {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 16px;
		margin-bottom: 30rpx;

		.price-info-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 70rpx;
		}

		.price-info-bottom {
			display: flex;
			align-items: center;
			border-top: 2px solid #f3f4f6;
			height: 70rpx;
			justify-content: flex-end;
			text-align: right;
		}
	}

	// 支付信息栏
	.pay-info {
		background-color: #fff;
		padding: 30rpx;
		display: flex;
		border-radius: 16px;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	// 页底部栏
	.page-foot {
		background-color: #fff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 30rpx 30rpx;
		margin-bottom: calc(env(safe-area-inset-bottom));
	}
</style>
