/**
 * A p5-inspired canvas painting API by Lea Rosema
 * Node.JS version :)
 */

let markup = [];
let width = 400;
let height = 300;
let ctx = {
  fillStyle: '#000000',
  strokeStyle: '#000000',
};

let fillEnabled = false;
let strokeEnabled = true;

/**
 * Initialize canvas with a width and height
 *
 * @param {Number} width
 * @param {Number} height
 */
export function initCanvas(w, h) {
  markup = [];
  width = w;
  height = h
}


/**
 * Create a self-closing XML/HTML tag string
 *
 * @param {String} tagName tagName, eg. circle
 * @param {Object} attribs object of Attribs, e.g {fill:'#ff00ff'}
 */
function createTag(tagName, attribs) {
  let attrString = Object.entries(attribs)
    .map(attr => `${attr[0]}="${attr[1]}"`)
    .join(' ');
  return `<${tagName} ${attrString} />`;
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
 * @param {Number} x x-Coord
 * @param {Number} y y-Coord
 * @param {Number} w width
 * @param {Number} h height
 */
export function rect(x, y, w, h) {
  const fill = fillEnabled ? ctx.fillStyle : 'none';
  const stroke = strokeEnabled ? ctx.strokeStyle : 'none';
  markup.push(createTag('circle', {x,y,w,h, fill, stroke}));
}

/**
 * Draw pixel
 *
 * @param {Number} x x-Coord
 * @param {Number} y y-Coord
 */
export function pixel(x, y) {
  rect(x, y, 1, 1);
}

/**
 * Draw a circle
 *
 * @param {Number} cx x-Coord of center
 * @param {Number} cy y-Coord of center
 * @param {Number} r radius
 */
export function circle(cx, cy, r) {
  const fill = fillEnabled ? ctx.fillStyle : 'none';
  const stroke = strokeEnabled ? ctx.strokeStyle : 'none';
  markup.push(createTag('circle', {cx, cy, r, fill, stroke}));
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
  console.error('Not implemented yet')
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
  const fill = fillEnabled ? ctx.fillStyle : 'none';
  const stroke = strokeEnabled ? ctx.strokeStyle : 'none';
  markup.push(createTag('path', {
    d: `M${x1},${y1} L${x2},${y2} L${x3},${y3}Z`,
    fill,
    stroke
  }));
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
  const fill = fillEnabled ? ctx.fillStyle : 'none';
  const stroke = strokeEnabled ? ctx.strokeStyle : 'none';
  markup.push(createTag('circle', {x,y,w,h, fill, stroke}));
}

export function render() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${markup.join('')}
  </svg>`;
}