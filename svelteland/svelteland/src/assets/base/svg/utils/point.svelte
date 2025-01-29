class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  function toPathPoint() {
    return `${this.x},${this.y}`;
  }
}