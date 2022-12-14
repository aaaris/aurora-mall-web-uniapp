<template>
	<!-- 加载中显示 -->
	<view class="loading">
		<u-loading :show="isLoading" color="#fa3534" size="70"></u-loading>
	</view>
	<view class="wrap">
		<u-navbar :is-back="false" :border-bottom="false" title="购物车">
		</u-navbar>
		<view style="height: 100%;" v-if="userStore.isLogin==false">
			<u-empty mode="car" text="亲~请先登录哦~">
				<view slot="bottom">
					<u-button shape="circle" type="success" size="medium" @click="$u.route('/pages/user/login')">去登录
					</u-button>
				</view>
			</u-empty>
		</view>
		<!-- 购物车头部 -->
		<view class="head" v-if="userStore.isLogin==true">
			<text style="color: #fa3534;">全部({{totalCount}})</text>
			<!-- 编辑按钮 -->
			<view class="btn">
				<text @click="isEdit = !isEdit">{{isEdit ? '完成' :'编辑'}}</text>
			</view>
		</view>
		<!-- 以店铺划分的购物项区域，可滚动 -->
		<view v-if="isLoading===false && userStore.isLogin==true" class="scroll">
			<!-- 店铺购物项区域 -->
			<view class="cart" v-for="(item, index1) in cartItemList" :key="item.id">
				<!-- 购物项头部，店铺名 -->
				<view class="u-p-30">
					<!-- 店铺选择器：全选店铺商品 -->
					<u-checkbox shape="circle" size="50" :name="index1" activeColor="#fa3534" v-model="item.isTik"
						@change="checkChange($event,-1)"></u-checkbox>
					<u-icon custom-prefix="custom-icon" name="dianpu" size="34">
					</u-icon>&nbsp;
					<!-- 店铺名 -->
					<text>{{item.store}}</text>
				</view>
				<!-- 购物项主体，店铺商品 -->
				<view class="u-p-l-30 u-p-r-30 ">
					<view class="item" v-for="(prod, index2) in item.prodList" :key="prod.title">
						<!-- 选择器 -->
						<view class="u-flex u-col-center">
							<u-checkbox shape="circle" size="50" :name="index2" activeColor="#fa3534"
								v-model="prod.isTik" @change="checkChange($event,index1)"></u-checkbox>
						</view>
						<!-- 商品图片 -->
						<image class="image" mode="aspectFill" :src="prod.goodsUrl" @click="gotoProdDetail(prod)" />
						<!-- 商品描述 -->
						<view>
							<!-- 文字描述 -->
							<text class="title u-line-2">{{ prod.title }}</text>
							<!-- 弹出选择框按钮 -->
							<view class="select-btn" @click="showSelect(index1, index2)">
								<text class="text u-line-1">{{prod.type}}</text>
								<u-icon name="arrow-down" size="14"></u-icon>
							</view>
							<view class="u-flex u-row-between">
								<!-- 价格 -->
								<text style="color: #fa3534; font-size:11px">￥<text
										style="font-size: 16px;">{{prod.price}}</text></text>
								<!-- 数量选择 -->
								<u-number-box :min="1" :max="100" v-model="prod.count" @change="valChange">
								</u-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 规格弹出层 -->
		<prodSelect v-model:show="showPop" v-model:prod="cartItem" :isConfirm="true"></prodSelect>
		<!-- 购物车底部 -->
		<view v-if="isLoading===false&& userStore.isLogin==true" class=" bottom u-p-30 u-border-top">
			<view>
				<!-- 全选器 -->
				<u-checkbox shape="circle" size="50" :name="index" activeColor="#fa3534" v-model="allTik"
					@change="checkChange($event,-2)"></u-checkbox>
				<text>全选</text>
			</view>
			<!-- 总计与结算按钮：非编辑模式 -->
			<view class="" v-if="!isEdit">
				<text style="font-size: 15px;">总计：<text style="color: #fa3534; font-size:11px">￥<text
							style="font-size: 16px;">{{totalPrice}}</text></text>
				</text>
				&nbsp;
				<u-button type="error" size="medium" shape="circle" @click="gotoCreateOrder">结算({{totalOrderCount}})
				</u-button>
			</view>
			<!-- 删除按钮：编辑模式 -->
			<view class="" v-if="isEdit">
				<u-button size="medium" shape="circle" ripple @click="deleteCartItem" :customStyle="{color:'#fa3534'}">
					删除</u-button>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<navBar></navBar>
	</view>
