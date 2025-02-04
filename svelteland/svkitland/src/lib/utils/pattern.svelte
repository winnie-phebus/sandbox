<svg>
	<defs>
		<pattern
			id="grid-10"
			width="10"
			height="10"
			viewBox="0 0 20 20"
			patternContentUnits="objectBoundingBox"
			patternUnits="userSpaceOnUse"
		>
			<line x1="10" y1="0" x2="10" y2="100" stroke="black" stroke-width=".25" />
			<line x1="0" y1="10" x2="100" y2="10" stroke="black" stroke-width=".25" />
			<rect x="0" y="0" width="20" height="20" fill="none" stroke="black" stroke-width=".75" />
		</pattern>
		<pattern
			id="grid-axis"
			width="100%"
			height="100%"
			viewBox="-1 -1 202 202"
			patternContentUnits="objectBoundingBox"
			patternUnits="objectBoundingBox"
		>
			<!-- Markers -->
			<marker
				id="angle"
				viewBox="0 0 10 10"
				refX="5"
				refY="5"
				markerUnits="strokeWidth"
				markerWidth="10"
				markerHeight="10"
				orient="auto-start-reverse"
			>
				<line x1="0" y1="0" x2="5" y2="5" stroke="black" stroke-width="1" stroke-linecap="round" />
				<line x1="5" y1="5" x2="0" y2="10" stroke="black" stroke-width="1" stroke-linecap="round" />
			</marker>
			<!-- GRID  -->
			<rect x="0" y="0" width="100%" height="100%" fill="url(#grid-10)" fill-opacity=".2" />

			<g id="axis">
				<line
					x1="0"
					y1="50%"
					x2="100%"
					y2="50%"
					stroke="black"
					stroke-width="1"
					marker-start="url(#angle)"
					marker-end="url(#angle)"
					stroke-dasharray="10"
					stroke-dashoffset="25"
				/>
				<line
					x1="50%"
					y1="0"
					x2="50%"
					y2="100%"
					stroke="black"
					stroke-width="1"
					marker-start="url(#angle)"
					marker-end="url(#angle)"
					stroke-dasharray="10"
					stroke-dashoffset="25"
				/>
			</g>
		</pattern>
	</defs>
</svg>
