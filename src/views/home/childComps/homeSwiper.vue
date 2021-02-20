<template>
	<swiper class="home-banners" >
		<el-carousel arrow="nerver" trigger="click" height="200px">
			<el-carousel-item v-for="item in banners" :key="item.image">
				<a :href="item.link">
					<img :src="item.image" alt="" @load="imageLoad">
				</a>
			</el-carousel-item>
		</el-carousel>
	</swiper>
</template>

<script>
	import Swiper from '@/components/common/swiper/Swiper'
	
	export default {
		name: 'homeSwiper',
		data() {
			return {
				isLoad: false
			}
		},
		components: {
			Swiper
		},
		props: {
			banners: {
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
