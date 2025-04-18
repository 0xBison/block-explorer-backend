import { DynamicModule, Module } from '@nestjs/common';
import { EthereumClientModule } from '@open-ethereum/indexer';
import { GasMonitorService } from './gas-monitor.service';
import { GasService } from './gas.service';
import { GasController } from './gas.controller';
import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasPrice } from './GasPrice.entity';
import { GasRepository } from './gas.repository';

export interface GasModuleOptions {
  pollInterval?: number; // in milliseconds
}

@Module({})
export class GasModule {
  static forRoot(options: GasModuleOptions = {}): DynamicModule {
    const pollInterval = options.pollInterval || 10000; // Default 10 seconds

    return {
      module: GasModule,
      imports: [EthereumClientModule, TypeOrmModule.forFeature([GasPrice])],
      providers: [
        {
          provide: 'GAS_POLL_INTERVAL',
          useValue: pollInterval,
        },
        makeGaugeProvider({
          name: 'gas_price',
          help: 'Current gas price in wei',
        }),
        GasMonitorService,
        GasService,
        GasRepository,
      ],
      controllers: [GasController],
      exports: [GasMonitorService, GasService],
    };
  }
}
