import { Point, AvoidableField } from "./models.js";
import { config } from "./animationConfig.js";

const Points: Point[] = [];
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;

(function() {
  initPoints();
  setCanvasSize();
  initWindowEventListeners();
  reDrawCanvas();
  initAvoidableField();
}());


function initPoints() {
  for (let i = 0; i < config.quantity; i++) {
    Points.push(new Point());
  }
}

function initAvoidableField() {
  new AvoidableField();
}

function setCanvasSize() {
  config.screenWidth = canvas.width = innerWidth;
  config.screenHeight = canvas.height = innerHeight;
}

function initWindowEventListeners() {
  window.addEventListener('resize', setCanvasSize);
}

function clearCanvas() {
  ctx.fillStyle = '#2d2c2b';
  ctx.fillRect(0, 0, config.screenWidth, config.screenHeight);
}

function dropPoints() {
  Points.map((point: Point) => {
    point.drop();
    point.refreshPoint();
  });
}

function drawAvoidField() {
  if (AvoidableField.coordinate.x === Infinity) { return; }

  ctx.fillStyle = AvoidableField.getAvoidFieldGradient();
  ctx.beginPath();
  ctx.arc(AvoidableField.coordinate.x, AvoidableField.coordinate.y, config.avoidFieldSize, 0, 2 * Math.PI);
  ctx.fill();
}

function reDrawCanvas() {
  requestAnimationFrame(reDrawCanvas);
  clearCanvas();
  dropPoints();
 // drawAvoidField();
}
