<template>
	<view>
		<u-navbar :border-bottom="false" title="编辑收货地址"></u-navbar>
		<view>
			<!-- 地址编辑表单 -->
			<u-card padding="0 30" :show-head="false" :show-foot="false" :border-bottom="false" border-radius="20">
				<view slot="body" class="edit-form-bar">
					<u-form :model="addressForm" ref="addressForm">
						<u-form-item label="姓名" label-width="150" :label-style="labelStyle" prop="name">
							<u-input v-model="addressForm.name" placeholder="姓名"></u-input>
						</u-form-item>
						<u-form-item label="手机号" label-width="150" :label-style="labelStyle" prop="phone">
							<u-input v-model="addressForm.phone" placeholder="手机号"></u-input>
						</u-form-item>
						<u-form-item label="地区" label-width="150" :label-style="labelStyle" prop="region">
							<u-input v-model="addressForm.region" type="select" @click="show = true" />
							<template>
								<u-picker mode="region" v-model="show" @confirm="getRegion"></u-picker>
							</template>
						</u-form-item>
						<u-form-item label="详细地址" label-width="150" :border-bottom="false" prop="desc">
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
				<u-button type="error" ripple shape="circle" @click="saveAddr">保存</u-button>
				<u-button type="primary" ripple shape="circle" @click="delAddr">删除</u-button>
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
				// 地址表单
				addressForm: {
					name: "",
					phone: "",
					desc: "",
					region: "",
					inUse: false
				},
				// 表单label样式
				labelStyle: {
					fontSize: "16px",
					color: "#000"
				},
				// 校验规则
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: ['blur', 'change']
						},
						// 正则判断为字母或数字
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '只能包含字母或数字'
						},
						// 6-8个字符之间的判断
						{
							min: 2,
							max: 8,
							message: '长度在2-8个字符之间'
						}
					],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					region: [{
							required: true,
							message: '请选择地区',
							trigger: ['blur', 'change'],
					}],
					desc: [{
							required: true,
							message: '请输入街道，门牌号',
							trigger: ['blur', 'change'],
						},
						// 正则判断为字母或数字
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '只能包含字母或数字'
						},
						// 6-8个字符之间的判断
						{
							min: 5,
							max: 30,
							message: '长度在5-30个字符之间'
						}
					]
				},
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
				this.addressForm.region = ""
				this.addressForm.region = res.province.name + res.city.name + res.area.name
			},
			// 保存收货地址
			saveAddr() {
				this.$refs.addressForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uni.navigateBack({
							success: () => {
								uni.showToast({
									icon:'success',
									title:'保存成功'
								})
							}
						})
					}  
				});
			},
			// 删除收货地址
			delAddr() {
				uni.showModal({
					title:'温馨提示',
					content:'确定要删除该地址吗？',
					complete: (res) => {
						if (res.complete) {
							uni.showToast({
								icon:'success',
								title:'删除成功！',
							})
						}
					}
				})
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
