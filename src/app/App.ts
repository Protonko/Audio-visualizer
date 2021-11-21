import type {ConfiguratorService} from '@services/interfaces/ConfiguratorService'
import type {MicrophoneService} from '@services/interfaces/MicrophoneService'
import {SERVICE_IDENTIFIER} from '@config/service-identifier'
import {container} from '@config/ioc.config'
import {BarsService} from '@services/interfaces/BarsService'

export class App {
  _configuratorService: ConfiguratorService
  _microphoneService: MicrophoneService
  _barsService: BarsService

  constructor() {
    this._configuratorService = container.get(SERVICE_IDENTIFIER.CONFIGURATOR_SERVICE)
    this._microphoneService = container.get(SERVICE_IDENTIFIER.MICROPHONE_SERVICE)
    this._barsService = container.get(SERVICE_IDENTIFIER.BARS_SERVICE)

    this.animate()
  }

  private animate = () => {
    if (this._microphoneService.initialized) {
      this._configuratorService.canvasContext?.clearRect(
        0,
        0,
        this._configuratorService.width,
        this._configuratorService.height,
      )

      this._barsService.drawBars()
    }

    requestAnimationFrame(this.animate)
  }
}
