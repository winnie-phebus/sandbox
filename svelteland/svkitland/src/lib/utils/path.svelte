<script module lang="ts">
	// utils for building paths in SVG
	export type Point = {
		x: number;
		y: number;
	};

	export type InteractivePoint = Point & {
		isFocused?: boolean;
		id?: string;
	};

	export type PathPortion = {
		type: string;
		points: Point[];
	};

	// uppercase is absolute, lowercase is relative
	// const
	export const zPath: PathPortion = {
		type: 'Z',
		points: []
	};

	export const nullPath: PathPortion = {
		type: '',
		points: []
	};

	// FUNCTIONS --
	export function pointToString(p: Point): string {
		return `${p.x} ${p.y}`;
	}

	// move to
	export function mPath(point: Point | undefined): PathPortion {
		if (point === undefined) return nullPath;
		return {
			type: 'M',
			points: [point]
		};
	}

	// line to
	export function lPath(end: Point | undefined): PathPortion {
		if (end === undefined) return nullPath;
		return {
			type: 'L',
			points: [end]
		};
	}

	// quadratic bezier curve
	export function qPath(control: Point, end: Point): PathPortion {
		return {
			type: 'Q',
			points: [control, end]
		};
	}

	// cubic bezier curve
	export function cPath(control1: Point, control2: Point, end: Point): PathPortion {
		return {
			type: 'C',
			points: [control1, control2, end]
		};
	}

	export function pathBuilder(portions: PathPortion[]): string {
		return portions
			.map((portion) => {
				return `${portion.type} ${portion.points.map(pointToString).join(' ')}`;
			})
			.join(' ');
	}
</script>

<!-- resources: -->
<!-- https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths -->
<!-- https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d -->

<!-- It is always possible to specify a negative value as an argument to a command:

-- negative angles will be anti-clockwise;
-- absolute negative x and y values are interpreted as negative coordinates;
-- relative negative x values move to the left, and relative negative y values move upwards. -->

<!-- Bezier Curves: -->
<!-- https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/ -->
<!-- https://youtube.com/watch?v=aVwxzDHniEw -->
<!-- https://www.sitepoint.com/closer-look-svg-path-data/ -->
