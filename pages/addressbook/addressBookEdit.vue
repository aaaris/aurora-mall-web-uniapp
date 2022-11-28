<template>
	<view>
		<u-navbar :border-bottom="false" title="编辑收货地址"></u-navbar>
		<view>
			<!-- 地址编辑表单 -->
			<u-card padding="0 30" :show-head="false" :show-foot="false" :border-bottom="false" border-radius="20">
				<view slot="body" class="edit-form-bar">
					<u-form :model="addressForm" ref="addressForm">
						<u-form-item label="姓名" label-width="150" :label-style="labelStyle">
							<u-input v-model="addressForm.name" placeholder="姓名"></u-input>
						</u-form-item>
						<u-form-item label="手机号" label-width="150" :label-style="labelStyle">
							<u-input v-model="addressForm.phone" placeholder="手机号"></u-input>
						</u-form-item>
						<u-form-item label="地区" label-width="150" :label-style="labelStyle">
							<u-input v-model="addressForm.region" type="select" @click="show = true" />
							<template>
								<u-picker mode="region" v-model="show" @confirm="getRegion"></u-picker>
							</template>
						</u-form-item>
						<u-form-item label="详细地址" label-width="150" :border-bottom="false">
							<u-input v-model="addressForm.desc" placeholder="详细地址"></u-input>
						</u-form-item>
					</u-form>
				</view>
			</u-card>
			<!-- 选择是否作为默认地址 -->
			<u-card margin="100rpx 30rpx" padding="30" :show-head="false" :showFoot="false" border-radius="20">
				<view slot="body" class="switch-bar">
					<text>是否作为默认地址</text>
					<u-switch v-model="addressForm.inUse"></u-switch>
				</view>
			</u-card>
			<!-- 保存删除按钮 -->
			<view class="btn-bar">
				<u-button type="error" ripple shape="circle">保存</u-button>
				<u-button type="primary" ripple shape="circle">删除</u-button>
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
				addressForm: {
					name: "",
					phone: "",
					desc: "",
					region: "",
					inUse: false
				},
				labelStyle: {
					fontSize: "16px",
					color: "#000"
				},
				rules: [

				],
				show: false,
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.addressForm.setRules(this.rules);
		},
		onLoad(query) {
			if (query.item) {
				this.addressForm = JSON.parse(decodeURIComponent(query.item))
			}
		},
		methods: {
			// 下拉框确认回调函数
			getRegion(res) {
				console.log(res)
				this.addressForm.region = ""
				this.addressForm.region = res.province.name + res.city.name + res.area.name
				console.log(this.addressForm.region)
			}
		}
	}
</script>
<style lang="scss">
	// 页面基础样式
	page {
		background-color: #f7f7f7;
		color: #000;
	}

	.edit-form-bar {}

	// 是否设置为默认地址的复选框
	.switch-bar {
		color: #000;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
	}

	// 保存删除按钮区
	.btn-bar {
		height: 200rpx;
		margin: 100rpx 30rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
