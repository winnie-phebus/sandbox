<script lang="ts">
	import type { Point } from '$lib/utils/point.svelte';
	import { mPath, lPath, qPath, cPath, zPath, pathBuilder } from '$lib/utils/path.svelte';

	// Q1  (x: 0 - 100) (y: 0 - 100) | Q2 (x: 100 - 200) (y: 0 - 100)
	// Q3 (x: 0 - 100) (y: 100-200) | Q4  (x: 100 - 200) (y: 100 - 200)

	// const heartStartPoint: Point = { x: 100, y: 90 }; // on x-Axis
	// const heartControl1: Point = { x: 160, y: 40 }; // Q2
	// const heartControl2: Point = { x: 105, y: 120 }; // Q3
	// const heartLowPoint: Point = { x: 100, y: 150 }; // on x-Axis

	const heartStartPoint: Point = { x: 50, y: 100 }; // on y-Axis
	const heartControl1: Point = { x: 125, y: 80 }; // Q2
	const heartControl2: Point = { x: 75, y: 80 }; // Q1
	const heartLowPoint: Point = { x: 150, y: 100 }; // on y-Axis

	const heartPoints = [heartStartPoint, heartControl1, heartControl2, heartLowPoint];
	const heartPath = pathBuilder([
		mPath(heartStartPoint),
		cPath(heartControl1, heartControl2, heartLowPoint)
	]);

	console.log(heartPath);
</script>

<!-- Premise: a path for each quadrant of the heart? Try out two part heart first lol -->
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
	<g id="heart" fill="pink">
		<path
			d={pathBuilder([
				mPath({ x: 0, y: 100 }),
				lPath({ x: 200, y: 100 }),
				mPath({ x: 100, y: 0 }),
				lPath({ x: 100, y: 200 })
			])}
			stroke="black"
			stroke-width="1"
		/>
		<path d={heartPath} stroke="black" stroke-width="1" />
		{#each heartPoints as pt}
			<circle cx={pt.x} cy={pt.y} r={0.5} stroke="red" stroke-width="2" fill="red" />
		{/each}
		<!-- <circle cx="100" cy="100" r="1" stroke="black" stroke-width="1" fill="black" /> -->
	</g>
</svg>
