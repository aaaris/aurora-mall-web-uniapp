<template>
	<view class="u-wrap">
		<u-navbar :border-bottom="false" title="分类"> </u-navbar>
		<!-- <view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索</text>
			</view>
		</view> -->
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
				:scroll-into-view="itemId">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box"
				@scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item , index) in tabbar" :key="index">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.subCategorys" :key="index1" @click="goSearch(item1)">
								<image class="item-menu-image" :src="item1.icon" mode=""></image>
								<view class="item-menu-name">{{item1.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<navBar></navBar>
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
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				tabbar: [{
						"name": "女装",
						"subCategorys": [{
								"name": "A字裙",
								"key": "A字裙",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
								"cat": 10
							},
							{
								"name": "T恤",
								"key": "T恤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/2.jpg",
								"cat": 10
							},
							{
								"name": "半身裙",
								"key": "半身裙",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/3.jpg",
								"cat": 10
							},
							{
								"name": "衬衫",
								"key": "衬衫",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/4.jpg",
								"cat": 10
							},
							{
								"name": "短裙",
								"key": "短裙",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/5.jpg",
								"cat": 10
							},
							{
								"name": "阔腿裤",
								"key": "阔腿裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/6.jpg",
								"cat": 10
							},
							{
								"name": "连衣裙",
								"key": "连衣裙",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/7.jpg",
								"cat": 10
							},
							{
								"name": "妈妈装",
								"key": "妈妈装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/8.jpg",
								"cat": 10
							},
							{
								"name": "牛仔裤",
								"key": "牛仔裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/9.jpg",
								"cat": 10
							},
							{
								"name": "情侣装",
								"key": "情侣装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/10.jpg",
								"cat": 10
							},
							{
								"name": "休闲裤",
								"key": "休闲裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/11.jpg",
								"cat": 10
							},
							{
								"name": "雪纺衫",
								"key": "雪纺衫",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/12.jpg",
								"cat": 10
							},
							{
								"name": "防晒衣",
								"key": "防晒衣",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/13.jpg",
								"cat": 10
							},
							{
								"name": "礼服/婚纱",
								"key": "礼服婚纱",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/14.jpg",
								"cat": 10
							}
						]
					},
					{
						"name": "美食",
						"subCategorys": [{
								"name": "火锅",
								"key": "火锅",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/1.jpg",
								"cat": 6
							},
							{
								"name": "糕点饼干",
								"key": "糕点饼干",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/2.jpg",
								"cat": 6
							},
							{
								"name": "坚果果干",
								"key": "坚果果干",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/3.jpg",
								"cat": 6
							},
							{
								"name": "酒类",
								"key": "酒类",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/4.jpg",
								"cat": 6
							},
							{
								"name": "辣条",
								"key": "辣条",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/5.jpg",
								"cat": 6
							},
							{
								"name": "大礼包",
								"key": "大礼包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/6.jpg",
								"cat": 6
							},
							{
								"name": "精品茗茶",
								"key": "茶",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/7.jpg",
								"cat": 6
							},
							{
								"name": "休闲食品",
								"key": "休闲食品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/8.jpg",
								"cat": 6
							},
							{
								"name": "糖果巧克力",
								"key": "糖果巧克力",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/9.jpg",
								"cat": 6
							},
							{
								"name": "方便速食",
								"key": "方便速食",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/10.jpg",
								"cat": 6
							},
							{
								"name": "营养代餐",
								"key": "营养代餐",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/11.jpg",
								"cat": 6
							},
							{
								"name": "粮油副食",
								"key": "粮油",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/12.jpg",
								"cat": 6
							},
							{
								"name": "生鲜水果",
								"key": "水果",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/13.jpg",
								"cat": 6
							},
							{
								"name": "饮品",
								"key": "饮品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/14.jpg",
								"cat": 6
							}
						]
					},
					{
						"name": "美妆",
						"subCategorys": [{
								"name": "化妆刷",
								"key": "化妆刷",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/1.jpg",
								"cat": 3
							},
							{
								"name": "粉底",
								"key": "粉底",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/2.jpg",
								"cat": 3
							},
							{
								"name": "洗发护发",
								"key": "洗发护发",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/3.jpg",
								"cat": 3
							},
							{
								"name": "美容工具",
								"key": "美容工具",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/4.jpg",
								"cat": 3
							},
							{
								"name": "眼部护理",
								"key": "眼部护理",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/5.jpg",
								"cat": 3
							},
							{
								"name": "眉妆",
								"key": "眉妆",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/6.jpg",
								"cat": 3
							},
							{
								"name": "卸妆品",
								"key": "卸妆品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/7.jpg",
								"cat": 3
							},
							{
								"name": "基础护肤",
								"key": "基础护肤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/8.jpg",
								"cat": 3
							},
							{
								"name": "眼妆",
								"key": "眼妆",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/9.jpg",
								"cat": 3
							},
							{
								"name": "唇妆",
								"key": "唇妆",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/10.jpg",
								"cat": 3
							},
							{
								"name": "面膜",
								"key": "面膜",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/11.jpg",
								"cat": 3
							},
							{
								"name": "沐浴用品",
								"key": "沐浴用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/12.jpg",
								"cat": 3
							},
							{
								"name": "护肤套装",
								"key": "护肤套装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/13.jpg",
								"cat": 3
							},
							{
								"name": "防晒品",
								"key": "防晒品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/14.jpg",
								"cat": 3
							},
							{
								"name": "美甲",
								"key": "美甲",
								"icon": "https://cdn.uviewui.com/uview/common/classify/3/15.jpg",
								"cat": 3
							}

						]
					},
					{
						"name": "居家日用",
						"subCategorys": [{
								"name": "垃圾袋",
								"key": "垃圾袋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/1.jpg",
								"cat": 4
							},
							{
								"name": "纸巾",
								"key": "纸巾",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/2.jpg",
								"cat": 4
							},
							{
								"name": "驱蚊用品",
								"key": "驱蚊用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/3.jpg",
								"cat": 4
							},
							{
								"name": "收纳神器",
								"key": "收纳神器",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/4.jpg",
								"cat": 4
							},
							{
								"name": "厨房用品",
								"key": "厨房用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/5.jpg",
								"cat": 4
							},
							{
								"name": "厨房烹饪",
								"key": "烹饪",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/6.jpg",
								"cat": 4
							},
							{
								"name": "衣物晾晒",
								"key": "衣物晾晒",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/7.jpg",
								"cat": 4
							},
							{
								"name": "衣物护理",
								"key": "衣物护理",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/8.jpg",
								"cat": 4
							},
							{
								"name": "宠物用品",
								"key": "宠物用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/9.jpg",
								"cat": 4
							},
							{
								"name": "医药保健",
								"key": "医药",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/10.jpg",
								"cat": 4
							},
							{
								"name": "日用百货",
								"key": "百货",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/11.jpg",
								"cat": 4
							},
							{
								"name": "清洁用品",
								"key": "清洁",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/12.jpg",
								"cat": 4
							},
							{
								"name": "绿植园艺",
								"key": "绿植",
								"icon": "https://cdn.uviewui.com/uview/common/classify/4/13.jpg",
								"cat": 4
							}
						]
					},
					{
						"name": "男装",
						"subCategorys": [{
								"name": "爸爸装",
								"key": "爸爸装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/1.jpg",
								"cat": 12
							},
							{
								"name": "牛仔裤",
								"key": "牛仔裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/2.jpg",
								"cat": 12
							},
							{
								"name": "衬衫",
								"key": "衬衫",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/3.jpg",
								"cat": 12
							},
							{
								"name": "休闲裤",
								"key": "休闲裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/4.jpg",
								"cat": 12
							},
							{
								"name": "外套",
								"key": "外套",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/5.jpg",
								"cat": 12
							},
							{
								"name": "T恤",
								"key": "T恤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/6.jpg",
								"cat": 12
							},
							{
								"name": "套装",
								"key": "套装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/7.jpg",
								"cat": 12
							},
							{
								"name": "运动裤",
								"key": "运动裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/8.jpg",
								"cat": 12
							},
							{
								"name": "马甲/背心",
								"key": "马甲背心",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/9.jpg",
								"cat": 12
							},
							{
								"name": "POLO衫",
								"key": "POLO衫",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/10.jpg",
								"cat": 12
							},
							{
								"name": "商务装",
								"key": "商务装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/5/11.jpg",
								"cat": 12
							}
						]
					},
					{
						"name": "鞋品",
						"subCategorys": [{
								"name": "单鞋",
								"key": "单鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/1.jpg",
								"cat": 5
							},
							{
								"name": "皮鞋",
								"key": "皮鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/2.jpg",
								"cat": 5
							},
							{
								"name": "帆布鞋",
								"key": "帆布鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/3.jpg",
								"cat": 5
							},
							{
								"name": "北京老布鞋",
								"key": "北京老布鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/4.jpg",
								"cat": 5
							},
							{
								"name": "运动鞋",
								"key": "运动鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/5.jpg",
								"cat": 5
							},
							{
								"name": "拖鞋",
								"key": "拖鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/6.jpg",
								"cat": 5
							},
							{
								"name": "凉鞋",
								"key": "凉鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/7.jpg",
								"cat": 5
							},
							{
								"name": "休闲鞋",
								"key": "休闲鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/8.jpg",
								"cat": 5
							},
							{
								"name": "高跟鞋",
								"key": "高跟鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/9.jpg",
								"cat": 5
							},
							{
								"name": "老人鞋",
								"key": "老人鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/10.jpg",
								"cat": 5
							},
							{
								"name": "懒人鞋",
								"key": "懒人鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/6/11.jpg",
								"cat": 5
							}
						]
					},
					{
						"name": "数码家电",
						"subCategorys": [{
								"name": "数据线",
								"key": "数据线",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/1.jpg",
								"cat": 8
							},
							{
								"name": "耳机",
								"key": "耳机",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/2.jpg",
								"cat": 8
							},
							{
								"name": "生活家电",
								"key": "家电",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/3.jpg",
								"cat": 8
							},
							{
								"name": "电风扇",
								"key": "电风扇",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/4.jpg",
								"cat": 8
							},
							{
								"name": "电吹风",
								"key": "电吹风",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/5.jpg",
								"cat": 8
							},
							{
								"name": "手机壳",
								"key": "手机壳",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/6.jpg",
								"cat": 8
							},
							{
								"name": "榨汁机",
								"key": "榨汁机",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/7.jpg",
								"cat": 8
							},
							{
								"name": "小家电",
								"key": "小家电",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/8.jpg",
								"cat": 8
							},
							{
								"name": "数码电子",
								"key": "数码",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/9.jpg",
								"cat": 8
							},
							{
								"name": "电饭锅",
								"key": "电饭锅",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/10.jpg",
								"cat": 8
							},
							{
								"name": "手机支架",
								"key": "手机支架",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/11.jpg",
								"cat": 8
							},
							{
								"name": "剃须刀",
								"key": "剃须刀",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/12.jpg",
								"cat": 8
							},
							{
								"name": "充电宝",
								"key": "充电宝",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/13.jpg",
								"cat": 8
							},
							{
								"name": "手机配件",
								"key": "手机配件",
								"icon": "https://cdn.uviewui.com/uview/common/classify/7/14.jpg",
								"cat": 8
							}
						]
					},
					{
						"name": "母婴",
						"subCategorys": [{
								"name": "婴童服饰",
								"key": "衣服",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/1.jpg",
								"cat": 2
							},
							{
								"name": "玩具乐器",
								"key": "玩具乐器",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/2.jpg",
								"cat": 2
							},
							{
								"name": "尿不湿",
								"key": "尿不湿",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/3.jpg",
								"cat": 2
							},
							{
								"name": "安抚牙胶",
								"key": "安抚牙胶",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/4.jpg",
								"cat": 2
							},
							{
								"name": "奶瓶奶嘴",
								"key": "奶瓶奶嘴",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/5.jpg",
								"cat": 2
							},
							{
								"name": "孕妈用品",
								"key": "孕妈用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/6.jpg",
								"cat": 2
							},
							{
								"name": "宝宝用品",
								"key": "宝宝用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/7.jpg",
								"cat": 2
							},
							{
								"name": "婴童湿巾",
								"key": "湿巾",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/8.jpg",
								"cat": 2
							},
							{
								"name": "喂养洗护",
								"key": "洗护",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/9.jpg",
								"cat": 2
							},
							{
								"name": "婴童鞋靴",
								"key": "童鞋",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/10.jpg",
								"cat": 2
							},
							{
								"name": "口水巾",
								"key": "口水巾",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/11.jpg",
								"cat": 2
							},
							{
								"name": "营养辅食",
								"key": "营养",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/12.jpg",
								"cat": 2
							},
							{
								"name": "婴幼书籍",
								"key": "书籍",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/13.jpg",
								"cat": 2
							},
							{
								"name": "婴儿车",
								"key": "婴儿车",
								"icon": "https://cdn.uviewui.com/uview/common/classify/8/14.jpg",
								"cat": 2
							}
						]
					},
					{
						"name": "箱包",
						"subCategorys": [{
								"name": "单肩包",
								"key": "单肩包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/1.jpg",
								"cat": 0
							},
							{
								"name": "斜挎包",
								"key": "斜挎包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/2.jpg",
								"cat": 0
							},
							{
								"name": "女包",
								"key": "女包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/3.jpg",
								"cat": 0
							},
							{
								"name": "男包",
								"key": "男包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/4.jpg",
								"cat": 0
							},
							{
								"name": "双肩包",
								"key": "双肩包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/5.jpg",
								"cat": 0
							},
							{
								"name": "小方包",
								"key": "小方包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/6.jpg",
								"cat": 0
							},
							{
								"name": "钱包",
								"key": "钱包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/7.jpg",
								"cat": 0
							},
							{
								"name": "旅行箱包",
								"key": "旅行箱包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/8.jpg",
								"cat": 0
							},
							{
								"name": "零钱包",
								"key": "零钱包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/9.jpg",
								"cat": 0
							},
							{
								"name": "手提包",
								"key": "手提包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/10.jpg",
								"cat": 0
							},
							{
								"name": "胸包",
								"key": "胸包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/9/11.jpg",
								"cat": 0
							}
						]
					},
					{
						"name": "内衣",
						"subCategorys": [{
								"name": "袜子",
								"key": "袜子",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/1.jpg",
								"cat": 11
							},
							{
								"name": "吊带背心",
								"key": "吊带背心",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/2.jpg",
								"cat": 11
							},
							{
								"name": "抹胸",
								"key": "抹胸",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/3.jpg",
								"cat": 11
							},
							{
								"name": "内裤",
								"key": "内裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/4.jpg",
								"cat": 11
							},
							{
								"name": "文胸",
								"key": "文胸",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/5.jpg",
								"cat": 11
							},
							{
								"name": "文胸套装",
								"key": "文胸套装",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/6.jpg",
								"cat": 11
							},
							{
								"name": "打底塑身",
								"key": "打底塑身",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/7.jpg",
								"cat": 11
							},
							{
								"name": "家居服",
								"key": "家居服",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/8.jpg",
								"cat": 11
							},
							{
								"name": "船袜",
								"key": "船袜",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/9.jpg",
								"cat": 11
							},
							{
								"name": "情侣睡衣",
								"key": "情侣睡衣",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/10.jpg",
								"cat": 11
							},
							{
								"name": "丝袜",
								"key": "丝袜",
								"icon": "https://cdn.uviewui.com/uview/common/classify/10/11.jpg",
								"cat": 11
							}
						]
					},
					{
						"name": "文娱车品",
						"subCategorys": [{
								"name": "车市车品",
								"key": "车市车品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/1.jpg",
								"cat": 7
							},
							{
								"name": "办公文具",
								"key": "办公文具",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/2.jpg",
								"cat": 7
							},
							{
								"name": "考试必备",
								"key": "考试必备",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/3.jpg",
								"cat": 7
							},
							{
								"name": "笔记本",
								"key": "笔记本",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/4.jpg",
								"cat": 7
							},
							{
								"name": "艺术礼品",
								"key": "礼品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/5.jpg",
								"cat": 7
							},
							{
								"name": "书写工具",
								"key": "书写工具",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/6.jpg",
								"cat": 7
							},
							{
								"name": "车载电器",
								"key": "车载电器",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/7.jpg",
								"cat": 7
							},
							{
								"name": "图书音像",
								"key": "图书音像",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/8.jpg",
								"cat": 7
							},
							{
								"name": "画具画材",
								"key": "画具画材",
								"icon": "https://cdn.uviewui.com/uview/common/classify/11/9.jpg",
								"cat": 7
							}
						]
					},
					{
						"name": "配饰",
						"subCategorys": [{
								"name": "太阳镜",
								"key": "太阳镜",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/1.jpg",
								"cat": 0
							},
							{
								"name": "皮带",
								"key": "皮带",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/2.jpg",
								"cat": 0
							},
							{
								"name": "棒球帽",
								"key": "棒球帽",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/3.jpg",
								"cat": 0
							},
							{
								"name": "手表",
								"key": "手表",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/4.jpg",
								"cat": 0
							},
							{
								"name": "发饰",
								"key": "发饰",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/5.jpg",
								"cat": 0
							},
							{
								"name": "项链",
								"key": "项链",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/6.jpg",
								"cat": 0
							},
							{
								"name": "手饰",
								"key": "手饰",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/7.jpg",
								"cat": 0
							},
							{
								"name": "耳环",
								"key": "耳环",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/8.jpg",
								"cat": 0
							},
							{
								"name": "帽子丝巾",
								"key": "帽子丝巾",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/9.jpg",
								"cat": 0
							},
							{
								"name": "眼镜墨镜",
								"key": "眼镜墨镜",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/10.jpg",
								"cat": 0
							},
							{
								"name": "发带发箍",
								"key": "发带发箍",
								"icon": "https://cdn.uviewui.com/uview/common/classify/12/11.jpg",
								"cat": 0
							}
						]
					},
					{
						"name": "家装家纺",
						"subCategorys": [{
								"name": "家居饰品",
								"key": "家居饰品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/1.jpg",
								"cat": 0
							},
							{
								"name": "凉席",
								"key": "凉席",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/2.jpg",
								"cat": 0
							},
							{
								"name": "背枕靠枕",
								"key": "靠枕",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/3.jpg",
								"cat": 0
							},
							{
								"name": "床上用品",
								"key": "床上用品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/4.jpg",
								"cat": 0
							},
							{
								"name": "摆件",
								"key": "摆件",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/5.jpg",
								"cat": 0
							},
							{
								"name": "四件套",
								"key": "四件套",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/6.jpg",
								"cat": 0
							},
							{
								"name": "装饰品",
								"key": "装饰品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/7.jpg",
								"cat": 0
							},
							{
								"name": "卫浴用品",
								"key": "卫浴",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/8.jpg",
								"cat": 0
							},
							{
								"name": "家居家装",
								"key": "家具",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/9.jpg",
								"cat": 0
							},
							{
								"name": "蚊帐",
								"key": "蚊帐",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/10.jpg",
								"cat": 0
							},
							{
								"name": "墙纸贴纸",
								"key": "墙纸",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/11.jpg",
								"cat": 0
							},
							{
								"name": "空调被",
								"key": "空调被",
								"icon": "https://cdn.uviewui.com/uview/common/classify/13/12.jpg",
								"cat": 0
							}
						]
					},
					{
						"name": "户外运动",
						"subCategorys": [{
								"name": "游泳装备",
								"key": "游泳",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/1.jpg",
								"cat": 0
							},
							{
								"name": "泳镜",
								"key": "泳镜",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/2.jpg",
								"cat": 0
							},
							{
								"name": "户外装备",
								"key": "户外",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/3.jpg",
								"cat": 0
							},
							{
								"name": "健身服饰",
								"key": "健身",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/4.jpg",
								"cat": 0
							},
							{
								"name": "泳衣",
								"key": "泳衣",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/5.jpg",
								"cat": 0
							},
							{
								"name": "瑜伽垫",
								"key": "瑜伽垫",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/6.jpg",
								"cat": 0
							},
							{
								"name": "瑜伽用品",
								"key": "瑜伽",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/7.jpg",
								"cat": 0
							},
							{
								"name": "健身装备",
								"key": "健身",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/8.jpg",
								"cat": 0
							},
							{
								"name": "球迷用品",
								"key": "球迷",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/9.jpg",
								"cat": 0
							}
						]
					}
				],
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器

			}
		},
		onLoad(query) {
			uni.$on('gotoCategory', (obj) => {
				if (obj.index) {
						console.log(obj.index)
					this.swichMenu(obj.index)
				}
			})
		},
		onUnload() {
			uni.$off('gotoCategory')
		},
		onReady() {
			this.getMenuItemTop()
		},
		methods: {
			// 跳转搜索页
			goSearch(subCategory) {
				uni.navigateTo({
					url:`/pages/search/searchResult?keyword=${subCategory.name}`
				})
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (this.timer) return;
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return;
						}
					}
				}, 10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item:last-child {
		min-height: 100vh;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
