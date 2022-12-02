<template>
	<view>
		<u-navbar :border-bottom="false" title="我的收货地址"></u-navbar>
		<view class="u-flex-col u-row-around">
			<!-- 收货地址项 -->
			<view>
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
						<u-icon name="edit-pen" size="40" @click="gotoEdit(item)"></u-icon>
					</view>
				</u-card>
			</view>
			<view class="u-m-30">
				<u-button type="error" @click="gotoEdit()" shape="circle">新增收货地址</u-button>
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
				addressItemList: [{
						name: "张三",
						phone: "13511111111",
						desc: "翻斗市区翻斗大街A1104",
						region: "",
						inUse: true,
					}, {
						name: "李四",
						phone: "13511111111",
						desc: "翻斗市区翻斗大街A1104",
						region: "",
						inUse: false,
					},
					{
						name: "王五",
						phone: "13511111111",
						desc: "翻斗市区翻斗大街A1104",
						region: "",
						inUse: false,
					}
				]

			}
		},
		onLoad() {

		},
		methods: {
			gotoEdit(target) {
				console.log("go to edit address...")
				if (target)
					uni.navigateTo({
						url: "/pages/addressbook/addressBookEdit?item=" + encodeURIComponent(JSON.stringify(target))
					})
				else {
					uni.navigateTo({
						url: "/pages/addressbook/addressBookEdit"
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.wrap {
		min-height: 100vh;
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
