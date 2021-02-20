<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="titles"
									@changeType="changeType" 
									ref="tabControl1" 
									class="tab-control" v-show="isFixed"/>
		<scroll class="content" ref="scroll" 
						:probe-type="3" @scroll="cscroll" 
						:pull-up-load="true" @pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
			<home-recommend-view :recommends="recommend"/>
			<home-feature/>
			<tab-control :titles="titles" 
										@changeType="changeType" 
										ref="tabControl2"
										:class="{isfixe: isFixed}"/>
			<goods-list :goods="showGoods" class="goodslist"/>
		</scroll>
		
		<back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
		
	</div>
</template>

<script>
	import homeSwiper from './childComps/homeSwiper'
	import homeRecommendView from './childComps/homeRecommendView'
	import homeFeature from './childComps/homeFeature'
	
	import NavBar from '@/components/common/navbar/NavBar'
	import TabControl from '@/components/content/tabControl/TabControl'
	import GoodsList from '@/components/content/goods/GoodsList'
	import Scroll from '@/components/common/scroll/Scroll'
	import BackTop from '@/components/content/backTop/BackTop'
	
	import {getHomeMultidata, getHomeGoods} from '@/network/home'
	
	import {debounce} from '@/common/utils'
	import {backTopMixin} from '@/common/mixin'
	
	
	export default {
		name: 'Home',
		components: {
			homeSwiper,
			homeRecommendView,
			homeFeature,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		mixins: [backTopMixin],
		data() {
			return {
				banners: [],
				recommend: [],
				titles: ['流行', '新款', '精选'],
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				currentType: 'pop',
				itemImgListen: null,
				tabOffsetTop: 0,
				isFixed: false,
				saveY: 0,
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		activated() {
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			this.$refs.scroll.refresh()
			this.$bus.$on('itemImageLoad', () => {
				this.$refs.scroll.refresh()
			})
		},
		deactivated() {
			//保存y值
			this.saveY = this.$refs.scroll.getScrollY()
			
			//取消全局事件的监听
			this.$bus.$off('itemImageLoad', this.itemImgListen)
		},
		created() {
			//1.请求多个数据
			this.getHomeMultidata()
			
			//商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
		},
		mounted() {
			// const refresh = debounce(this.$refs.scroll.refresh,200)
			// this.itemImgListen = () => {
			// 	refresh()
			// }
			
		},
		methods: {
			/**
			 * 网络请求相关
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// console.log(res)
					this.banners = res.data.banner.list
					this.recommend = res.data.recommend.list
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					// console.log(res)
					this.goods[type].list.push(...res.data.list)
					// console.log(this.goods[type].list)
					this.goods[type].page += 1
					
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			},
			
			/**
			 * 事件监听
			 */
			changeType(index) {
				this.currentType = Object.keys(this.goods)[index]
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			cscroll(position){
				// console.log(position)
				// position.y < -1000 ? this.isShowBackTop = true : this.isShowBackTop = false
				//判断backtop是否显示
				this.isShowBackTop = (-position.y) > 1000
				
				//决定tabcontrol是否吸顶(position：fixed)
				this.isFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
				
				// this.$refs.scroll.scroll.refresh()
			},
			swiperImageLoad() {
				//获取tabControl的offsetTop
				//所有组件都有一个属性$el：用于获取组件中的元素
				// console.log(this.$refs.tabControl.$el.offsetTop)
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			}
		}
	}
</script>

<style scoped>
	#home {
		height: 100vh;
		position: relative;
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #FFFFFF;
		
	/* 	position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 999; */
	}
	.home-banners {
		margin-top: 0.5px;
	}
	
	.tab-control {
		position: relative;
		z-index: 9;
	}
	
	.content {
		/* height: 300px; */
		overflow: hidden;
		
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	/* .content {
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>
