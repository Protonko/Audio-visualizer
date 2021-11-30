import type {ConfiguratorService} from '@app/services/interfaces/ConfiguratorService'
import type {MicrophoneService} from '@services/interfaces/MicrophoneService'
import type {BarsService} from '@services/interfaces/BarsService'
import 'reflect-metadata'
import {Container} from 'inversify'
import {SERVICE_IDENTIFIER} from '@app/config/service-identifier'
import {ConfiguratorServiceImpl} from '@app/services/ConfiguratorServiceImpl'
import {MicrophoneServiceImpl} from '@services/MicrophoneServiceImpl'
import {BarsServiceImpl} from '@services/BarsServiceImpl'

export const container = new Container()

container
  .bind<ConfiguratorService>(SERVICE_IDENTIFIER.CONFIGURATOR_SERVICE)
  .to(ConfiguratorServiceImpl)
  .inSingletonScope()

container
  .bind<MicrophoneService>(SERVICE_IDENTIFIER.MICROPHONE_SERVICE)
  .to(MicrophoneServiceImpl)

container
  .bind<BarsService>(SERVICE_IDENTIFIER.BARS_SERVICE)
  .to(BarsServiceImpl)
