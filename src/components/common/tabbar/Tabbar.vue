<template>
	<div id="app">
	 <div id="tabbar">
		 <slot></slot>
	 </div>
	</div>
</template>

<script>
	export default{
		name:'Tabbar'
	}
</script>

<style>
	#tabbar{
		display: flex;
		background-color: #f6f6f6;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow: 0 -2px 7px rgba(100,100,100,.1);
	}

</style>
