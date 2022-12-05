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
						icon: 'error',
						title: '请先同意声明!',
					})
					return
				}
				// 使用wx.login()获取code
				uni.login({
					success: ({
						code
					}) => {
						console.log(code)
						// 调用后台登录
						this.$u.api.login({
							code: code
						}).then(({
							token,
							refreshToken,
							userId
						}) => {
							// 存储token信息
							uni.setStorageSync('tokenInfo', JSON.stringify({
								token,
								refreshToken
							}))
							uni.setStorageSync('userId', userId)
							uni.showToast({
								title: '登录成功！',
								icon: 'success'
							})
							// 返回上一个页面，如果返回失败则跳转到主页
							setTimeout(() => {
								uni.navigateBack({
									fail: () => {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
								})
							}, 1500)
						})
					}
				})
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
