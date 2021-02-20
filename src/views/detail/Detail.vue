<template>
	<div id="detail">
		<detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="detailnb"></detail-nav-bar>
		<scroll class="content" ref="scroll"
						:probe-type="3" @scroll="cscroll">
			<detail-swiper :topImages="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			<detail-param-info   ref="param" :paramInfo="paramInfo"/>
			<detail-comment-info ref="comment" :commentInfo="commentInfo"/>
			<detail-recommend-info ref="recommend" :recommendList="recommendList"/>
		</scroll>
		
		<back-top v-show="isShowBackTop" @click.native="backTop"/>
		
		<detail-bottom-bar @addCart="addToCart"/>
		<toast></toast>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwpier'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailRecommendInfo from './childComps/DetailRecommendInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import {debounce} from '@/common/utils'
	import {itemListenMixin, backTopMixin} from '@/common/mixin'
	
	import Scroll from '@/components/common/scroll/Scroll'
	import BackTop from '@/components/content/backTop/BackTop'
	import Toast from '@/components/common/toast/Toast'
	
	import {getDetail, Goods, shop, GoodsParam, getRecommend} from '@/network/detail'
	
	import { mapActions } from 'vuex'
	
	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailRecommendInfo,
			DetailBottomBar,
			Scroll,
			BackTop,
			Toast
		},
		mixins: [backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommendList: [],
				themeTopYs: [],
				getThemeTopY: null,
				itemImgListen: null,
				
				message: '',
				show: false
			}
		},
		// deactivated() {
		// 	console.log('likai')
		// },
		// activated() {
		// 	console.log('jinlai')
		// },
		created() {
			//保存传入的iid
			// console.log(this.$route.params)
			this.iid = this.$route.params.iid
			
			//根据iid请求数据
			getDetail(this.iid).then(res => {
				// console.log(res)
				const data = res.result
				//顶部的图片数据
				this.topImages = res.result.itemInfo.topImages
				
				//商品信息数据
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				
				//商家信息
				this.shop = new shop(data.shopInfo)
				
				//保存商品详情数据
				this.detailInfo = data.detailInfo
				
				//参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				
				//评论信息
				if(data.rate.list) {
					this.commentInfo = data.rate.list[0]
				}
				
				this.getThemeTopY = debounce(() => {
					this.themeTopYs = []
					this.themeTopYs.push(0)
					this.themeTopYs.push(this.$refs.param.$el.offsetTop)
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
					// console.log(this.themeTopYs)
				})
				
			})
			
			getRecommend().then(res => {
				console.log(res.data.list)
				this.recommendList = res.data.list
			})
			
			
		},
		destroyed() {
			this.$bus.$off('itemImgListen', this.itemImgListen)
			// console.log('xiaohui')
		},
		methods: {
			...mapActions(['addCart']),
			cscroll(position) {
				this.isShowBackTop = (-position.y) > 1000
				const y = -position.y
				const topY = this.themeTopYs
				
				// console.log(cIndex)
				if(y >= 0 && y < topY[1]) {
					this.$refs.detailnb.currentIndex = 0
				}else if(y >= topY[1] && y < topY[2]) {
					this.$refs.detailnb.currentIndex = 1
				}else if(y >= topY[2] && y < topY[3]) {
					this.$refs.detailnb.currentIndex = 2
				}else if(y >= topY[3]) {
					this.$refs.detailnb.currentIndex = 3
				}
			},
			titleClick(index) {
				// console.log(index)
				// console.log(-this.themeTopYs[index])
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
			},
			imageLoad() {
				this.$refs.scroll.refresh()
				// console.log(this.$refs.scroll)
				this.getThemeTopY()
			},
			addToCart() {
				//获取购物车需要展示的信息
				const product = {}
				product.iid = this.iid
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.nowPrice
				// console.log(product)
				
				//将商品添加到购物车
				this.addCart(product).then(res => {
					// console.log(res)
					// this.show = true
					// this.message = res
					// setTimeout(() => {
					// 	this.show = false
					// 	this.message = ''
					// }, 1000)
					this.$toast.show(res, 1500)
				})
				
				// this.$store.dispatch('addCart', product).then(res => {
				// 	console.log(res)
				// })
				
			}
		},
		mounted() {
			const refresh = debounce(this.$refs.scroll.refresh,200)
			this.itemImgListen = () => {
				refresh()
			}
			this.$bus.$on('itemImageLoad', this.itemImgListen)
		}
	}
</script>

<style scoped>
	.detail-navbar {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.content {
		height: calc(100% - 44px - 58px);
	}
</style>
