<template>
	<div class="bottom-menu">
	  <check-button class="select-all" @click.native="checkAll" :isChecked="isChecked"></check-button>
	  <span>全选</span>
	  <span class="total-price">合计: ¥{{totalPrice}}</span>
	  <span class="buy-product" @click="calcClick">去计算({{$store.getters.cartLength}})</span>
	</div>
</template>

<script>
	import CheckButton from '@/components/content/checkButton/CheckButton'
	
	export default {
		name: 'CartBottomBar',
		// data() {
		// 	return {
		// 		isChecked: true
		// 	}
		// },
		components: {
			CheckButton
		},
		computed: {
			totalPrice() {
				let total = 0
				for(let item of this.$store.getters.cartList) {
					if(item.checked == true) {
						total += item.price * item.count
					}
				}
				return total.toFixed(2)
			},
			isChecked() {
				if(this.$store.getters.cartList.length === 0) return false
				// return !(this.$store.getters.cartList.filter(item => !item.checked).length)
				return !this.$store.getters.cartList.find(item => !item.checked)
			}
		},
		methods: {
			checkAll() {
				let i = 0
				this.$store.getters.cartList.forEach(item => {
					if(item.checked === false) {
						item.checked = true
						i++
					}
				})
				if(i === 0){
					this.$store.getters.cartList.forEach(item => item.checked = false)
				}
				// let i = 0
				// for(let item of this.$store.getters.cartList) {
				// 	if(item.checked == false) {
				// 		item.checked = true
				// 		i++
				// 	}
				// }
				// if(i === 0) {
				// 	for(let item of this.$store.getters.cartList) {
				// 		item.checked = false
				// 	}
				// }
			},
			calcClick() {
				if(!this.isChecked) {
					this.$toast.show('请选择购买的商品')
				}
				// else {
				// 	// console.log(typeof(this.$store.getters.cartList))
				// 	// this.$store.getters.cartList.splice(0,this.$store.getters.cartList.length)
				// 	// for(let i = 0; i<this.$store.getters.cartList.length; i++){
				// 	// 	if(this.$store.getters.cartList[i].checked === true) {
				// 	// 		this.$store.getters.cartList.splice(i, 1)
				// 	// 	}
				// 	// }
				// 	this.$toast.show('结算成功')
				// }
			}
		},
	}
</script>

<style scoped>
	.bottom-menu {
	  width: 100%;
	  height: 44px;
	  background-color: #eee;
	  position: fixed;
	  bottom: 50px;
	  left: 0;
	  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
	  font-size: 14px;
	  color: #888;
	  line-height: 44px;
	  padding-left: 35px;
	  box-sizing: border-box;
	}
	
	.bottom-menu .select-all {
	  position: absolute;
	  line-height: 0;
	  left: 12px;
	  top: 13px;
	}
	
	.bottom-menu .total-price {
	  margin-left: 15px;
	  font-size: 16px;
	  color: #666;
	}
	
	.bottom-menu .buy-product {
	  background-color: orangered;
	  color: #fff;
	  width: 100px;
	  height: 44px;
	  text-align: center;
	  line-height: 44px;
	  float: right;
	}
</style>
