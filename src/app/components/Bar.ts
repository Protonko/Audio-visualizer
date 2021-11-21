export class Bar {
  private _x: number
  private readonly _y: number
  private readonly _width: number
  private _height: number
  private readonly _color: string

  constructor(x: number, y: number, width: number, height: number, color: string) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._color = color
  }

  update(microphoneValue: number) {
    this._height = microphoneValue
  }

  draw(canvasContext: CanvasRenderingContext2D) {
    canvasContext.fillStyle = this._color
    canvasContext.fillRect(this._x, this._y, this._width, this._height)
  }
}
