<template>
	<view>
		<u-navbar back-text="登录" :borderBottom="false"></u-navbar>
		<!-- logo -->
		<view class="logo-wrapper">
			<image class="logo" src="@/static/image/logo.png" mode="aspectFit"></image>
		</view>
		<view class="btn-wrapper">
			<!-- 登录按钮 -->
			<u-button @click="wxLogin" type="success" shape="circle">一键登录微信</u-button>
			<!-- 声明事项 -->
			<view class="checked">
				<u-checkbox shape="circle" v-model="checked">同意声明</u-checkbox>
			</view>
		</view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				code: '',
				appid: '',
				appSec: '',
				checked: false
			};
		},
		methods: {
			wxLogin() {
				if (!this.checked) {
					uni.showToast({
						icon:'error',
						title:'请先同意声明!', 
					})
					return 
				}
				// uni.login({
				// 	success: (res) => {
				// 		this.code = res.code
				// 		console.log(this.code)
				// 		uni.request({
				// 			url:`https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.appSec}&js_code=${this.code}&grant_type=authorization_code`,
				// 			success: (res) => {
				// 				console.log(res)
				// 			},
				// 			fail: (err) => {
				// 				console.log(err)
				// 			} 
				// 		})
				// 	}
				// }) 
			}
		}
	}
</script>

<style lang="scss">
	.logo-wrapper {
		display: flex;
		justify-content: center;
		margin: 50rpx 0 30rpx;

		.logo {
			height: 250rpx;
			width: 250rpx;
		}
	}

	.btn-wrapper {
		padding: 30rpx;
		.checked {
			margin-top: 30rpx; 
		}
	}
</style>
