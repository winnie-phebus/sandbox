<script lang="ts">
	import type { PageData } from './$types';
	import PathHeart from './path_heart.svelte';

	let { data }: { data: PageData } = $props();
</script>

<main>
	<!-- <h1>{data.title}</h1> -->
	<!-- <p>{data.description}</p> -->
	<!-- <RoundHeart {...data.props} /> -->
	<h1>Path Heart</h1>
	<div class="svgContainer">
		<PathHeart />
	</div>
</main>

<style>
	main {
		--fill-color: palevioletred;
		--primary-color: red;
		--on-primary: white;
		--accent-color: pink;
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.svgContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 5px dotted var(--accent-color);
	}
</style>
