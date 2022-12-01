<template>
	<!-- 导航栏 -->
	<view>
		<u-navbar :border-bottom="false" title="关于我们"></u-navbar>
		<view class="body">
			<image src="../../static/image/logo.png" style="height: 200rpx; width: 200rpx;"></image>
			<view class="about-desc">
				<text>开发团队: Aurora Team</text>
				<text>联系我们: </text>
				<text>特别鸣谢: 深圳大学</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/navBar.vue'
	export default {
		components: {
			navBar
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.body {
		padding: 10vh 0 ;
		height: 80vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.about-desc {
		text {
			display: block;
			font-size: 14px;
			margin-top: 20rpx;
		}
	}

	.about-desc:first-child {
		margin-top: 100rpx
	}
</style>
