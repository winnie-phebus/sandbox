<script lang="ts">
  let {
    class: arrowClass = "arrow",
    isOpen = $bindable(true),
    width = 50,
    height = 50,
    strokeColor = "var(--accent-color)",
    strokeWidth = 15,
  } = $props();

  const viewBoxXDimen = 100;
  const viewBoxYDimen = 100;
  const viewBox = `0 0 ${viewBoxXDimen} ${viewBoxYDimen}`;

  const strokeCap = "round";
  const strokeJoin = "round";

  const shape = $derived(isOpen ? "#closed" : "#open");
</script>

<svg
  class:arrowClass
  {width}
  {height}
  {viewBox}
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <g id="open">
      <line
        x1={viewBoxXDimen / 4}
        y1={0}
        x2={viewBoxXDimen * 0.75}
        y2={viewBoxYDimen / 2}
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap={strokeCap}
        stroke-linejoin={strokeJoin}
      />
      <line
        x1={viewBoxXDimen * 0.75}
        y1={viewBoxYDimen / 2}
        x2={viewBoxXDimen / 4}
        y2={viewBoxYDimen}
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap={strokeCap}
        stroke-linejoin={strokeJoin}
      />
    </g>
    <g id="closed">
      <line
        x1={viewBoxXDimen * 0.75}
        y1={0}
        x2={viewBoxXDimen * 0.25}
        y2={viewBoxYDimen / 2}
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap={strokeCap}
        stroke-linejoin={strokeJoin}
      />
      <line
        x1={viewBoxXDimen * 0.25}
        y1={viewBoxYDimen / 2}
        x2={viewBoxXDimen * 0.75}
        y2={viewBoxYDimen}
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap={strokeCap}
        stroke-linejoin={strokeJoin}
      />
    </g>
  </defs>
  <use href={shape} />
</svg>
