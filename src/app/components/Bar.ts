export class Bar {
  private readonly _x: number
  private readonly _y: number
  private readonly _width: number
  private _height: number
  private readonly _color: string
  private readonly _angle: number

  constructor(x: number, y: number, width: number, height: number, color: string, index: number) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._color = color
    this._angle = index
  }

  update(microphoneValue: number) {
    const sound = microphoneValue * 1000

    if (sound > this._height) {
      this._height = sound
    } else {
      this._height -= this._height * 0.05
    }
  }

  draw(canvasContext: CanvasRenderingContext2D, volume: number) {
    canvasContext.strokeStyle = this._color
    canvasContext.save()
    canvasContext.translate(0, 0)
    canvasContext.rotate(this._angle * 0.05)
    canvasContext.scale(1 + volume * 0.2, 1 + volume * 0.2)
    canvasContext.beginPath()
    canvasContext.moveTo(this._x, this._y)
    canvasContext.lineTo(this._y, this._height)
    canvasContext.stroke()
    canvasContext.strokeRect(this._x, this._y, this._width, this._height)
    canvasContext.restore()
  }
}
