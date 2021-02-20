<template>
	<div id="swiper">
		<div class="block">
			<slot></slot>
		 </div>
	</div>
</template>

<script>
	
	export default {
		name: 'Swiper',
		props: {
			banners: Array
		},
	}
</script>

<style>
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 150px;
	    margin: 0;
	  }
</style>
