<script lang="ts">
  let {
    color = "red",
    cx = 100,
    cy = 100,
    width = 50,
    cr = 1,
    cfill = "red",
  } = $props();

  function pathPoint(x: number, y: number) {
    return `${x} ${y}`;
  }

  const halfRadius = $derived(width / 2);

  const minX = $derived(cx - width);
  const lcx = $derived(cx - halfRadius); // left center x-coordinate
  const rcx = $derived(cx + halfRadius); // right center x-coordinate
  const maxX = $derived(cx + width);

  // <path d="M50 100 C50 175 150 175 150 100 Z" />
  const curveY = $derived(cy + (cy - halfRadius));

  const curveStart = $derived(pathPoint(minX, cy));
  const curveMin = $derived(pathPoint(minX, curveY));
  const curveMax = $derived(pathPoint(maxX, curveY));
  const curveStop = $derived(pathPoint(maxX, cy));

  const curvePath = $derived(
    `M${curveStart} C${curveMin} ${curveMax} ${curveStop}`
  );

  function setColor(newColor: string) {
    color = newColor;
  }

  function setWidth(newWidth: number) {
    width = newWidth;
  }
</script>

<svg
  width="200"
  height="200"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="round_heart" fill={color}>
    <circle cx={lcx} {cy} r={halfRadius} />
    <circle cx={rcx} {cy} r={halfRadius} />
    <path d={curvePath} />
    <circle {cx} {cy} r={cr} stroke="black" stroke-width="1" fill={cfill} />
  </g>
</svg>
