import {config} from "./animationConfig.js";
import { Points } from "./init.js";
import { Point } from "./models.js";

export function initRanges() {
  const  velocityRange = document.getElementById('velocity-range') as HTMLInputElement;
  const  dotQuantityRange = document.getElementById('dot-quantity-range') as HTMLInputElement;
  const  dotSizeRange = document.getElementById('dot-size-range') as HTMLInputElement;
  const  avoidSizeRange = document.getElementById('avoid-size-range') as HTMLInputElement;

  const  velocityRangeValue = document.getElementById('velocity-range-value') as HTMLElement;
  const  dotQuantityRangeValue = document.getElementById('dot-quantity-range-value') as HTMLElement;
  const  dotSizeRangeValue = document.getElementById('dot-size-range-value') as HTMLElement;
  const  avoidSizeRangeValue = document.getElementById('avoid-size-range-value') as HTMLElement;

  setStartRangesValues()
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
    dotQuantityRange.oninput = event =>  setDotsQuantity(event);
  }

  function setVelocity(event: Event): void {
    config.velocity = Number(event?.target?.value);
    velocityRangeValue.innerText = velocityRange.value;
  }

  function setDotSize(event: Event): void {
    config.dotSize = Number(event?.target?.value);
    dotSizeRangeValue.innerText = dotSizeRange.value;
  }

  function setAvoidFieldSize(event: Event): void {
    config.avoidFieldSize = Number(event?.target?.value);
    avoidSizeRangeValue.innerText = avoidSizeRange.value;
  }

  function setDotsQuantity(event: Event): void {
    config.quantity = Number(event?.target?.value);
    dotQuantityRangeValue.innerText = dotQuantityRange.value;

    if (Points.length >= config.quantity) {
      Points.length = config.quantity;
    } else {
      while (Points.length <= config.quantity) {
        Points.push(new Point());
      }
    }
  }
}


