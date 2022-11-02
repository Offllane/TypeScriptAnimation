import { config } from "./animationConfig.js";
import { Points } from "./init.js";
import { Point } from "./models.js";
export function initRanges() {
    const velocityRange = document.getElementById('velocity-range');
    const dotQuantityRange = document.getElementById('dot-quantity-range');
    const dotSizeRange = document.getElementById('dot-size-range');
    const avoidSizeRange = document.getElementById('avoid-size-range');
    const velocityRangeValue = document.getElementById('velocity-range-value');
    const dotQuantityRangeValue = document.getElementById('dot-quantity-range-value');
    const dotSizeRangeValue = document.getElementById('dot-size-range-value');
    const avoidSizeRangeValue = document.getElementById('avoid-size-range-value');
    setStartRangesValues();
    addRangesListeners();
    function setStartRangesValues() {
        velocityRange.value = String(config.velocity);
        velocityRangeValue.innerText = velocityRange.value;
        avoidSizeRange.value = String(config.avoidFieldSize);
        avoidSizeRangeValue.innerText = avoidSizeRange.value;
        dotSizeRange.value = String(config.dotSize);
        dotSizeRangeValue.innerText = dotSizeRange.value;
        dotQuantityRange.value = String(config.quantity);
        dotQuantityRangeValue.innerText = dotQuantityRange.value;
    }
    function addRangesListeners() {
        velocityRange.oninput = event => setVelocity(event);
        dotSizeRange.oninput = event => setDotSize(event);
        avoidSizeRange.oninput = event => setAvoidFieldSize(event);
        dotQuantityRange.oninput = event => setDotsQuantity(event);
    }
    function setVelocity(event) {
        var _a;
        config.velocity = Number((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
        velocityRangeValue.innerText = velocityRange.value;
    }
    function setDotSize(event) {
        var _a;
        config.dotSize = Number((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
        dotSizeRangeValue.innerText = dotSizeRange.value;
    }
    function setAvoidFieldSize(event) {
        var _a;
        config.avoidFieldSize = Number((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
        avoidSizeRangeValue.innerText = avoidSizeRange.value;
    }
    function setDotsQuantity(event) {
        var _a;
        config.quantity = Number((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
        dotQuantityRangeValue.innerText = dotQuantityRange.value;
        if (Points.length >= config.quantity) {
            Points.length = config.quantity;
        }
        else {
            while (Points.length <= config.quantity) {
                Points.push(new Point());
            }
        }
    }
}
