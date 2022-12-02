<template>
	<view>
		<u-navbar back-text="个人信息" :borderBottom="false"></u-navbar>
		<view class="wrapper">
			<view class="avatar u-border-bottom">
				<text style="flex: 1;">头像</text>
				<button class="btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="img" :src="userinfo.avatarUrl" mode="aspectFit"></image>
				</button>
			</view>
			<view class="nickname u-border-bottom">
				<text style="flex: 1;">昵称</text>
				<input type="nickname" :value="userinfo.nickname" @blur="onInput" />
			</view>
			<view class="u-m-30"> 
				<u-button type="success" shape="circle" @click="submit">保存</u-button>
				&nbsp;
				<u-button type="error" shape="circle" @click="cancel">退出登录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
					nickname: ''
				}
			};
		},
		onShow() {
			uni.getStorage({
				key: 'userinfo',
				success: (res) => {
					this.userinfo = JSON.parse(res.data)
				},
				fail: (err) => {
					console.log(err, 'getStorage fail!')
					this.userinfo = JSON.parse(JSON.stringify({
						avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
						nickname: '微信用户'
					}))
				}
			})
		},
		methods: {
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.userinfo.avatarUrl = avatarUrl
			},
			onInput(e) {
				console.log(e)
				this.userinfo.nickname = e.detail.value
			},
			submit() {
				uni.setStorage({
					data: JSON.stringify({
						avatarUrl: this.userinfo.avatarUrl,
						nickname: this.userinfo.nickname
					}),
					key: 'userinfo',
					success: (res) => {
						uni.showToast({
							title: '保存成功！',
							icon: 'success',
							complete: () => {
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						})
					}
				})
			},
			cancel() {
				uni.showModal({
					title: '温馨提示',
					content: '确定要退出登录吗?',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: 'userinfo',
								success: () => {
									uni.showToast({
										icon: 'success',
										title: '你已退出登录!',
										complete: () => {
											setTimeout(() => {
												uni.switchTab({
													url: '/pages/index/index',
												})
											}, 1000)
										}
									})
								}
							})
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;
		font-size: 16px;
		font-weight: bold;

		.avatar {
			padding: 30rpx;
			display: flex;
			align-items: center;

			.btn {
				height: 80rpx;
				background-color: #fff;

				&::after {
					border: none;
				}
			}

			.img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}

		.nickname {
			padding: 30rpx;
			display: flex;
			margin-bottom: 30rpx;

			input {
				font-weight: normal;
				width: 150rpx;
			}
		}
	}
</style>
