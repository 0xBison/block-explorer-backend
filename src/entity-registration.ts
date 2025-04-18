import { entityRegistry } from '@open-ethereum/indexer';
import * as entities from './weth-module/entities';
import { GasPrice } from './gas-module/GasPrice.entity';

// Register all entities from the entities object
Object.keys(entities).forEach((key) => {
  const entity = entities[key];
  if (entity && typeof entity === 'function') {
    entityRegistry.registerGeneric(entity);
  } else {
    console.warn(`Skipping invalid entity export: ${key}`);
  }
});

entityRegistry.registerGeneric(GasPrice);
