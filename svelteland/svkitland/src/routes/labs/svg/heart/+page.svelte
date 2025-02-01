<!-- @migration-task Error while migrating Svelte code: Argument name clash (72:41) -->
<script lang="ts">
	import RoundHeart from './round_heart.svelte';
	import CollapsibleControl from '$lib/components/CollapsibleControl.svelte';
	import ControlAdjuster from '$lib/components/controlAdjuster.svelte';
	import type { ControlSet } from '$lib/components/controlAdjuster.svelte';

	type heartValues = {
		color: string;
		cx: number;
		cy: number;
		width: number;
		cr: number;
		cfill: string;
	};

	const heartValuesDefault: heartValues = {
		color: '#ff0000',
		cx: 100,
		cy: 100,
		width: 50,
		cr: 1,
		cfill: 'black'
	};

	let roundHeart = $state(heartValuesDefault);

	type HvControls = ControlSet<heartValues>;
	type HvProperty = keyof heartValues;

	const heartValueControls: HvControls = {
		color: { type: 'color', defaultVal: heartValuesDefault.color },
		cx: {
			type: 'number',
			defaultVal: heartValuesDefault.cx,
			min: 0,
			max: 200,
			step: 1
		},
		cy: {
			type: 'number',
			defaultVal: heartValuesDefault.cy,
			min: 0,
			max: 200,
			step: 1
		},
		width: {
			type: 'number',
			defaultVal: heartValuesDefault.width,
			min: 25,
			max: 75,
			step: 1
		},
		cr: {
			type: 'number',
			defaultVal: heartValuesDefault.cr,
			min: 0,
			max: 10,
			step: 1
		},
		cfill: { type: 'color', defaultVal: heartValuesDefault.cfill }
	};
</script>

<main>
	{#snippet heartDataValue(value: number | string, label: string = '')}
		<div class="hData">
			<p class="hDataValue">{value}</p>
			<p class="hDataLabel">{label}</p>
		</div>
	{/snippet}

	<div class="card">
		<h1>Heart Lab</h1>
		<sub>Version 1: Built around round_heart</sub>
		<div class="heartSvgContainer">
			<RoundHeart {...roundHeart} />
		</div>
		<div class="heartControls">
			{#each Object.keys(heartValueControls) as key}
				<div class="hDataContainer">
					{@render heartDataValue(roundHeart[key as keyof heartValues], key)}
					<CollapsibleControl>
						<div class="contents">
							<ControlAdjuster
								bind:value={roundHeart[key as keyof heartValues]}
								controls={heartValueControls[key as keyof heartValues]}
							/>
						</div>
					</CollapsibleControl>
				</div>
			{/each}
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
	}

	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem;
	}

	.card .heartSvgContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 5px dotted var(--accent-color);
		border-radius: 15%;
		margin: 0.2in;
		padding: 0.2in;
	}

	.heartControls {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin: 2%;
	}

	.hDataContainer {
		display: flex;
		justify-content: start;
		height: max-content;
		align-items: center;
		border: 1px solid var(--accent-color);
		border-radius: 2rem;
		margin: 0.25in;
	}

	.hDataContainer .contents {
		display: flex;
		justify-content: center;
		align-items: center;
		/* border: 1px solid var(--accent-color); */
		padding: 0.3rem;
		margin: 0.2rem;
		height: min-content;
	}

	.hDataContainer .hData {
		display: flex;
		float: inline-start;
		flex-direction: column;
		height: 100%;
		width: fit-content;
		padding: 1rem;
		background-color: var(--primary-color);
		color: var(--on-primary);
		justify-content: center;
		align-items: end;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.hDataValue {
		margin: 0%;
		font-size: 2rem;
		font-weight: bold;
	}

	.hDataLabel {
		height: min-content;
		margin-top: -0.5rem;
		margin-bottom: -0.45rem;
		font-variant-caps: all-petite-caps;
		font-size: 1rem;
		font-weight: lighter;
	}
</style>
