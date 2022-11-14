<template>
	<view>
		<u-navbar :border-bottom="false" title="我的收货地址"></u-navbar>
		<view>
			<!-- 收货地址项 -->
			<u-card padding="20" :show-head="false" :show-foot="false" border-radius="20"
				v-for="(item,index) in addressItemList" :key="index">
				<view slot="body" class="address-item-bar">
					<view class="address-item">
						<text>{{item.name}}</text>&nbsp;
						<text>{{item.phone}}</text>&nbsp;
						<u-tag text="默认" shape="circle" type="error" v-if="item.inUse" />
						<text style="display: block; font-size: 12px; margin-top: 15rpx;">
							{{item.desc}}
						</text>
					</view>
					<u-icon name="edit-pen" size="40" @click="gotoEdit()"></u-icon>
				</view>
			</u-card>
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
				addressItemList: [{
						name: "张三",
						phone: "13511111111",
						desc: "翻斗市区翻斗大街A1104",
						inUse: true,
					}, {
						name: "李四",
						phone: "13511111111",
						desc: "翻斗市区翻斗大街A1104",
						inUse: false,
					},
					{
						name: "王五",
						phone: "13511111111",
						desc: "翻斗市区翻斗大街A1104",
						inUse: false,
					}
				]

			}
		},
		onLoad() {

		},
		methods: {
			gotoEdit() {
				console.log("go to edit address...")
				uni.navigateTo({
					url: "/pages/addressbook/addressBookEdit"
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	// 地址项框
	.address-item-bar {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	// 地址项地址信息框
	.address-item {
		color: #000;
		font-size: 16px;
	}
</style>
