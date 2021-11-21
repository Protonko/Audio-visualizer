import type {ConfiguratorService} from '@app/services/interfaces/ConfiguratorService'
import 'reflect-metadata'
import {Container} from 'inversify'
import {SERVICE_IDENTIFIER} from '@app/config/service-identifier'
import {ConfiguratorServiceImpl} from '@app/services/ConfiguratorServiceImpl'

export const container = new Container()

container
  .bind<ConfiguratorService>(SERVICE_IDENTIFIER.CONFIGURATOR_SERVICE)
  .to(ConfiguratorServiceImpl)
  .inSingletonScope()
