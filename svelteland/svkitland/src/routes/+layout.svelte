<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/labs/svg/heart">heart lab</a>
</nav>

{@render children()}
