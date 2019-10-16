declare function initCanvas(width: number, height: number): void;
declare function pixel(x: number, y: number): void;
declare function circle(cx: number, cy: number, r: number): void;
declare function rect(x: number, y: number, width: number, height: number): void;
declare function fill(hexColor: u32): void;
declare function stroke(hexColor: u32): void;
declare function noFill(): void;
declare function noStroke(): void;

export function setup(): void {
  initCanvas(600, 600);
}

export function draw(t: number): void {
  const color: u32 = u32(Math.floor(Math.random() * 0xffffff));
  const cx: number = Math.random() * 600;
  const cy: number = Math.random() * 600;
  noStroke();
  fill(color);
  stroke(color);
  circle(cx, cy, 20);
}