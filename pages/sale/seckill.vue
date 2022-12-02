<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar :background="{
		background: 'linear-gradient(to right, #00baad 0%, #7948ea 95%)'}" :border-bottom="false" title-color="#fff"
			back-icon-color="#fff" title="秒杀活动"></u-navbar>
		<!-- 搜索框 -->
		<view class="u-p-30 bgc-aurora">
			<u-search v-model="keyword" :showAction="false" :disabled="true" @click="gotoSearch"></u-search>
		</view>
		<!-- tab栏 -->
		<view>
			<u-tabs :isScroll="false" v-model="current" :list="[{name:'正在疯抢'},{name:'抢先看'}]" active-color="#dd524d"
				@change="changeTab"></u-tabs>
			<prodList v-if="current === 0" :list="tabList1" :isKill="true"></prodList>
			<prodList v-if="current === 1" :list="tabList2" :isKill="true"></prodList>
			<u-loadmore :status="loadStatu" bgColor="#f2f2f2" @loadmore="getOrderList"></u-loadmore>
		</view>
	</view>
</template>

<script>
	import prodList from "@/components/prodList.vue"
	export default {
		components: {
			prodList
		},
		data() {
			return {
				current: 0,
				keyword: "",
				searchBtnStyle: {
					background: 'linear-gradient(to right, #00baad 0%, #7948ea 95%)',
					color: "#fff",
					borderRadius: "10px",
					zIndex: "998",
					position: "relative",
					left: "-50px"
				},
				loadStatu: 'loadmore',
				prodList: [],
				tabList1: [],
				tabList2: []
			}
		},
		onLoad() {
			this.prodList = [{
					goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
					title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
					price: '348.58',
					date: "1668300000000",
					progress: 33
				}, {
					goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
					title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
					type: '4K，广色域',
					deliveryTime: '珍藏10年好酒',
					price: '1543',
					date: "1668300000000",
					progress: 33
				},
				{
					goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
					title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
					type: '一打',
					deliveryTime: '口感好',
					price: '120',
					date: "1768900000000",
					progress: 0
				}, {
					goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
					title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
					type: '容量大，速冻',
					deliveryTime: '保质5年',
					price: '2354',
					date: "1768900000000",
					progress: 0
				}
			]
			console.log(this.prodList)
			this.tabList1 = this.prodList.filter(p => Date.now() > p.date)
			this.tabList2 = this.prodList.filter(p => p.date > Date.now())
		},
		onReachBottom() {
			console.log("loading...")
			this.loadStatu = "loading"
			setTimeout(() => {
				this.getOrderList();
			}, 1200);
		},
		methods: {
			getOrderList() {
				for (let i = 0; i < 3; i++) {
					let index = this.$u.random(0, this.prodList.length - 1)
					let data = JSON.parse(JSON.stringify(this.prodList[index]))
					this.prodList.push(data)
				}
				this.tabList1 = this.prodList.filter(p => Date.now() > p.date)
				this.tabList2 = this.prodList.filter(p => p.date > Date.now())
				this.loadStatu = 'loadmore'
			},
			changeTab(idx) {
				this.current = idx
			},
			gotoSearch() {
				this.$u.route("/pages/search/search")
			}
		}
	}
</script>

<style lang="scss">
	.bgc-aurora {
		background: linear-gradient(to right, #00baad 0%, #7948ea 95%);
	}
</style>
