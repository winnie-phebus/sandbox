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

	export const htStartPointId = 'heartStartPoint';
	export const htRightControl1Id = 'rightControl1';
	export const htRightControl2Id = 'rightControl2';
	export const htLeftControl1Id = 'leftControl1';
	export const htLeftControl2Id = 'leftControl2';
	export const htLowPointId = 'heartLowPoint';

	export const defaultHrtStartPoint = { x: 100, y: 85, id: htStartPointId, isFocused: false };
	export const defaultHrtRightControl1 = { x: 125, y: 40, id: htRightControl1Id, isFocused: true };
	export const defaultHrtRightControl2 = { x: 175, y: 90, id: htRightControl2Id, isFocused: false };
	export const defaultHrtLeftControl1 = { x: 75, y: 40, id: htLeftControl1Id, isFocused: false };
	export const defaultHrtLeftControl2 = { x: 25, y: 90, id: htLeftControl2Id, isFocused: false };
	export const defaultHrtLowPoint = { x: 100, y: 135, id: htLowPointId, isFocused: false };

	let {
		id = '',
		width = 200,
		height = 200,
		viewBox = '0 0 200 200',
		heartStartPoint = $bindable(defaultHrtStartPoint),
		heartControl1 = $bindable(defaultHrtRightControl1),
		heartControl2 = $bindable(defaultHrtRightControl2),
		heartLeftControl1 = $bindable(defaultHrtLeftControl1),
		heartLeftControl2 = $bindable(defaultHrtLeftControl2),
		heartLowPoint = $bindable(defaultHrtLowPoint)
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
			mPath(findPointById(htStartPointId)),
			cPath(
				findPointById(htRightControl1Id),
				findPointById(htRightControl2Id),
				findPointById(htLowPointId)
			),
			cPath(
				findPointById(htLeftControl2Id),
				findPointById(htLeftControl1Id),
				findPointById(htStartPointId)
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
			function getMousePosition(evt: MouseEvent): Point {
				var CTM = node.getScreenCTM() ?? new DOMMatrix();
				return {
					x: (evt.clientX - CTM.e) / CTM.a,
					y: (evt.clientY - CTM.f) / CTM.d
				};
			}

			const startDrag = (evt: MouseEvent) => {
				node.onmousemove = drag;
				node.onmouseup = endDrag;
				node.onmouseleave = endDrag;
			};

			const drag = (evt: MouseEvent) => {
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
<!-- <svelte:document /> -->
<svg {id} {width} {height} {viewBox}>
	<g id="heart" fill="pink">
		<path d={heartPath} stroke="black" stroke-width="1" />
	</g>

	<g id="draggable controls">
		<line
			class="control line"
			x1={findPointById(htStartPointId).x}
			y1={findPointById(htStartPointId).y}
			x2={findPointById(htRightControl1Id).x}
			y2={findPointById(htRightControl1Id).y}
		/>

		<line
			class="control line"
			x1={findPointById(htStartPointId).x}
			y1={findPointById(htStartPointId).y}
			x2={findPointById(htLeftControl1Id).x}
			y2={findPointById(htLeftControl1Id).y}
		/>

		<line
			class="control line"
			x1={findPointById(htLowPointId).x}
			y1={findPointById(htLowPointId).y}
			x2={findPointById(htRightControl2Id).x}
			y2={findPointById(htRightControl2Id).y}
		/>

		<line
			class="control line"
			x1={findPointById(htLowPointId).x}
			y1={findPointById(htLowPointId).y}
			x2={findPointById(htLeftControl2Id).x}
			y2={findPointById(htLeftControl2Id).y}
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
