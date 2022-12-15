<!-- 该组件用于为商品颜色、版本进行选择时的弹窗 -->
<template>
	<view>
		<!-- 规格弹出层 -->
		<u-popup v-model="show" mode="bottom" border-radius="14" :closeable="true" @close="skuConfirm(undefine)">
			<view class="select">
				<!-- 选择框头部 -->
				<view class="top">
					<!-- 商品图片 -->
					<image :src="prod.goodsUrl" mode="aspectFill"></image>
					<!-- 商品描述、价格 -->
					<view class="u-flex-col">
						<text class="u-line-2 u-m-b-15">{{prod.title}}</text>
						<text style="color: #fa3534; font-size:12px">￥<text
								style="font-size: 18px;">{{prod.price}}</text></text>
						<text class="u-m-t-15">已选：{{prod.type}}</text>
					</view>
				</view>
				<!-- 商品选择栏，可滚动 -->
				<scroll-view scroll-y style="max-height: 400px;">
					<!-- 选择区域：版本 -->
					<view v-for="(sku, idx1) in labelList" :key="sku.title">
						<view style="font-weight: bold;">{{sku.title}}</view>
						<!-- 选择标签区域 -->
						<view class="label">
							<view v-for="(label, idx2) in sku.labels" :key="label.name"
								:class="[sku.select===label.name? 'tik' : '','item']" @click="selectLabel(idx1, idx2)">
								{{label.name}}
							</view>
						</view>
					</view>
					<!-- 选择区域：数量 -->
					<view class="count">
						<text>数量</text>
						<u-number-box :min="1" :max="100" v-model="prod.count" @change="valChange">
						</u-number-box>
					</view>
				</scroll-view>
				<!-- 选择栏底部：确定按钮区 -->
				<view class="bottom">
					<view v-if="!isConfirm" style="display: flex; justify-content: space-around;">
						<u-button @click="addCart" type="warning" shape="circle" size="medium">加入购物车
						</u-button>
						<u-button @click="createOrder" type="error" shape="circle" size="medium">立即购买
						</u-button>
					</view>
					<view v-if="isConfirm">
						<u-button @click="skuConfirm(true)" type="error" shape="circle">确定</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "prodSelect",
		props: {
			// 传递是否显示
			show: Boolean,
			// 传递购物项信息
			prod: Object,
			// 是否是用于确认的
			isConfirm: Boolean,
		},
		// 用于实现父子组件双向绑定
		emits: ['update:show', 'update:prod'],
		watch: {
			show(newValue) {
				this.$emit('update:show', newValue)
				if (newValue) {
					this.getLabelList()
					this.parseType()
					this.updateType()
				}
			},
			prod(newValue) {
				this.$emit('update:prod', newValue)
				this.updateType()
			},
		},
		data() {
			return {
				// 选择标签
				labelList: [],
				// 选择目标标签的下标
				select: 0
			};
		},
		onLoad() {},
		mounted() {
			this.getLabelList()
		},
		methods: {
			// 获取标签
			getLabelList() {
				// 调用api，根据传入的商品id，获取标签数据
				this.labelList = [{
						title: "版本",
						select: '',
						labels: [{
								name: "128G 港版双卡",
								price: "8888.00"
							},
							{
								name: "256G 港版双卡",
								price: "9888.00"
							},
							{
								name: "512G 港版双卡",
								price: "11999.00"
							},

							{
								name: "1T 港版双卡",
								price: "13499.00"
							}
						]
					},
					{
						title: "颜色",
						select: '',
						labels: [{
								name: "白色",
								price: "8888.00"
							},
							{
								name: "蓝色",
								price: "9888.00"
							},

							{
								name: "黄色",
								price: "11999.00"
							}
						]
					}
				]
			},
			// 更新选择的标签
			selectLabel(idx1, idx2) {
				let sku = this.labelList[idx1]
				let label = sku.labels[idx2]
				sku.select = (sku.select === label.name ? '' : label.name)
				this.updateType()
			},
			// 解析type
			parseType() {
				let labels = Array(this.labelList.length)
				if (this.prod.type.includes(',')) {
					let type = this.prod.type
					labels = type.split(',')
				}
				this.labelList.forEach((sku, idx) => {
					sku.select = ''
					let tmp = labels[idx] === undefined ? '' : labels[idx]
					sku.labels.forEach((i) => {
						if (i.name === tmp) {
							sku.select = tmp
						}
					})
				})
			},
			// 更新type
			updateType() {
				let type = ""
				this.labelList.forEach((sku) => {
					type += sku.select === '' ? sku.labels[0].name : sku.select
					type += ','
				})
				type += this.prod.count + "个"
				this.prod.type = type
			},
			// 修改商品的数量
			valChange(e) {
				this.updateType()
			},
			// 加入购物车
			addCart() {
				this.updateType()
				this.$u.api.cart.addItem({
					id: this.prod.id,
					count: this.prod.count
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
			},
			// 立即下单
			createOrder() {
				this.updateType()
				let order = [{
					id: 1,
					store: "Apple 官方零售店",
					prods: [this.prod]
				}]
				uni.navigateTo({
					url: '/pages/order/createOrder',
					success: () => {
						setTimeout(() => {
							uni.$emit('createOrder', JSON.parse(JSON.stringify(order)))
						}, 500)
					}
				})
			},
			// 确认sku
			skuConfirm(stat) {
				this.updateType()
				uni.$emit('selectCofirm', stat === undefined ? stat : JSON.parse(JSON.stringify(this.prod)))
				this.$emit('update:show', false)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.select {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		height: 100%;

		// 选择框头部
		.top {
			margin-top: 30rpx;
			padding: 30rpx 0;
			display: flex;

			image {
				width: 200rpx;
				flex: 0 0 200rpx;
				height: 200rpx;
				margin-right: 20rpx;
				border-radius: 12rpx;
			}
		}

		// 选择框标签栏
		.label {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin: 30rpx 0;

			// 选择框标签项
			.item {
				background-color: #f3f4f6;
				border-radius: 35rpx;
				margin: 0 20rpx 15rpx 0;
				padding: 0 30rpx;
				border: 1px solid #fff;
				height: 70rpx;
				display: flex;
				align-items: center;
			}

			// 选择框标签项：被点击
			.tik {
				border: 1px solid $u-type-error;
				background-color: rgba(250, 182, 182, 0.2);
				color: $u-type-error;
			}

		}

		.count {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			font-weight: bold;
		}

		.bottom {
			margin: 30rpx 0 env(safe-area-inset-bottom);
		}
	}
</style>
