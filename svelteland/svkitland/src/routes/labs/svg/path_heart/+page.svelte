<script lang="ts">
	import Grid from '$lib/utils/grid.svelte';
	import type { PageData } from './$types';
	import PathHeart from './path_heart.svelte';
	import { type InteractivePoint, type Point } from '$lib/utils/path.svelte';

	let { data }: { data: PageData } = $props();

	let m = $state({ x: 0, y: 0 });
	let gridWidth = 400;
	let gridHeight = 400;
</script>

<main>
	<h1>Path Heart</h1>

	The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
	<div class="svgContainer">
		<Grid width={gridWidth} height={gridHeight} />
		<div id="coreSvg">
			<PathHeart width={gridWidth} height={gridHeight} />
		</div>
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
		/* align-items: center; */
		/* width: 50%;
		height: 50%; */
		border: 5px dotted var(--accent-color);
		/* z-index: 0; */
	}

	.svgContainer #coreSvg {
		position: absolute;
		/* width: 100%; */
		/* height: 100%; */
		z-index: 1;
	}
</style>
