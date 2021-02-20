<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" class="tab-control-item"
			@click="itemClick(index)" 
			:class="{active:currentIndex==index}">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabControl',
		props: {
			titles: {
				type: Array,
				default() {
					return []
				}
			},
			// type: {
			// 	type: String,
			// 	default() {
			// 		return ''
			// 	}
			// }
		},
		data() {
			return {
				currentIndex: 0,
				// typeList: ['pop', 'new', 'sell'],
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
				// const type = this.typeList[index]
				// this.$parent.type = type
				this.$emit('changeType', index)
			}
		}
	}
</script>

<style>
	.tab-control {
		display: flex;
		text-align: center;
		height: 2.5rem;
		line-height: 2.5rem;
		background-color: #FFFFFF;
	}
	.tab-control-item {
		flex: 1;
	}
	.tab-control-item span {
		padding: 5px;
	}
	.active span {
		color: var(--color-high-text);
		border-bottom: 3px solid var(--color-tint);
	}
</style>
