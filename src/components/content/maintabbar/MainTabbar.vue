<template>
	<tabbar>
		<tabbaritem path="/home" activeColor="blue">
			<img slot="item-icon" src="@/assets/img/tabbar/home.svg" >
			<img slot="item-icon-acive" src="@/assets/img/tabbar/home_active.svg" >
			<div slot="item-text">首页</div>
		</tabbaritem>
		<tabbaritem path="/category" activeColor="blue">
			<img slot="item-icon" src="@/assets/img/tabbar/category.svg" >
			<img slot="item-icon-acive" src="@/assets/img/tabbar/category_active.svg" >
			<div slot="item-text">分类</div>
		</tabbaritem>
		<tabbaritem path="/cart" activeColor="blue">
			<img slot="item-icon" src="@/assets/img/tabbar/cart.svg" >
			<img slot="item-icon-acive" src="@/assets/img/tabbar/cart_active.svg" >
			<div slot="item-text">购物车</div>
		</tabbaritem>
		<tabbaritem path="/profile" activeColor="blue">
			<img slot="item-icon" src="@/assets/img/tabbar/profile.svg" >
			<img slot="item-icon-acive" src="@/assets/img/tabbar/profile_active.svg" >
			<div slot="item-text">我的</div>
		</tabbaritem>
	</tabbar>
</template>

<script>
	import tabbar from '@/components/common/tabbar/Tabbar.vue'
	import tabbaritem from '@/components/common/tabbar/TabbarItem.vue'
	
	export default{
		name:'MainTabbar',
		components:{
			tabbar,
			tabbaritem
		}
	}
</script>

<style>
</style>
