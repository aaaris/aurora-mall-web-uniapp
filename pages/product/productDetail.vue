<template>
	<view style="display: flex; flex-direction: column; height: 100%;">
		<u-navbar :border-bottom="false" title="商品详情"> </u-navbar>
		<view style="flex: 1; overflow: scroll;  background-color: #f3f4f5;">
			<view class="">
				<u-swiper :list="list" height="500" mode="number"></u-swiper>
			</view>
			<view class="id1">
				<view class="left">
					<view class="icon">
						<view>极光</view>
						<view>秒杀</view>
						<!-- <text>秒杀</text> -->
					</view>
					<text style="color:white; font-size: 18px; margin-left: 15rpx;">￥379.00</text>
				</view>
				<view class="right">
					<u-count-down :timestamp="86400" separator="zh" :show-days="false"></u-count-down>
				</view>
			</view>
			<view class="id2">
				<view class="left1">
					<text>{{prod.title}}</text>
				</view>
				<view class="right1">
					<view class="icon1">
						<u-icon name="heart" size="34"></u-icon>
					</view>
					<view class="text1">
						收藏
					</view>

				</view>
			</view>
			<view class="id3">

			</view>
			<view class="id4">
				<view class="descri">
					<text>商品详情</text>
				</view>
				<view class="img1">
					<image src="https://cdn.uviewui.com/uview/swiper/3.jpg" alt=""></image>
					<!-- display="inline-block" src="https://cdn.uviewui.com/uview/swiper/3.jpg" alt=""> -->
				</view>
			</view>
		</view>
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">店铺</view>
				</view>
				<view class="item car">
					<u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				timestamp: 86400,
				prod: {
					goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
					title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
					type: '45cm;S',
					deliveryTime: '付款后30天内发货',
					price: '135.00',
					count: 1
				}
			};
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>

<style lang="scss">
	.mode {
		height: 500rpx;
	}

	.id1 {
		//background-color: skyblue;
		height: 120rpx;
		display: flex;

		.left {
			padding: 0 10rpx;
			flex: 3;
			background-color: hotpink;
			display: flex;
			align-items: center;

			.icon {
				justify-content: center;
				align-items: center;
				text-align: center;
				display: flex;
				height: 90rpx;
				flex-direction: column;
				background-color: #cb17b0;
				color: white;
				font-size: 14px;
				width: 80rpx;
				font-weight: bold;
				border-radius: 16rpx;
				//font-family: ;
			}
		}

		.right {
			flex: 1;
			background-color: white;
		}
	}

	.id2 {
		display: flex;
		padding: 30rpx;
		height: 120px;
		background-color: greenyellow;

		.left1 {
			font-size: 20px
		}

		.right1 {
			width: 200rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 5px 0;

			.icon1 {}

			.text1 {
				font-size: 20rpx;
			}
		}

	}

	.id3 {
		background-color: #fff;
		height: 140px;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 25px;
	}

	.id4 {
		background-color: #fff;
		//height: 250px;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 25px;
		display: flex;
		flex-direction: column;

		.descri {
			margin-top: 18px;
			margin-left: 25px;
			margin-bottom: 5px;
		}

		.img1 {
			margin-left: 25px;
			justify-content: center;
		}
	}

	.navigation {
		display: flex;
		border-top: solid 2rpx #f2f2f2;
		background-color: #ffffff;
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
