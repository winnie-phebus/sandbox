<script lang="ts">
	import {
		mPath,
		lPath,
		qPath,
		cPath,
		zPath,
		pathBuilder,
		type Point,
		type InteractivePoint,
		type PathPoint
	} from '$lib/utils/path.svelte';
	import type { Action } from 'svelte/action';

	let {
		id = '',
		width = 200,
		height = 200,
		viewBox = '0 0 200 200',
		heartStartPoint = $bindable({ x: 100, y: 85, id: 'heartStartPoint', isFocused: false }),
		heartControl1 = $bindable({ x: 125, y: 40, id: 'heartControl1', isFocused: true }),
		heartControl2 = $bindable({ x: 175, y: 90, id: 'heartControl2', isFocused: false }),
		heartLeftControl1 = $bindable({ x: 75, y: 40, id: 'heartLeftControl1', isFocused: false }),
		heartLeftControl2 = $bindable({ x: 25, y: 90, id: 'heartLeftControl2', isFocused: false }),
		heartLowPoint = $bindable({ x: 100, y: 135, id: 'heartLowPoint', isFocused: false })
	}: {
		id?: string;
		width?: number;
		height?: number;
		viewBox?: string;
		heartStartPoint?: InteractivePoint;
		heartControl1?: InteractivePoint;
		heartControl2?: InteractivePoint;
		heartLeftControl1?: InteractivePoint;
		heartLeftControl2?: InteractivePoint;
		heartLowPoint?: InteractivePoint;
	} = $props();

	// Q1  (x: 0 - 100) (y: 0 - 100) | Q2 (x: 100 - 200) (y: 0 - 100)
	// Q3 (x: 0 - 100) (y: 100-200) | Q4  (x: 100 - 200) (y: 100 - 200)

	// const heartStartPoint: Point = { x: 100, y: 90 }; // on x-Axis
	// const heartControl1: Point = { x: 160, y: 40 }; // Q2
	// const heartControl2: Point = { x: 105, y: 120 }; // Q3
	// const heartLowPoint: Point = { x: 100, y: 150 }; // on x-Axis

	// const heartStartPoint: Point = { x: 50, y: 100 }; // on y-Axis
	// const heartControl1: Point = { x: 125, y: 80 }; // Q2
	// const heartControl2: Point = { x: 75, y: 80 }; // Q1
	// const heartLowPoint: Point = { x: 150, y: 100 }; // on y-Axis

	let heartArray = $state([
		heartStartPoint,
		heartControl1,
		heartControl2,
		heartLeftControl1,
		heartLeftControl2,
		heartLowPoint
	]);
	const heartPoints = $derived(heartArray);

	function findPointById(id: string, arr: InteractivePoint[] = heartArray): InteractivePoint {
		return arr.filter((pt) => pt.id === id)[0];
	}

	const heartPath = $derived(
		pathBuilder([
			mPath(findPointById('heartStartPoint')),
			cPath(
				findPointById('heartControl1'),
				findPointById('heartControl2'),
				findPointById('heartLowPoint')
			),
			cPath(
				findPointById('heartLeftControl2'),
				findPointById('heartLeftControl1'),
				findPointById('heartStartPoint')
			)
		])
	);

	const addPointListener: Action<SVGCircleElement, InteractivePoint> = (node, pt) => {
		$effect(() => {
			node.addEventListener('click', (event) => {
				let currentPtIndex = heartArray.findIndex((heartPoint) => heartPoint.id === pt.id);
				heartArray = heartArray.with(currentPtIndex, {
					x: pt.x,
					y: pt.y,
					id: pt.id,
					isFocused: !pt.isFocused
				});
			});

			return () => {
				node.removeEventListener('click', (event) => {
					console.log('event.target', event.target);
				});
			};
		});
	};

	const movePoint: Action<SVGCircleElement, number> = (node: SVGCircleElement, ptIndex: number) => {
		let pt = heartArray.at(ptIndex) ?? heartStartPoint;

		$effect(() => {
			function getMousePosition(evt) {
				var CTM = node.getScreenCTM() ?? new DOMMatrix();
				return {
					x: (evt.clientX - CTM.e) / CTM.a,
					y: (evt.clientY - CTM.f) / CTM.d
				};
			}

			const startDrag = (event) => {
				node.onmousemove = drag;
				node.onmouseup = endDrag;
				node.onmouseleave = endDrag;
			};

			const drag = (evt) => {
				var coord = getMousePosition(evt);
				var dragX = +coord.x.toFixed(2);
				var dragY = +coord.y.toFixed(2);

				pt.x = dragX;
				pt.y = dragY;

				node.cx.baseVal.value = pt.x;
				node.cy.baseVal.value = pt.y;
			};

			const endDrag = () => {
				pt.isFocused = false;
			};

			node.onmousedown = startDrag;

			$inspect(heartArray);

			return () => {
				node.onmousedown = null;
				node.onmousemove = null;
				node.onmouseup = null;
				node.onmouseleave = null;
			};
		});
	};

	// console.log($state.snapshot(heartPath));
	// $inspect(heartPath).with(console.trace);
