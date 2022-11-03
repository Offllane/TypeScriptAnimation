import { Point, AvoidableField } from "./models.js";
import { config } from "./animationConfig.js";
import { initRanges } from "./ranges.js";

export const Points: Point[] = [];
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
const hint = document.getElementById('hint') as HTMLElement;

(async function() {
  await initListeners();
  await setCanvasSize();
  await initPoints();
  await reDrawCanvas();
  await initAvoidableField();
  await initRanges();
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
  config.screenHeight = canvas.height = innerHeight + 180;
}

function initListeners() {
  initWindowEventListeners();
  initHintListener();
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

function reDrawCanvas() {
  requestAnimationFrame(reDrawCanvas);
  clearCanvas();
  dropPoints();
}

function initHintListener() {
  hint.onmouseover = () => {
    hint.style.animationPlayState = 'running';
    hint.style.pointerEvents = 'none';
  }
  hint.ontouchstart = () => {
    hint.style.animationPlayState = 'running';
    hint.style.pointerEvents = 'none';
  }
}
