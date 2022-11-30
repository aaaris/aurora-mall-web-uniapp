<!-- 该组件用于为商品颜色、版本进行选择时的弹窗 -->
<template>
	<view>
		<!-- 规格弹出层 -->
		<u-popup v-model="show" mode="bottom" border-radius="14" :closeable="true">
			<view class="select">
				<!-- 选择框头部 -->
				<view class="top">
					<!-- 商品图片 -->
					<image :src="item.goodsUrl" mode="aspectFill"></image>
					<!-- 商品描述、价格 -->
					<view>
						<text class="u-line-2">{{item.title}}</text>
						<text style="color: #fa3534; font-size:11px">￥<text
								style="font-size: 16px;">{{item.price}}</text></text>
					</view>
				</view>
				<!-- 商品选择栏，可滚动 -->
				<scroll-view scroll-y="true" style="flex: 1">
					<!-- 选择区域：版本 -->
					<view>
						<view style="font-weight: bold;">版本</view>
						<!-- 选择标签区域 -->
						<view class="label">
							<view v-for="(label,index) in labels" :key="label.name" class="item"
								@click="selectLabel(index)">
								<text>{{label.name}}</text>
							</view>
						</view>
					</view>
					<!-- 选择区域：数量 -->
					<view class="u-flex u-row-between">
						<text style="font-weight: bold;">数量</text>
						<u-number-box :min="1" :max="100" v-model="item.count" @change="valChange">
						</u-number-box>
					</view>
				</scroll-view>
				<!-- 选择栏底部：确定按钮区 -->
				<view class="select-bottom">
					<u-button @click="showPop = false;" type="error" shape="circle">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "prodSelectPopup",
		props: {
			// 传递是否显示
			show: Boolean,
			// 传递购物项信息
			item: Object
		},
		// 用于实现父子组件双向绑定
		emits: ['update:show', 'update:item'],
		watch: {
			show(newValue) {
				this.$emit('update:show', newValue)
			},
			item(newValue) {
				this.$emit('update:item', newValue)
			}
		},
		data() {
			return {
				// 选择标签
				labels: [],
				// 选择目标标签的下标
				select: 0
			};
		},
		onLoad() {
			// 调用api，根据传入的商品id，获取标签数据
			this.labels = [{
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
		methods: {
			// 更新选择的标签
			selectLabel(index) {
				this.select = index;
			},
			// 修改商品的数量
			valChange(e) {
				console.log('当前值为: ' + e.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select{ 
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		
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
		.laber { 
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin: 30rpx 0; 
			// 选择框标签项
			.item { 
				background-color: #f3f4f6;
				border-radius: 10%;
				margin: 0 20rpx 15rpx 0;
				padding: 0 30rpx;
				border: 1px solid #fff;
				height: 70rpx;
				display: flex;
				align-items: center;
			} 
			// 选择框标签项：被点击 
			.click { 
				border: 1px solid $u-type-error;
				background-color: rgba(250, 182, 182, 0.2);
				color: $u-type-error;
			}
		}
	}
</style>
