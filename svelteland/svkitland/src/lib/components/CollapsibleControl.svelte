<script lang="ts">
	import Arrow from '$lib/icons/arrow.svelte';
	let expanded = $state(false);

	const defaultArrow = {
		width: 20,
		height: 20,
		strokeColor: 'var(--accent-color)',
		strokeWidth: 15
	};

	let { children } = $props();
</script>

<div class="collapsible">
	<button aria-expanded={expanded} onclick={() => (expanded = !expanded)}>
		<Arrow isOpen={expanded} {...defaultArrow} />
	</button>

	<div class="contents" hidden={!expanded}>
		{@render children()}
	</div>
</div>

<style>
	.collapsible {
		display: flex;
		justify-content: center;
		height: fit-content;
		align-items: center;
		width: fit-content;
		padding: 0.5rem;
	}

	.collapsible button {
		display: contents;
		margin: 1rem;
		padding: 1rem;
	}
</style>
