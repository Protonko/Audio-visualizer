import type {BarsService} from '@services/interfaces/BarsService'
import type {ConfiguratorService} from '@services/interfaces/ConfiguratorService'
import type {MicrophoneService} from '@services/interfaces/MicrophoneService'
import {inject, injectable} from 'inversify'
import {SERVICE_IDENTIFIER} from '@config/service-identifier'
import {Bar} from '@components/Bar'

@injectable()
export class BarsServiceImpl implements BarsService {
  private _MAX_HEXADECIMAL_VALUE = 0xFF
  private _bars: Bar[]

  constructor(
    @inject(SERVICE_IDENTIFIER.CONFIGURATOR_SERVICE)
    private _configuratorService: ConfiguratorService,
    @inject(SERVICE_IDENTIFIER.MICROPHONE_SERVICE)
    private _microphoneService: MicrophoneService,
  ) {
    this._bars = []

    this.createBars()
  }

  private static generateHslColor(value: number) {
    return `hsl(${value}, 100%, 50%)`
  }

  private createBars() {
    const barWidth = this._configuratorService.width / this._MAX_HEXADECIMAL_VALUE

    for (let i = 0; i <= this._MAX_HEXADECIMAL_VALUE; i++) {
      this._bars.push(new Bar(i * barWidth, this._configuratorService.height / 2, 1, 100, BarsServiceImpl.generateHslColor(i * 2)))
    }
  }

  drawBars() {
    const {canvasContext} = this._configuratorService
    const {samples} = this._microphoneService

    if (canvasContext && samples) {
      this._bars.forEach((bar, index) => {
        bar.update(samples[index])
        bar.draw(canvasContext)
      })
    } else {
      console.error('Canvas context is null!')
    }
  }
}
