import {debounce} from '@/common/utils'
	
export const itemListenMixin = {
	data() {
		return {
			itemImgListen: null
		}
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh,200)
		this.itemImgListen = () => {
			// refresh()
			console.log('123')
		}
		this.$bus.$on('itemImageLoad', this.itemImgListen)
	},
}

export const backTopMixin = {
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backTop() {
			this.$refs.scroll.scrollTo(0, 0, 200)
		}
	}
}
