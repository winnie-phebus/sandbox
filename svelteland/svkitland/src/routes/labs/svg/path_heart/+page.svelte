<script lang="ts">
	import Grid from '$lib/utils/grid.svelte';
	import type { PageData } from './$types';
	import PathHeart from './path_heart.svelte';
	import { type InteractivePoint, type Point } from '$lib/utils/path.svelte';

	let { data }: { data: PageData } = $props();

	let m = $state({ x: 0, y: 0 });
	// function onpointermove(event) {
	// 	m.x = event.clientX;
	// 	m.y = event.clientY;
	// }

	function beginSliding(e) {
		// slider.onpointermove = slide;
		// slider.setPointerCapture(e.pointerId);
	}

	function stopSliding(e) {
		// slider.onpointermove = null;
		// slider.releasePointerCapture(e.pointerId);
	}

	function slide(e) {
		// slider.style.transform = `translate(${e.clientX - 70}px)`;
	}

	function onpointerdown(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function onpointerup(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function onpointermove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function pointClick(pt: InteractivePoint) {
		// m.x = event.clientX;
		// m.y = event.clientY;
		pt.isFocused = !pt.isFocused;
	}
</script>

<main>
	<!-- <h1>{data.title}</h1> -->
	<!-- <p>{data.description}</p> -->
	<!-- <RoundHeart {...data.props} /> -->
	<h1>Path Heart</h1>

	The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
	<div class="svgContainer">
		<Grid />
		<div id="coreSvg">
			<PathHeart onclick={pointClick} />
		</div>

		<!-- </Grid> -->
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
