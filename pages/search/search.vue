<template>
	<view>
		<!-- 嵌入搜索框的导航栏 -->
		<u-navbar :border-bottom="false">
			<view style="padding-left: 10rpx;">
				<u-search v-model="keyword" :actionStyle="searchBtnStyle" @search="searchSubmit" @custom="searchSubmit">
				</u-search>
			</view>
		</u-navbar>
		<!-- 搜索历史记录框 -->
		<view class="search-items-bar">
			<text style="font-size:20px;font-weight: bold;">搜索历史</text>
			&nbsp;&nbsp;&nbsp;
			<u-icon name="trash" @click="clearSearchHistory" size="30"></u-icon>
			<view class="search-history-items">
				<u-button size="mini" plain shape="circle" :custom-style="{margin:'30rpx 10rpx'}"
					@click="hitSearchItem(item.desc)" v-for="(item,index) in searchHistoryList" :key="index">
					{{item.desc}}
				</u-button>
			</view>
		</view>
		<!-- 搜索发现框 -->
		<view class="search-items-bar">
			<text style="font-size:20px;font-weight: bold;">搜索发现</text>
			&nbsp;&nbsp;&nbsp;
			<u-icon :name="(showFind ? 'eye-fill' : 'eye-off')" @click="showFind = !showFind" size="30"></u-icon>
			<view class="search-find-items" v-if="showFind">
				<u-button size="mini" plain shape="circle" :custom-style="{margin:'30rpx 10rpx'}"
					@click="hitSearchItem(item.desc)" v-for="(item,index) in searchFindList" :key="index">
					{{item.desc}}
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showFind: true,
				keyword: "",
				searchBtnStyle: {
					backgroundColor: "#f15d07",
					color: "#fff",
					borderRadius: "10px",
					zIndex: "998",
					position: "relative",
					left: "-50px"
				},
				searchHistoryList: [{
						desc: "电脑配件"
					},
					{
						desc: "洗面奶"
					}
				],
				searchFindList: [{
						desc: "电脑配件"
					},
					{
						desc: "洗面奶"
					}
				]

			};
		},
		onLoad(){
			
		},
		methods: {
			searchSubmit(word) {
				console.log(`submit search keyword ${word}`)
				uni.navigateTo({
					url:`/pages/search/searchResult?keyword=${word}`
				})
			},
			clearSearchHistory() {
				console.log("clear search history")
			},
			hitSearchItem(word) {
				console.log(`hit history btn ${word}`)
				this.searchSubmit(word)
			}
		}
	}
</script>

<style lang="scss">
	// 搜索条项框
	.search-items-bar {
		padding: 30rpx;
	}

	// 搜索历史纪录
	.search-history-items {
		padding: 15rpx;
		display: flex;
	}
	
	// 搜索历史纪录
	.search-find-items {
		padding: 15rpx;
		display: flex;
	}
</style>
