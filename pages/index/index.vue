<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<searchInput></searchInput>
		<!-- #endif -->
		
	</view>
	</view>
</template>

<script>
	import searchInput from '../../components/search-input/search-input.vue'
	export default {
		components: {
			searchInput,
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
