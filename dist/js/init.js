var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Point, AvoidableField } from "./models.js";
import { config } from "./animationConfig.js";
import { initRanges } from "./ranges.js";
export const Points = [];
const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
const hint = document.getElementById('hint');
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield initListeners();
        yield setCanvasSize();
        yield initPoints();
        yield reDrawCanvas();
        yield initAvoidableField();
        yield initRanges();
    });
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
    Points.map((point) => {
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
    };
    hint.ontouchstart = () => {
        hint.style.animationPlayState = 'running';
        hint.style.pointerEvents = 'none';
    };
}
