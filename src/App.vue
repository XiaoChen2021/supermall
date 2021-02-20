<template>
  <div id="app">
		<keep-alive exclude="Detail">
			<router-view></router-view>
		</keep-alive>
    <maintabbar class="maintabbar"></maintabbar>
  </div>
</template>

<script>
	import maintabbar from '@/components/content/maintabbar/MainTabbar.vue'

export default {
  name: 'App',
  components: {
    maintabbar
  }
}
</script>

<style scoped>
	@import url("assets/css/base.css");
	
	.maintabbar {
		position: absolute;
		z-index: 2;
	}
</style>
