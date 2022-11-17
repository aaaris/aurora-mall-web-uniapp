<template>
	<view class="product-items">
		<!-- 商品条 -->
		<view class="product-item" v-for="(item,index) in list" :key="index">
			<!-- 商品图片 -->
			<view class="product-item-left">
				<image :src="item.goodsUrl" style="height:200rpx; width:200rpx; border-radius: 10rpx;"
					mode="aspectFill"></image>
			</view>
			<!-- 商品描述区 -->
			<view class="product-item-right">
				<view class="product-item-text">
					<!-- 商品名 -->
					<text>{{item.title}}</text>
				</view>
				<!-- 秒杀进度条 -->
				<view class="product-item-progress" v-if="isKill">
					<u-line-progress round :striped="true" :striped-active="true" 
					active-color="#ff9900" :percent="item.progress">
					</u-line-progress>
				</view>
				<view class="product-item-bottom">
					<!-- 商品售价 -->
					<text style="color: #ff1d1d;"><text style="font-size: 10px;">￥</text>{{item.price}}</text>
					<!-- 秒杀按钮 -->
					<view class="product-item-btn" v-if="isKill">
						<u-button :type="(Date.parse(item.date)< Date.now() ? 'error' : 'success')" shape="circle"
							size="mini" @click="gotoProduct">{{(Date.parse(item.date)< Date.now() ? '抢！' : '抢先看')}}
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list', 'isKill'],
		name: "itemResultList",
		data() {
			return {

			};
		},
		methods: {
			gotoProduct(id) {
				uni.navigateTo({
					url: "/pages/product/productDetail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 商品条区
	.product-items {
		margin: 16rpx 30rpx;
		padding: 10rpx;
		display: flex;
		flex-direction: column;
	}

	// 商品条
	.product-item {
		display: flex;
		margin: 30rpx;
		// 商品图片
		.product-item-left {
			margin-right: 20rpx; 
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}

		.product-item-right {
			// 商品描述区
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.product-item-text {
				width: 400rpx; 
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			} 

			// 商品描述尾部 包含价格和抢购按钮
			.product-item-bottom {
				display: flex; 
				justify-content: space-between;
				margin-bottom: 50rpx;
				.product-item-btn{
					font-family: "站酷高端黑 Regular";
					font-style: italic; 
				}
			}
		}
	}
</style>
