<template>
	<div id="ca">
		<scroll class="content">
			<detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
		</scroll>
	</div>
</template>

<script>
	import Scroll from '@/components/common/scroll/Scroll'
	import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
	
	import {getDetail} from '@/network/detail'
	
	export default {
		name: 'Category',
		data() {
			return {
				detailInfo: {}
			}
		},
		components: {
			Scroll,
			DetailGoodsInfo
		},
		created() {
			getDetail('1kihxey').then(res => {
				this.detailInfo = res.result.detailInfo
			})
		}
		// created() {
		// 	let bs = new BScroll('.content', {
		// 		this.BScroll = bs
		// 	})
		// }
		// mounted() {
		// 	this.scroll = new BScroll(document.querySelector('.wrapper'), {
		// 		probeType: 3,
		// 		pullUpLoad: true
		// 	})
			
		// 	this.scroll.on('scroll', (position) => {
		// 		// console.log(position)	
		// 	})
			
		// 	this.scroll.on('pullingUp', () => {
		// 		console.log('123')
		// 		this.scroll.finishPullUp()
		// 	})
		// }
	}
</script>

<style scoped>
	#ca {
		height: 100vh;
		position: relative;
	}
	.content {
		overflow: hidden;
		
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
