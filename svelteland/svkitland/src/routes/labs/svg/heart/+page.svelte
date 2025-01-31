<script lang="ts">
	import RoundHeart from './round_heart.svelte';
	import CollapsibleControl from '$lib/components/CollapsibleControl.svelte';
	import Reset from '$lib/icons/reset.svelte';

	const heartValuesDefault = {
		color: '#ff0000',
		cx: 100,
		cy: 100,
		width: 50,
		cr: 1,
		cfill: 'black'
	};

	const roundHeart = $state(heartValuesDefault);

	const heartValueControls = {
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

<h1>Heart Lab</h1>

<main>
	{#snippet heartDataValue(value: number | string, label: string = '')}
		<div class="hData">
			<p class="hDataValue">{value}</p>
			<p class="hDataLabel">{label}</p>
		</div>
	{/snippet}

	{#snippet resetButton(
		adjustible: { [key: string]: number | string },
		key: string,
		defaultVal: number | string
	)}
		<button class="reset" onclick={() => (adjustible[key] = defaultVal)}
			><Reset color={'red'} width={20} height={20} />
		</button>
	{/snippet}

	{#snippet numberAdjuster(adjustible: { [key: string]: number | string },
		key: string, { defaultVal: number, min:number, max:number, step:number })}
		{@render resetButton(adjustible, key, defaultVal)}
		<button onclick={() => (adjustible[key] -= step)}>-</button>
		<input type="range" {min} {max} bind:value={adjustible[key]} />
		<button onclick={() => (adjustible[key] += step)}>+</button>
	{/snippet}

	{#snippet colorAdjuster(adjustible: { [key: string]: number | string },
		key: string, { defaultVal: string })}
		{@render resetButton(adjustible, key, defaultVal)}
		<input type="color" bind:value={adjustible[key]} />
	{/snippet}

	{#snippet collapsible(adjustible, key, controls)}
		<CollapsibleControl>
			<div class="contents adjuster">
				{#if controls.type === 'number'}
					{@render numberAdjuster(adjustible, key, { ...controls })}
				{:else if controls.type === 'color'}
					{@render colorAdjuster(adjustible, key, { ...controls })}
				{:else}
					<p>Unsupported control type: {controls.type}</p>
				{/if}
			</div>
		</CollapsibleControl>
	{/snippet}

	<div class="card">
		<RoundHeart {...roundHeart} />
		<div class="heartControls">
			{#each Object.keys(heartValueControls) as key}
				<div class="hDataContainer">
					{@render heartDataValue(roundHeart[key], key)}
					{@render collapsible(roundHeart, key, heartValueControls[key])}
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		--fill-color: red;
		--primary-color: red;
		--on-primary: white;
		--accent-color: pink;
	}

	.heartControls {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.hDataContainer {
		display: flex;
		justify-content: start;
		height: fit-content;
		align-items: center;
		border: 1px solid var(--accent-color);
		border-radius: 2rem;
		margin: 0.5rem;
	}

	.hDataContainer .contents {
		display: flex;
		justify-content: center;
		align-items: center;
		/* border: 1px solid var(--accent-color); */
		padding: 0.3rem;
		margin: 0.2rem;
		height: match-parent;
	}

	.hDataContainer .adjuster input[type='range'] {
		accent-color: var(--accent-color);
		margin: 2%;
	}
	.hDataContainer .adjuster input[type='color'] {
		appearance: none;
		accent-color: var(--accent-color);
		background: transparent;
		border: none;
		border-radius: 25%;
		padding: 0;
		margin: 2%;
	}

	input[type='color']::-webkit-color-swatch {
		border-radius: 2rem;
		border: 2px solid var(--accent-color);
		height: 1rem;
	}

	.hDataContainer button.reset {
		display: flex;
		background-color: var(--accent-color);
		color: var(--on-primary);
		border: none;
		border-radius: 50%;
		padding: 0.25rem;
		margin: 2%;
		align-content: center;
	}

	.hDataContainer .hData {
		display: flex;
		float: inline-start;
		flex-direction: column;
		height: fit-content;
		width: fit-content;
		padding: 1rem;
		background-color: var(--primary-color);
		color: var(--on-primary);
		justify-content: center;
		align-items: center;
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
