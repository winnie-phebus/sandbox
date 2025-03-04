<script lang="ts">
	import Grid from '$lib/utils/grid.svelte';
	import type { PageData } from './$types';
	import { type InteractivePoint, type Point } from '$lib/utils/path.svelte';
	import StickyFigure from './sticky_figure.svelte';

	let { data }: { data: PageData } = $props();

	let gridWidth = 500;
	let gridHeight = 500;
	let stroke = 'blue';
</script>

<main>
	<div class="headers">
		<h1>Sticky Figure</h1>
	</div>
	<div class="body">
		<div class="svgContainer">
			<div class="innerSvg">
				<Grid width={gridWidth} height={gridHeight} {stroke} />
				<div id="coreSvg">
					<StickyFigure width={gridWidth} height={gridHeight} />
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	:root {
		--background-color: aliceblue;
		--fill-color: lightsteelblue;
		--primary-color: cornflowerblue;
		--on-primary: white;
		--accent-color: steelblue;
		background-color: var(--background-color);
	}

	h1 {
		margin: auto;
	}

	.headers {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	.body {
		width: 80%;
		height: 100%;
		margin: 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--fill-color);
	}

	.svgContainer {
		display: flex;
		justify-content: center;
		padding: 0.5rem;
		border: 7px dotted var(--accent-color);
	}

	.innerSvg {
		padding: 0.5rem;
		background-color: var(--background-color);
		border: transparent;
	}

	.svgContainer #coreSvg {
		position: absolute;
		z-index: 1;
	}
</style>