</template>

<script>
	import navBar from '@/components/navBar.vue'
	import prodSelect from '@/components/prodSelect.vue'
	import {
		mapStores
	} from 'pinia'
	import {
		useUserStore
	} from '@/stores/store'
	export default {
		components: {
			navBar,
			prodSelect
		},
		data() {
			return {
				// 是否全选
				allTik: false,
				isEdit: false,
				// 购物项列表，以店铺划分
				cartItemList: [{
						id: 1,
						store: "Apple 官方零售店",
						prodList: [{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							isTik: false,
							count: 1
						}, {
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
							type: '4K，广色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							isTik: false,
							count: 1
						}],
						isTik: false
					},
					{
						id: 2,
						store: "Apple 官方零售店",
						prodList: [{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							isTik: false,
							count: 1
						}, {
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
							type: '4K，广色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							isTik: false,
							count: 1
						}],
						isTik: false
					},
					{
						id: 3,
						store: "Apple 官方零售店",
						prodList: [{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							isTik: false,
							count: 1
						}, {
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
							type: '4K，广色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							isTik: false,
							count: 1
						}],
						isTik: false
					}
				],
				// 需要修改选择类型的购物项
				cartItem: {
					goodsUrl: '',
					title: '',
					type: '',
					deliveryTime: '',
					price: '',
					isTik: false,
					count: 1
				},
				// 是否显示选择弹窗
				showPop: false,
				// 滑动区域，动态计算
				scrollHeight: "500px",
				// 是否显示正在加载动画
				isLoading: true
			}
		},
		onShow() {
			let isLogin = this.userStore.isLogin
			if (!isLogin) {
				console.log("userId is not in storage")
				uni.showToast({
					title: '请先登录',
					icon: 'error'
				})
				setTimeout(() => {
					this.$u.route('/pages/user/login')
				}, 1500)
			}
			this.getAllCartItems()
			this.isLoading = false;
		},
		computed: {
			// 计算属性计算勾选购物项总价
			totalPrice() {
				let price = 0.00
				this.cartItemList.forEach((shop) => {
					shop.prodList.forEach(item => {
						if (item.isTik) {
							price += item.count * Number.parseFloat(item.price)
						}
					})
				})
				return price
			},
			// 计算属性计算购物项总数
			totalCount() {
				let count = 0
				this.cartItemList.forEach((shop) => {
					count += shop.prodList.length
				})
				this.userStore.totalCount = count
				return count
			},
			// 计算属性计算勾选购物想总数
			totalOrderCount() {
				let count = 0
				this.cartItemList.forEach((shop) => {
					if (shop.isTik) {
						count += shop.prodList.length
					} else {
						shop.prodList.forEach((prod) => {
							if (prod.isTik) {
								count += 1
							}
						})
					}
				})
				return count
			},
			// 允许访问 this.userStore
			...mapStores(useUserStore),
		},

		methods: {
			// 勾选选项回调函数
			checkChange(obj, shopIdx) {
				let isTik = obj.value
				if (shopIdx == -1) {
					// 店铺购物项全选
					shopIdx = obj.name
					this.cartItemList[shopIdx].prodList.forEach((item) => {
						item.isTik = isTik
					})
				} else if (shopIdx == -2) {
					// 购物项全选
					this.cartItemList.forEach(shop => {
						shop.prodList.forEach((item) => {
							item.isTik = isTik
						})
						shop.isTik = isTik
					})
				} else {
					// 单选购物项
					let prodIdx = obj.name
					this.cartItemList[shopIdx].prodList[prodIdx].isTik = isTik
				}
			},
			// 弹出商品类型选择
			showSelect(idx1, idx2) {
				this.cartItem = this.cartItemList[idx1].prodList[idx2]
				this.showPop = true;
			},
			// 步进器回调函数
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			async getAllCartItems() {
				const {
					GetCartItemRsp
				} = await this.$u.api.cart.list()
				console.log(GetCartItemRsp)
				this.cartItemList = GetCartItemRsp.cartItemList
			},
			// 结算购物车，创建订单
			gotoCreateOrder() {
				// 如果未勾选任何商品
				if (this.totalOrderCount === 0) {
					uni.showToast({
						title: "请选择商品",
						icon: "error"
					})
					return
				}
				// 获取所有勾选的商品
				let order = []
				this.cartItemList.forEach((store) => {
					let ss = JSON.parse(JSON.stringify(store))
					if (store.isTik !== true) {
						ss.prodList = []
						console.log(store.prodList.length)
						store.prodList.forEach((item) => {
							if (item.isTik === true) {
								ss.prodList.push(item)
							}
						})
					}
					if (ss.prodList.length > 0) {
						order.push(ss)
					}
				})
				// 跳转创建订单页
				uni.navigateTo({
					url: "/pages/order/createOrder",
					success() {
						setTimeout(() => {
							uni.$emit('createOrder', JSON.parse(JSON.stringify(order)))
						}, 1000)
					}
				})
			},
			// 删除购物项函数
			deleteCartItem() {
				let idList = []
				this.cartItemList.forEach((store) => {
					store.prodList.forEach((prod) => {
						if (prod.isTik) {
							idList.push(prod.id)
						}
					})
				})
				uni.showModal({
					title: '温馨提示', //提示标题
					content: '确定删除选中商品吗？', //提示内容
					showCancel: true, //是否显示取消按钮
					success: (res) => {
						if (res.confirm) { //confirm为ture，代表用户点击确定
							console.log('点击了确定按钮');
							this.$u.api.cart.deleteItem(idList).then(() => {
								uni.showToast({
									title: "删除成功！",
								})
								// 前端获取所有购物项
								this.getAllCartItems()
							}).catch(() => {
								uni.showToast({
									icon: "error",
									title: "删除失败！",
								})
							})
						} else if (res.cancel) { //cancel为ture，代表用户点击取消
							console.log('点击了取消按钮');
						}
					}
				})
			},
			// 前往商品详情页
			gotoProdDetail(obj) {
				uni.navigateTo({
					url: "/pages/product/productDetail",
					success: () => {
						setTimeout(() => {
							uni.$emit('gotoProdDetail', JSON.parse(JSON.stringify(obj)))
						}, 500)
					}
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

	/* 页面样式 */
	.wrap {
		display: flex;
		flex-direction: column;
		height: 100%;

		/* 购物车头部 */
		.head {
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
		}

		// 可滚动栏
		.scroll {
			flex: 1;
			overflow: scroll;
			background-color: #f3f4f6;

			/* 购物车主体 */
			.cart {
				background-color: #fff;
				border-radius: 16px;
				display: flex;
				flex-direction: column;
				margin: 30rpx 0;

				/* 店铺内购物项区 */
				.item {
					margin: 0 0 30rpx;
					display: flex;
					padding: 30rpx 0;
					border-bottom: 1px solid #f3f4f6;

					/* 商品图片 */
					.image {
						width: 200rpx;
						flex: 0 0 200rpx;
						height: 200rpx;
						margin-right: 20rpx;
						border-radius: 12rpx;
					}
				}
			}
		}

		/* 购物车底部 */
		.bottom {
			background-color: #fff;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
	}

	.select-btn {
		margin: 15rpx 0;
		width: 250rpx;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 16px;
		padding: 0 15rpx;
		background-color: #f3f4f6;

		.text {
			font-size: 11px;
			color: #909399;
		}
	}
</style>
