import { IndexerConfig } from '@open-ethereum/indexer';
import WETHAbi from './weth-module/abi/WETH.json';
import { GasPriceMigration1741835491001 } from './gas-module/migrations/1741835491001-GasPrice';
import { InitialSchema1744958835231 } from './weth-module/migrations/1744958835231-InitialSchema';

export const config: IndexerConfig = {
  indexer: {
    network: {
      rpcUrl: process.env.NODE_RPC_URL,
      chainId: parseInt(process.env.NODE_CHAIN_ID),
    },
    contracts: {
      WETH: {
        abi: WETHAbi,
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        startBlock: 22290713,
      },
    },
  },
  database: {
    migrations: [InitialSchema1744958835231, GasPriceMigration1741835491001],
  },
  app: {
    disableMetrics: true,
  },
};
