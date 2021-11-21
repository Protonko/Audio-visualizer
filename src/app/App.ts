import type {ConfiguratorService} from '@app/services/interfaces/ConfiguratorService'
import {SERVICE_IDENTIFIER} from '@app/config/service-identifier'
import {container} from '@app/config/ioc.config'

export class App {
  _configuratorService: ConfiguratorService

  constructor() {
    this._configuratorService = container.get(
      SERVICE_IDENTIFIER.CONFIGURATOR_SERVICE,
    )
  }

  animate() {
    this._configuratorService.canvasContext?.clearRect(
      0,
      0,
      this._configuratorService.width,
      this._configuratorService.height,
    )

    requestAnimationFrame(this.animate)
  }
}
