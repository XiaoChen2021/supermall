<template>
	<div id="cart">
		
		<nav-bar class="cart-navbar">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>
		
		<cart-list></cart-list>
		
		<cart-bottom-bar></cart-bottom-bar>
		
	</div>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar'
	
	import CartList from './childComps/CartList'
	import CartBottomBar from './childComps/CartBottomBar'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'Cart',
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			// ...mapGetters(['cartLength'])
			...mapGetters({
				length: 'cartLength'
			})
		}
	}
</script>

<style scoped>
	#cart {
		height: 100vh;
	}
	.cart-navbar {
		background-color: var(--color-tint);
		color: #FFFFFF;
	}
</style>