</script>

<!-- <Grid /> -->
<!-- Premise: a path for each quadrant of the heart? Try out two part heart first lol -->
<svelte:document />
<svg {id} {width} {height} {viewBox}>
	<!-- <use fill="url($lib/utils/pattern.svg#grid-axis)" /> -->
	<!-- <use id="grid" href="../../../../lib/utils/pattern.svelte#grid-axis" /> -->
	<!-- <rect
		x="0"
		y="0"
		width="100%"
		height="100%"
		fill="url(../../../../lib/utils/pattern.svg#grid-axis)"
		fill-opacity=".3"
	/> -->

	<g id="heart" fill="pink">
		<path d={heartPath} stroke="black" stroke-width="1" />
	</g>

	<g id="draggable controls">
		<line
			class="control line"
			x1={findPointById('heartStartPoint').x}
			y1={findPointById('heartStartPoint').y}
			x2={findPointById('heartControl1').x}
			y2={findPointById('heartControl1').y}
		/>

		<line
			class="control line"
			x1={findPointById('heartStartPoint').x}
			y1={findPointById('heartStartPoint').y}
			x2={findPointById('heartLeftControl1').x}
			y2={findPointById('heartLeftControl1').y}
		/>

		<line
			class="control line"
			x1={findPointById('heartLowPoint').x}
			y1={findPointById('heartLowPoint').y}
			x2={findPointById('heartControl2').x}
			y2={findPointById('heartControl2').y}
		/>

		<line
			class="control line"
			x1={findPointById('heartLowPoint').x}
			y1={findPointById('heartLowPoint').y}
			x2={findPointById('heartLeftControl2').x}
			y2={findPointById('heartLeftControl2').y}
		/>

		{#each heartPoints as pt: InteractivePoint, i}
			{#if pt.isFocused}
				<circle
					id={pt.id}
					class="point draggable"
					cx={pt.x}
					cy={pt.y}
					r={3}
					fill="blue"
					stroke="blue"
					stroke-width="1"
					stroke-opacity={0.5}
					use:movePoint={i}
				/>
			{:else}
				<circle
					id={pt.id}
					class="point"
					cx={pt.x}
					cy={pt.y}
					r={2}
					fill="red"
					stroke="none"
					use:addPointListener={pt}
				/>
			{/if}
		{/each}
	</g>
</svg>

<style>
	.point:hover {
		cursor: pointer;
		stroke: blue;
		stroke-width: 4;
		stroke-opacity: 0.5;
	}

	.point.draggable {
		cursor: grab;
	}

	.control.line {
		stroke: lightgray;
		stroke-width: 2;
		stroke-opacity: 0.75;
	}
</style>
