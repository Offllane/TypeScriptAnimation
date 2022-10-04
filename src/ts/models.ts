import { config } from "./animationConfig.js";
import {ICoordinate} from "./interfaces";

export class Point {
  public currentCoordinates: ICoordinate;
  public color: string;

  public pointElement: HTMLElement = document.createElement('div');

  constructor(x: number) {
    this.currentCoordinates = {
      x: x,
      y: Point.initCoordinateByScreenSize(config.screenHeight)
    }
    this.color = Point.getColorByXCoordinate(this.currentCoordinates.x, config.screenWidth);
    this.addPoint();
    setInterval(() => {
      this.getNewCoordinates(this.currentCoordinates);
      this.refreshDotParameters();
    }, 20)
  }

  private addPoint() {
    this.addElementStyles()
    Point.addToBody(this.pointElement);
  }

  private addElementStyles() {
    this.pointElement.classList.add('dot');
    this.pointElement.style.width = this.pointElement.style.height = `${config.dotSize}px`;
    this.refreshDotParameters();
  }

  private static addToBody(pointElement: HTMLElement) {
    document.body.appendChild(pointElement);
  }

  private getNewCoordinates(currentCoordinates: ICoordinate) {
    if (currentCoordinates.y >= config.screenHeight - config.dotSize) {
      this.reInitDotProperties();
    } else {
      this.currentCoordinates.y += 3;
    }
  }

  private reInitDotProperties(): void {
    this.currentCoordinates.y = 0;
    this.currentCoordinates.x = Point.initCoordinateByScreenSize(config.screenWidth);
    this.color = Point.getColorByXCoordinate(this.currentCoordinates.x, config.screenWidth);
  }

  private static initCoordinateByScreenSize(screenSize: number): number {
    return Math.random() * screenSize - config.dotSize;
  }

  private static getColorByXCoordinate(x: number, screenWidth: number): string {
    return `hsl(${(x * 360 / screenWidth)}, 100%, 50%)`;
  }

  private refreshDotParameters() {
    this.pointElement.style.left = `${this.currentCoordinates.x}px`;
    this.pointElement.style.top = `${this.currentCoordinates.y}px`;
    this.pointElement.style.backgroundColor = this.color;
    this.pointElement.style.boxShadow = `0 0 15px 0 ${this.color}`
  }
}