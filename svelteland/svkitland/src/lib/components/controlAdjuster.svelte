<script module lang="ts">
	// Exportable Types
	export type NumberControls = {
		type: 'number';
		defaultVal: number;
		min: number;
		max: number;
		step: number;
	};

	export type ColorControls = {
		type: 'color';
		defaultVal: string;
	};

	export type Controls = NumberControls | ColorControls;

	export type ControlSet<Type> = {
		[Property in keyof Type]: Controls;
	};
</script>

<script lang="ts">
	import Reset from '$lib/icons/reset.svelte';

	let {
		value = $bindable(),
		controls
	}: {
		value: number | string;
		controls: Controls;
	} = $props();
</script>

<main>
	{#snippet resetButton()}
		<button class="reset" onclick={() => (value = controls.defaultVal)}>
			<Reset color={'red'} width={20} height={20} />
		</button>
	{/snippet}

	<div class="container">
		{@render resetButton()}
		<div class="adjuster">
			{#if controls.type === 'number'}
				{@const numControls = controls as NumberControls}
				<input type="number" min={numControls.min} max={numControls.max} bind:value />
				<input type="range" min={controls.min} max={controls.max} bind:value />
			{:else if controls.type === 'color'}
				<input type="color" bind:value />
			{:else}
				<p>Unsupported control type: {controls}</p>
			{/if}
		</div>
	</div>
</main>

<style>
	.container {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		/* padding: 0.3rem; */
		margin: 0.05in;
		height: 100%;
		width: 100%;
	}

	.adjuster {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2.5%;
	}

	.container .adjuster input[type='range'] {
		accent-color: var(--accent-color);
		/* margin: 2%; */
	}
	.container .adjuster input[type='color'] {
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

	.container button.reset {
		display: flex;
		background-color: var(--accent-color);
		color: var(--on-primary);
		border: none;
		border-radius: 50%;
		padding: 0.25rem;
		margin: 2%;
		align-content: center;
	}
</style>
