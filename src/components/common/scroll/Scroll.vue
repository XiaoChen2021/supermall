<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		name: 'Scroll',
		data() {
			return {
				scroll: null
			}
		},
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			//创建Bscroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad,
				useTransition: false
			})
			
			//监听滚动的位置
			if(this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (postion) => {
					// console.log(postion)
					this.$emit('scroll', postion)
				})
			}
			
			//监听滚动到底部
			if(this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					// console.log('123')
					// this.scroll.finishPullUp()
					this.$emit('pullingUp')
				})
			}
		},
		methods: {
			scrollTo(x, y, time = 300) {
				this.scroll && this.scroll.scrollTo(x, y, time)
			},
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp()
			},
			refresh() {
				// console.log('222')
				this.scroll && this.scroll.refresh()
			},
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style>
</style>
