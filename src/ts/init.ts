import { Point } from "./models.js";


(function() {
 initPoints();
}());

function initPoints() {
  for (let i = 0; i < 10; i++) {
    new Point();
  }
}