import type {BarsService} from '@services/interfaces/BarsService'
import type {ConfiguratorService} from '@services/interfaces/ConfiguratorService'
import type {MicrophoneService} from '@services/interfaces/MicrophoneService'
import {inject, injectable} from 'inversify'
import {SERVICE_IDENTIFIER} from '@config/service-identifier'
import {Bar} from '@components/Bar'

@injectable()
export class BarsServiceImpl implements BarsService {
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
    for (let i = 0; i < (this._microphoneService.fftSize / 2); i++) {
      this._bars.push(new Bar(
        0,
        i * 1.5,
        10,
        50,
        BarsServiceImpl.generateHslColor(i * 2),
        i,
      ))
    }
  }

  drawBars() {
    const {canvasContext} = this._configuratorService
    const {samples, volume} = this._microphoneService

    if (!canvasContext) {
      console.error('Canvas context is null!')
    } else if (!samples) {
      console.error('Samples are null!')
    } else if (!volume) {
      console.error('Volume is null!')
    } else {
      this._bars.forEach((bar, index) => {
        bar.update(samples[index])
        bar.draw(canvasContext, volume)
      })
    }
  }
}
