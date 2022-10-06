import { config } from "./animationConfig.js";
export class Point {
    constructor(x) {
        this.color = '';
        this.pointElement = document.createElement('div');
        this.coordinate = {
            x: x,
            y: -2 * config.dotSize,
            startX: x
        };
        this.addPoint();
    }
    addPoint() {
        this.addElementStyles();
        Point.addToBody(this.pointElement);
        this.addNeededListeners();
    }
    addElementStyles() {
        this.pointElement.classList.add('dot');
        this.pointElement.classList.add('dot-animation-class');
        this.pointElement.style.width = this.pointElement.style.height = `${config.dotSize}px`;
        this.pointElement.style.animationDelay = `${Math.random() * 4}s`;
        this.reInitDotProperties();
        // setTimeout(() => {
        //   this.setDotPosition(this.getCurrentCoordinate());
        //   this.pointElement.classList.remove('dot-animation-class');
        // }, 6000);
    }
    static addToBody(pointElement) {
        document.body.appendChild(pointElement);
    }
    addNeededListeners() {
        this.pointElement.addEventListener('animationiteration', this.reInitDotProperties.bind(this));
    }
    getCurrentCoordinate() {
        const element = window.getComputedStyle(this.pointElement);
        const x = Number(element.left.substring(0, (element.left.length - 2)));
        const y = Number(element.top.substring(0, (element.top.length - 2)));
        return { x, y };
    }
    checkBorderStates(currentCoordinates) {
        if (currentCoordinates.y >= config.screenHeight - config.dotSize) {
        }
        if (currentCoordinates.x >= AvoidableField.currentAvoidCoordinates.x - 100
            && currentCoordinates.x <= AvoidableField.currentAvoidCoordinates.x + 100
            && currentCoordinates.y <= AvoidableField.currentAvoidCoordinates.y + 100
            && currentCoordinates.y >= AvoidableField.currentAvoidCoordinates.y - 100) {
            this.coordinate.x = this.coordinate.x > AvoidableField.currentAvoidCoordinates.x ?
                this.coordinate.x + 5 : this.coordinate.x -= 5;
        }
    }
    reInitDotProperties() {
        this.coordinate.x = Point.initCoordinateByScreenSize(config.screenWidth);
        this.pointElement.style.left = `${this.coordinate.x}px`;
        this.color = Point.getColorByXCoordinate(this.coordinate.x, config.screenWidth);
        this.pointElement.style.backgroundColor = this.color;
    }
    static initCoordinateByScreenSize(screenSize) {
        return Math.random() * screenSize - config.dotSize;
    }
    static getColorByXCoordinate(x, screenWidth) {
        return `hsl(${(x * 360 / screenWidth)}, 100%, 50%)`;
    }
    setDotPosition(coordinates) {
        this.pointElement.style.left = coordinates.x + 'px';
        this.pointElement.style.top = coordinates.y + 'px';
    }
}
export class AvoidableField {
    constructor() {
        document.addEventListener('mousemove', event => {
            AvoidableField.currentAvoidCoordinates = {
                x: event.offsetX,
                y: event.offsetY
            };
        });
    }
}
AvoidableField.currentAvoidCoordinates = {
    x: Infinity,
    y: Infinity
};
