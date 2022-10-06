import { config } from "./animationConfig.js";
import {ICoordinate} from "./interfaces";

export class Point {
  public readonly coordinate: ICoordinate;
  public color: string = '';

  public pointElement: HTMLElement = document.createElement('div');

  constructor(x: number) {
    this.coordinate = {
      x: x,
      y: -2 * config.dotSize,
      startX: x
    }
    this.addPoint();
  }

  private addPoint() {
    this.addElementStyles()
    Point.addToBody(this.pointElement);
    this.addNeededListeners();
  }

  private addElementStyles() {
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

  private static addToBody(pointElement: HTMLElement) {
    document.body.appendChild(pointElement);
  }

  private addNeededListeners(): void {
    this.pointElement.addEventListener('animationiteration', this.reInitDotProperties.bind(this))
  }

  private getCurrentCoordinate(): ICoordinate {
    const element = window.getComputedStyle(this.pointElement);
    const x: number = Number(element.left.substring(0, (element.left.length - 2)));
    const y: number = Number(element.top.substring(0, (element.top.length - 2)));
    return { x, y }
  }

  private checkBorderStates(currentCoordinates: ICoordinate) {
    if (currentCoordinates.y >= config.screenHeight - config.dotSize) {

    }

    if (currentCoordinates.x >= AvoidableField.currentAvoidCoordinates.x - 100
        && currentCoordinates.x <= AvoidableField.currentAvoidCoordinates.x + 100
        && currentCoordinates.y <= AvoidableField.currentAvoidCoordinates.y + 100
        && currentCoordinates.y >= AvoidableField.currentAvoidCoordinates.y - 100 ) {
      this.coordinate.x = this.coordinate.x > AvoidableField.currentAvoidCoordinates.x ?
        this.coordinate.x + 5 : this.coordinate.x -= 5;
    }
  }

  public reInitDotProperties(): void {
    this.coordinate.x = Point.initCoordinateByScreenSize(config.screenWidth);
    this.pointElement.style.left = `${this.coordinate.x}px`;
    this.color = Point.getColorByXCoordinate(this.coordinate.x, config.screenWidth);
    this.pointElement.style.backgroundColor = this.color;
  }

  private static initCoordinateByScreenSize(screenSize: number): number {
    return Math.random() * screenSize - config.dotSize;
  }

  private static getColorByXCoordinate(x: number, screenWidth: number): string {
    return `hsl(${(x * 360 / screenWidth)}, 100%, 50%)`;
  }

  private setDotPosition(coordinates: ICoordinate) {
    this.pointElement.style.left = coordinates.x + 'px';
    this.pointElement.style.top = coordinates.y + 'px';
  }
}

export class AvoidableField {
  public static currentAvoidCoordinates: ICoordinate = {
    x: Infinity,
    y: Infinity
  }

  constructor() {
    document.addEventListener('mousemove', event => {
      AvoidableField.currentAvoidCoordinates = {
        x: event.offsetX,
        y: event.offsetY
      }
    })
  }
}