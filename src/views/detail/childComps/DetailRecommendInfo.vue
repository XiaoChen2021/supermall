<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
		<div class="gv">
      <goods-list-item v-for="(item, index) in recommendList" 
									:key="index" 
									:goodsItem="item"></goods-list-item>
		</div>
		<!-- <div v-for="item in recommendList">{{item}}</div> -->
  </div>
</template>

<script>
  import GridView from '@/components/common/gridView/GridView'
  import GoodsListItem from '@/components/content/goods/GoodsListItem'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  GridView,
      GoodsListItem
    },
    props: {
		  recommendList: {
		    type: Array
      }
    }
	}
</script>

<style scoped>
	.gv {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 2px;
	}
  /* .recommend-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
    padding: 5px;
  } */

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
