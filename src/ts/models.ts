import { config } from "./animationConfig.js";
import { ctx } from "./init.js";
import {ICoordinate} from "./interfaces";

export class Point {
  public readonly coordinate: ICoordinate;
  public color: string = '';

  public pointElement: HTMLElement = document.createElement('div');

  constructor() {
    this.coordinate = {
      x: Point.initCoordinateByScreenSize(config.screenWidth),
      y: Point.initCoordinateByScreenSize(config.screenHeight),
      startX: 0
    }
    this.coordinate.startX = this.coordinate.x;
    this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
    this.refreshPoint();
  }

  private static initCoordinateByScreenSize(screenSize: number): number {
    return Math.random() * screenSize - config.dotSize;
  }

  private static getColorByCoordinate(coordinate: number, screenSize: number): string {
    return `hsl(${(coordinate * 360 / screenSize)}, 100%, 50%)`;
  }

  public refreshPoint() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.coordinate.x, this.coordinate.y, config.dotSize/2, 0, 2 * Math.PI);
    ctx.fill();
  }

  public drop() {
    this.coordinate.y += config.velocity;
    this.checkBorderStates(this.coordinate);
  }

  private checkBorderStates(currentCoordinates: ICoordinate) {
    if (currentCoordinates.y >= config.screenHeight) {
      this.reInitDotProperties();
    }

    const isPointInAvoidableField = this.isPointInsideCircle(AvoidableField.coordinate, this.coordinate);
    if (isPointInAvoidableField) {
       this.moveOutsideAvoidableField();
    } else {
      // this.moveToStartPosition();
    }
    this.updateColor();
  }

  private isPointInsideCircle(circleCoordinates: ICoordinate, pointCoordinate: ICoordinate): boolean {
    return (circleCoordinates.x - pointCoordinate.x) ** 2 + (circleCoordinates.y - pointCoordinate.y) ** 2 <= config.avoidFieldSize ** 2;
  }

  private moveOutsideAvoidableField() {
    const distance = Math.sqrt((this.coordinate.x - AvoidableField.coordinate.x) ** 2 +
      (this.coordinate.y - AvoidableField.coordinate.y) ** 2);
    const additionalSpeed = config.avoidFieldSize - distance;
    this.coordinate.x = this.coordinate.x > AvoidableField.coordinate.x ?
      this.coordinate.x + config.velocity + additionalSpeed : this.coordinate.x - (config.velocity + additionalSpeed);
    this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
  }

  private moveToStartPosition() {
    if (!this.coordinate.startX) { return; }
    const additionalSpeed = 4;
    if (this.coordinate.x > this.coordinate.startX) {
      this.coordinate.x =  this.coordinate.x - additionalSpeed;
    } else if (this.coordinate.x < this.coordinate.startX) {
      this.coordinate.x = this.coordinate.x + additionalSpeed;
    }
  }

  public reInitDotProperties(): void {
    this.coordinate.x = Point.initCoordinateByScreenSize(config.screenWidth);
    this.coordinate.startX = this.coordinate.x;
    this.coordinate.y = 0;
    this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
    this.pointElement.style.backgroundColor = this.color;
  }

  private updateColor() {
    this.color = Point.getColorByCoordinate(this.coordinate.x, config.screenWidth);
  }
}

export class AvoidableField {
  public static coordinate: ICoordinate = {
    x: Infinity,
    y: Infinity
  }

  constructor() {
    ['mousemove', 'touchmove'].forEach(evn => {
      document.addEventListener(evn, (event: any) => {
        AvoidableField.coordinate = {
          x: event.offsetX ?? event.changedTouches[0].pageX,
          y: event.offsetY ?? event.changedTouches[0].pageY
        }
      })
    })
  }

  public static getColorByCoordinate(coordinate: number, screenSize: number): string {
    return `hsl(${(coordinate * 360 / screenSize)}, 100%, 50%)`;
  }

  public static getAvoidFieldGradient(): CanvasGradient {
    const gradient: CanvasGradient = ctx.createLinearGradient(
      AvoidableField.coordinate.x - config.avoidFieldSize / 2,
      AvoidableField.coordinate.y,
      AvoidableField.coordinate.x + config.avoidFieldSize / 2,
      AvoidableField.coordinate.y
    );
    gradient.addColorStop(0, AvoidableField.getColorByCoordinate(AvoidableField.coordinate.x - config.avoidFieldSize, config.screenWidth));
    gradient.addColorStop(0.5, AvoidableField.getColorByCoordinate(AvoidableField.coordinate.x, config.screenWidth));
    gradient.addColorStop(1, AvoidableField.getColorByCoordinate(AvoidableField.coordinate.x + config.avoidFieldSize, config.screenWidth));

    return gradient;
  }
}