import type {ConfiguratorService} from '@services/interfaces/ConfiguratorService'
import type {MicrophoneService} from '@services/interfaces/MicrophoneService'
import type {BarsService} from '@services/interfaces/BarsService'
import {SERVICE_IDENTIFIER} from '@config/service-identifier'
import {container} from '@config/ioc.config'

export class App {
  _configuratorService: ConfiguratorService
  _microphoneService: MicrophoneService
  _barsService: BarsService
  _angle: number

  constructor() {
    this._configuratorService = container.get(SERVICE_IDENTIFIER.CONFIGURATOR_SERVICE)
    this._microphoneService = container.get(SERVICE_IDENTIFIER.MICROPHONE_SERVICE)
    this._barsService = container.get(SERVICE_IDENTIFIER.BARS_SERVICE)

    this._angle = 0

    this.animate()
  }

  private rotateAnimation() {
    this._angle -= 0.01

    this._configuratorService.canvasContext?.save()
    this._configuratorService.canvasContext?.translate(this._configuratorService.width / 2, this._configuratorService.height / 2)
    this._configuratorService.canvasContext?.rotate(this._angle)
  }

  private animate = () => {
    if (this._microphoneService.initialized) {
      this._configuratorService.canvasContext?.clearRect(
        0,
        0,
        this._configuratorService.width,
        this._configuratorService.height,
      )

      this.rotateAnimation()
      this._barsService.drawBars()
      this._configuratorService.canvasContext?.restore()
    }

    requestAnimationFrame(this.animate)
  }
}
