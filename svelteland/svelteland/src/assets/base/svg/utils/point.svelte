class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  function toPathPoint() {
    return `${this.x},${this.y}`;
  }
}

  function pathPoint(x: number, y: number) {
    return `${x} ${y}`;
  }