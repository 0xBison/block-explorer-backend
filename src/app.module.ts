import { Module } from '@nestjs/common';
import { IndexerModule } from '@open-ethereum/indexer';

// Register all entities BEFORE config.
import './entity-registration';
import { config } from './indexer.config';

import { GasModule } from './gas-module/gas.module';

@Module({
  imports: [IndexerModule.forRoot(config), GasModule.forRoot()],
})
export class AppModule {}
