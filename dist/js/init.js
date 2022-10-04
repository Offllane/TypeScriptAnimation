import { Point } from "./models.js";
import { config } from "./animationConfig.js";
(function () {
    initPoints();
}());
function initPoints() {
    for (let i = 0, j = 0; i < config.quantity; i++, j++) {
        if (j * 50 > config.screenWidth) {
            j = 0;
        }
        new Point(j * 50);
    }
}
