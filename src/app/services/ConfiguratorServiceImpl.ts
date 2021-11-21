import type {ConfiguratorService} from '@app/services/interfaces/ConfiguratorService'

export class ConfiguratorServiceImpl implements ConfiguratorService {
  private readonly _canvas: HTMLCanvasElement
  private readonly _canvasContext: CanvasRenderingContext2D | null

  constructor() {
    this._canvas = document.getElementById('canvas') as HTMLCanvasElement
    this._canvasContext = this._canvas.getContext('2d')

    this._canvas.width = window.innerWidth
    this._canvas.height = window.innerHeight
  }

  get canvas() {
    return this._canvas
  }

  get canvasContext() {
    return this._canvasContext
  }

  get width() {
    return this._canvas.width
  }

  get height() {
    return this._canvas.height
  }
}
