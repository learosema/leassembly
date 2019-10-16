/**
 * A p5-inspired canvas painting API by Lea Rosema
 * Node.JS version :)
 */

const { createCanvas } = require('canvas');

let canvas = null;
let ctx = null;
const fillEnabled = false;
const strokeEnabled = true;

/**
 * Initialize canvas with a width and height
 * 
 * @param {Number} width 
 * @param {Number} height 
 */
export function initCanvas(width, height) {
  canvas = createCanvas(width, height);
  ctx = canvas.getContext('2d');
}


/**
 * Set stroke color
 * 
 * @param {Number} hexNum number hex code, eg 0x663399 for rebeccapurple  
 */
export function stroke(hexNum) {
  strokeEnabled = true;
  ctx.strokeStyle = '#' + hexNum.toString(16);
}

/**
 * Disable stroke
 */
export function noStroke() {
  strokeEnabled = false;
}

/**
 * Set fill color
 * 
 * @param {Number} hexNum number hex code, eg 0x663399 for rebeccapurple
 */
export function fill(hexNum) {
  fillEnabled = true;
  ctx.fillStyle = '#' + hexNum.toString(16);
}

/**
 * Disable fill
 */
export function noFill() {
  fillEnabled = false;
}

/**
 * Draw rectangle
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 */
export function rect(x, y, w, h) {
  if (fillEnabled) ctx.fillRect(x, y, w, h);
  if (strokeEnabled) ctx.strokeRect(x,y, w, h);
}

/**
 * Draw pixel
 * 
 * @param {Number} x
 * @param {Number} y 
 */
export function pixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

/**
 * Draw a circle
 * 
 * @param {Number} cx 
 * @param {Number} cy 
 * @param {Number} r 
 */
export function circle(cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
  if (fillEnabled) ctx.fill();
  if (strokeEnabled) ctx.stroke();
}

/**
 * Draw an ellipse
 * 
 * @param {Number} cx x-Coord of center
 * @param {Number} cy y-Coord of center 
 * @param {Number} rx x-Radius
 * @param {Number} ry y-Radius
 * @param {Number} rotation rotation angle in radians 
 */
export function ellipse(cx, cy, rx, ry, rotation) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, rotation, 0, 2 * Math.PI, false);
  if (fillEnabled) ctx.fill();
  if (strokeEnabled) ctx.stroke();
}

/**
 * Draw a triangle
 * 
 * @param {Number} x1 First x-Coord
 * @param {Number} y1 First y-Coord
 * @param {Number} x2 Second x-Coord
 * @param {Number} y2 Second y-Coord
 * @param {Number} x3 Third x-Coord
 * @param {Number} y3 Third y-Coord
 */
export function tri(x1,y1, x2,y2, x3,y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if (fillEnabled) ctx.fill();
  if (strokeEnabled) ctx.stroke();
}

/**
 * Draw a line
 * 
 * @param x1 First x-Coord
 * @param y1 First y-Coord
 * @param x2 Second x-Coord
 * @param y2 Second y-Coord
 */
export function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.line(x1,y1,x2,y2);
  if (strokeEnabled) ctx.stroke();
}
