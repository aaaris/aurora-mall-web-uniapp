<template>
	<view>
		<!-- 嵌入搜索框的头部导航 -->
		<u-navbar :border-bottom="false">
			<view style="padding-left: 10rpx;">
				<u-search v-model="keyword" :actionStyle="searchBtnStyle" @search="searchSubmit" @custom="searchSubmit">
				</u-search>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:""
			};
		}
	}
</script>

<style lang="scss">

</style>
