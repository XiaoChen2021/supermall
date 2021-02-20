<template>
		<!-- <swiper class="detail-swiper">
			<swiper-item v-for="item in topImages">
				<img :src="item" alt="">
			</swiper-item>
		</swiper> -->
		<swiper class="detail-swiper">
			<el-carousel trigger="click" height="350px" arrow="never" indicator-position="none">
				<el-carousel-item v-for="item in topImages" :key="item.image">
						<img :src="item" alt="" @load="imageLoad">
				</el-carousel-item>
			</el-carousel>
		</swiper>
</template>

<script>
	// import {Swiper, SwiperItem} from '@/components/common/swiper'
	import Swiper from '@/components/common/swiper/Swiper'
	
	export default {
		name: 'DetailSwpier',
		components: {
			// Swiper,
			// SwiperItem,
			Swiper
		},
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
		methods: {
			imageLoad() {
				if(!this.isLoad) {
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}
			}
		}
	}
</script>

<style scoped>
	img {
	  width: 100%;
	}
</style>
