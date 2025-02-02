<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/labs/svg/round_heart">heart (round)</a>
	<a href="/labs/svg/path_heart">heart (path)</a>
</nav>

{@render children()}

<style>
	nav {
		display: flex;
		justify-content: space-around;
		padding: 1rem;
		width: 85%;
		margin: auto;
		margin-top: 0.2in;
		margin-bottom: 0.3in;
		box-shadow: 0.2in 0.2in 0.2in 0.1in rgba(0, 0, 0, 0.1);
	}

	a {
		text-decoration: none;
		font-size: 1.25rem;
	}
</style>
