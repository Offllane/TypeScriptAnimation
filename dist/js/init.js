import { Point, AvoidableField } from "./models.js";
import { config } from "./animationConfig.js";
const Points = [];
(function () {
    initPoints();
    initAvoidableField();
}());
function initPoints() {
    for (let i = 0, j = 0; i < config.quantity; i++, j++) {
        if (j * 50 > config.screenWidth) {
            j = 0;
        }
        Points.push(new Point(j * 50));
    }
}
function initAvoidableField() {
    new AvoidableField();
}
