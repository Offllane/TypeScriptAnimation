import { config } from "./animationConfig.js";
import { ctx } from "./init.js";
export class Point {
    constructor() {
        this.color = '';
        this.pointElement = document.createElement('div');
        this.coordinate = {
            x: Point.initCoordinateByScreenSize(config.screenWidth),
            y: Point.initCoordinateByScreenSize(config.screenHeight),
            startX: 0
        };
        this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
        this.refreshPoint();
    }
    static initCoordinateByScreenSize(screenSize) {
        return Math.random() * screenSize - config.dotSize;
    }
    static getColorByCoordinate(coordinate, screenSize) {
        return `hsl(${(coordinate * 360 / screenSize)}, 100%, 50%)`;
    }
    refreshPoint() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.coordinate.x, this.coordinate.y, config.dotSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    drop() {
        this.coordinate.y += config.velocity;
        this.checkBorderStates(this.coordinate);
    }
    checkBorderStates(currentCoordinates) {
        if (currentCoordinates.y >= config.screenHeight) {
            this.reInitDotProperties();
        }
        const isPointInAvoidableField = this.isPointInsideCircle(AvoidableField.coordinate, this.coordinate);
        if (isPointInAvoidableField) {
            this.moveOutsideAvoidableField();
        }
    }
    isPointInsideCircle(circleCoordinates, pointCoordinate) {
        return Math.pow((circleCoordinates.x - pointCoordinate.x), 2) + Math.pow((circleCoordinates.y - pointCoordinate.y), 2) <= Math.pow(config.avoidFieldSize, 2);
    }
    moveOutsideAvoidableField() {
        this.coordinate.x = this.coordinate.x > AvoidableField.coordinate.x ?
            this.coordinate.x + config.velocity * 2 : this.coordinate.x -= config.velocity * 2;
        this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
    }
    reInitDotProperties() {
        this.coordinate.x = Point.initCoordinateByScreenSize(config.screenWidth);
        this.coordinate.y = 0;
        this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
        this.pointElement.style.backgroundColor = this.color;
    }
}
export class AvoidableField {
    constructor() {
        ['mousemove', 'touchmove'].forEach(evn => {
            document.addEventListener(evn, (event) => {
                AvoidableField.coordinate = {
                    x: event.offsetX,
                    y: event.offsetY
                };
            });
        });
    }
    static getColorByCoordinate(coordinate, screenSize) {
        return `hsl(${(coordinate * 360 / screenSize)}, 100%, 50%)`;
    }
    static getAvoidFieldGradient() {
        const gradient = ctx.createLinearGradient(AvoidableField.coordinate.x - config.avoidFieldSize / 2, AvoidableField.coordinate.y, AvoidableField.coordinate.x + config.avoidFieldSize / 2, AvoidableField.coordinate.y);
        gradient.addColorStop(0, AvoidableField.getColorByCoordinate(AvoidableField.coordinate.x - config.avoidFieldSize, config.screenWidth));
        gradient.addColorStop(0.5, AvoidableField.getColorByCoordinate(AvoidableField.coordinate.x, config.screenWidth));
        gradient.addColorStop(1, AvoidableField.getColorByCoordinate(AvoidableField.coordinate.x + config.avoidFieldSize, config.screenWidth));
        return gradient;
    }
}
AvoidableField.coordinate = {
    x: Infinity,
    y: Infinity
};
