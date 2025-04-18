import { Config, generate } from 'solidity-events-to-typeorm';
import * as path from 'path';
import ComptrollerImplementation from '../src/abi/weth.json';

const outputPath = path.resolve(__dirname, '../src/weth-module/');

console.log('outputPath', outputPath);

// process.exit(0);

export const config: Config = {
  output: {
    path: outputPath,
    entities: path.resolve(outputPath, './entities/'),
    abis: path.resolve(outputPath, './abi/'),
  },
  migrations: {
    path: path.resolve(outputPath, './migrations/'),
    migrationName: 'InitialSchema',
    schemaName: 'SQL_SCHEMA',
    schemaVariable: true,
  },
  docs: {
    path: path.resolve(outputPath, './docs/'),
  },
  contracts: {
    WETH: {
      abi: ComptrollerImplementation,
    },
  },
};

generate(config).catch((err) => {
  console.error('Fatal error during generation:', err);
  process.exit(1);
});
