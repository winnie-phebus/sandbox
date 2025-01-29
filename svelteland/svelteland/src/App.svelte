<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import RoundHeart from "./assets/base/svg/round_heart.svelte";

  let width = $state(50);
  const roundHeart = $derived({
    color: "red",
    cx: 100,
    cy: 100,
    width: width,
    cr: 1,
    cfill: "red",
  });
</script>

<main>
  <div class="card">
    <RoundHeart {...roundHeart} />
    <p>width: {width}</p>
    <input type="range" min="1" max="100" bind:value={width} />
  </div>
</main>

<style>
</style>
