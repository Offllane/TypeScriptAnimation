import { config } from "./animationConfig.js";
export class Point {
    constructor(x) {
        this.pointElement = document.createElement('div');
        this.currentCoordinates = {
            x: x,
            y: Point.initCoordinateByScreenSize(config.screenHeight)
        };
        this.color = Point.getColorByXCoordinate(this.currentCoordinates.x, config.screenWidth);
        this.addPoint();
        setInterval(() => {
            this.getNewCoordinates(this.currentCoordinates);
            this.refreshDotParameters();
        }, 20);
    }
    addPoint() {
        this.addElementStyles();
        Point.addToBody(this.pointElement);
    }
    addElementStyles() {
        this.pointElement.classList.add('dot');
        this.pointElement.style.width = this.pointElement.style.height = `${config.dotSize}px`;
        this.refreshDotParameters();
    }
    static addToBody(pointElement) {
        document.body.appendChild(pointElement);
    }
    getNewCoordinates(currentCoordinates) {
        if (currentCoordinates.y >= config.screenHeight - config.dotSize) {
            this.reInitDotProperties();
        }
        else {
            this.currentCoordinates.y += 3;
        }
    }
    reInitDotProperties() {
        this.currentCoordinates.y = 0;
        this.currentCoordinates.x = Point.initCoordinateByScreenSize(config.screenWidth);
        this.color = Point.getColorByXCoordinate(this.currentCoordinates.x, config.screenWidth);
    }
    static initCoordinateByScreenSize(screenSize) {
        return Math.random() * screenSize - config.dotSize;
    }
    static getColorByXCoordinate(x, screenWidth) {
        return `hsl(${(x * 360 / screenWidth)}, 100%, 50%)`;
    }
    refreshDotParameters() {
        this.pointElement.style.left = `${this.currentCoordinates.x}px`;
        this.pointElement.style.top = `${this.currentCoordinates.y}px`;
        this.pointElement.style.backgroundColor = this.color;
        this.pointElement.style.boxShadow = `0 0 15px 0 ${this.color}`;
    }
}
