<template>
	<view class="loading">
		<u-loading :show="loading" size="70" color="#fa3534"></u-loading>
	</view>
	<view style="display: flex; flex-direction: column; height: 100%;">
		<!-- 头部导航栏 -->
		<u-navbar :border-bottom="false" title="商品详情"> </u-navbar>
		<view v-if="loading !== true" style="flex: 1; overflow: scroll;  background-color: #f3f4f5;">
			<!-- 商品轮播图 -->
			<u-swiper :list="list" height="500" mode="number" indicator-pos="bottomRight" img-mode="aspectFit">
			</u-swiper>
			<!-- 商品秒杀倒计时 -->
			<view v-if="prod.isKill" class="seckill">
				<view class="left">
					<view class="logo">
						<view>极光</view>
						<view>秒杀</view>
					</view>
					&nbsp;
					<text style="font-size: 15px;">￥<text style="font-size: 22px;">{{prod.price}}</text></text>
				</view>
				<view class="right">
					<text>距结束还剩</text>
					<view class="time">
						{{restTime.day}}天&nbsp;
						<view class="item">
							{{restTime.hour}}
						</view>
						:
						<view class="item">
							{{restTime.minute}}
						</view>
						:
						<view class="item">
							{{restTime.sec}}
						</view>
					</view>
				</view>
			</view>
			<!-- 商品标题栏 -->
			<view class="prod">
				<view class="left">
					<view>{{prod.title}}</view>
					<text style="font-size: 15px; color: #fa3534;">￥<text
							style="font-size: 22px;">{{prod.price}}</text></text>
				</view>
				<view class="right" @click="addCollect">
					<u-icon :name="(prod.isCollect ?  'heart-fill' : 'heart')" size="34"></u-icon>
					<text>收藏</text>
				</view>
			</view>
			<!-- 商品参数选择栏 -->
			<view class="select">
				<view class="item">
					<text class="label">发货</text>
					<text>免运费</text>
				</view>
				<view class="item" @click="showPop = true">
					<text class="label">选择</text>
					<text style="flex: 1">{{ prod.type==='' ?  '请选择' : `已选择：${prod.type}`}}</text>
					<u-icon name="more-dot-fill" size="30"></u-icon>
				</view>
				<prodSelect v-model:show="showPop" v-model:prod="prod" :isConfirm="isConfirm"></prodSelect>
				<view class="item">
					<text class="label">服务</text>
					<text>急速退款·包邮·48小时发货</text>
				</view>
				<view class="item">
					<text class="label">参数</text>
					<text>品牌、产地、保质期</text>
				</view>
			</view>
			<!-- 商品细节栏 -->
			<view class="detail">
				<view class="text">
					<text>商品详情</text>
				</view>
				<image v-for="(item, index) in list" :src="item.image" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 底部菜单栏 -->
		<view v-if="loading !== true" class="navigation">
			<view class="left">
				<view class="item" @click="gotoStore">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">店铺</view>
				</view>
				<view class="item car" @click="gotoCart">
					<u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1" @click="createOrder">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import prodSelect from "@/components/prodSelect.vue"
	export default {
		components: {
			prodSelect
		},
		data() {
			return {
				// 轮播图
				list: [],
				// 秒杀剩余时间
				restTime: {
					day: 0,
					hour: 0,
					minute: 0,
					sec: 0
				},
				// 商品
				prod: {
					id: 1,
					goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
					title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
					type: '45cm;S',
					deliveryTime: '付款后30天内发货',
					price: '135.00',
					stock: 100,
					isCollect: false,
					endTime: 888888,
					isKill: true,
				},
				// 是否弹出选择层
				showPop: false,
				// 是否用于确认
				isConfirm: false,
				// 加载中动画
				loading: true
			};
		},
		onLoad() {
			uni.$on('gotoProdDetail', (obj) => {
				if (obj) {
					this.prod = obj
					this.prod.endTime = Date.now() + this.$u.random(1, 100) / 100 * (2 * 24 * 60 * 60 * 1000)
					this.list = []
					this.list.push({
						image: this.prod.goodsUrl,
						title: this.prod.title
					})
				}
			})
			setTimeout(() => {
				this.loading = false;
			}, 2000)
		},
		onUnload() {
			uni.$off('gotoProdDetail')
		},
		mounted() {
			// 定时更新商品剩余时间
			if (this.prod.isKill) {
				setInterval(() => {
					this.updateRestTime();
				}, 1000)
			}
		},
		methods: {
			// 添加收藏
			addCollect() {
				if (this.prod.isCollect === false) {
					uni.showToast({
						title: '收藏成功!',
						icon: "success"
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确定要取消收藏该商品吗?',
						success: (res) => {
							if (res.confirm) {
								uni.showLoading({
									success: () => {
										setTimeout(() => {
											uni.showToast({
												icon: "success",
												title: "已取消收藏!"
											})
										}, 1000)
									}
								})
							}
						}
					});
				}
				this.prod.isCollect = !this.prod.isCollect
			},
			// 更新商品秒杀剩余时间
			updateRestTime() {
				let time = 0
				time = this.prod.endTime - Date.now()
				this.restTime.day = parseInt(time / (24 * 60 * 60 * 1000))
				time -= this.restTime.day * (24 * 60 * 60 * 1000)
				this.restTime.hour = parseInt(time / (60 * 60 * 1000))
				time -= this.restTime.hour * (60 * 60 * 1000)
				this.restTime.minute = parseInt(time / (60 * 1000))
				this.restTime.sec = parseInt(time / 1000 - this.restTime.minute * 60)
			},
			// 前往店铺
			gotoStore() {
				uni.navigateTo({
					url: "/pages/shop/shopDetail"
				})
			},
			// 前往购物车
			gotoCart() {
				uni.navigateTo({
					url: "/pages/product/cart"
				})
			},
			// 加入购物车
			addCart() {
				this.isConfirm = true;
				this.showPop = true;
				uni.$on('selectCofirm', (obj) => {
					this.isConfirm = false;
					if (obj) {
						this.$u.api.cart.addItem({
							id: this.prod.id,
							count: obj.count
						}).then((res) => {
							uni.showToast({
								icon: 'success',
								title: '加入成功！'
							})
						}).catch((err) => {
							uni.showToast({
								icon: 'error',
								title: '加入失败！'
							})
						})
					}
					uni.$off('selectCofirm')
				})
			},
			// 创建订单
			createOrder() {
				this.isConfirm = true;
				this.showPop = true;
				let order = [{
					id: 1,
					store: "Apple 官方零售店",
					prods: [this.prod]
				}]
				uni.$on('selectCofirm', (obj) => {
					this.showPop = false;
					this.isConfirm = false;
					if (obj) {
						uni.navigateTo({
							url: '/pages/order/createOrder',
							success: () => {
								setTimeout(() => {
									uni.$emit('createOrder', JSON.parse(JSON.stringify(order)))
								}, 500)
							}
						})
					}
					uni.$off('selectCofirm')
				})
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
	// 加载中
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	// 秒杀倒计时条
	.seckill {
		height: 120rpx;
		display: flex;

		.left {
			padding-left: 20rpx;
			flex: 2.5;
			background-color: #f82281;
			display: flex;
			align-items: center;
			font-weight: bolder;
			color: #fff;

			.logo {
				justify-content: center;
				align-items: center;
				display: flex;
				height: 90rpx;
				width: 90rpx;
				flex-direction: column;
				background-color: #7b4285;
				font-size: 15px;
				line-height: 16px;
				border-radius: 10%;
			}
		}

		.right {
			flex: 1;
			background-color: #FFEAE9;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #f82281;

			.time {
				margin-top: 10rpx;
				display: flex;

				.item {
					text-align: center;
					color: #fff;
					background-color: #f82281;
					height: 40rpx;
					width: 40rpx;
					border-radius: 15%;
				}
			}
		}
	}

	// 商品详情栏
	.prod {
		display: flex;
		padding: 30rpx 50rpx;
		height: 250rpx;
		background-color: #fff;

		.left {
			font-size: 17px;
			font-weight: bold;
		}

		.right {
			width: 200rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 5px 0;

			.text {
				font-size: 20rpx;
			}
		}
	}

	// 商品参数选择栏
	.select {
		background-color: #fff;
		margin: 30rpx 0;
		border-radius: 5%;
		font-size: 13px;

		.item {
			display: flex;
			height: 100rpx;
			align-items: center;
			padding: 30rpx 50rpx;

			.label {
				font-size: 14px;
				font-weight: bold;
				flex-basis: 100rpx;
			}
		}

		.item:nth-child(2):active {
			background-color: #f7f7f7;
		}
	}

	// 商品细节栏
	.detail {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 5%;

		.text {
			font-size: 15px;
			font-weight: bold;
			padding: 30rpx;
			width: 100%;
		}

		image {
			width: 100%;
			margin-bottom: 30rpx;
		}
	}

	// 底部菜单栏
	.navigation {
		display: flex;
		border-top: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		justify-content: space-between;
		padding: 16rpx 0;
		margin-bottom: env(safe-area-inset-bottom);

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			margin-right: 30rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
