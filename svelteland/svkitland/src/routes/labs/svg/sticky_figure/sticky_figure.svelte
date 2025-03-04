<script lang="ts">
	let {
		id = '',
		width = 200,
		height = 200,
		viewBox = '0 0 200 200'
	}: {
		id?: string;
		width?: number;
		height?: number;
		viewBox?: string;
	} = $props();
</script>

<svg {id} {width} {height} {viewBox}> </svg>

<style>
</style>
