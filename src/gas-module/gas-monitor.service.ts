import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import {
  EthereumHttpClient,
  EthereumHttpClientProviderIdentifier,
  sleep,
} from '@open-ethereum/indexer';
import { GasRepository } from './gas.repository';

@Injectable()
export class GasMonitorService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(GasMonitorService.name);
  private isRunning = false;

  constructor(
    @Inject(EthereumHttpClientProviderIdentifier)
    private client: EthereumHttpClient,
    private gasRepository: GasRepository,
    @Inject('GAS_POLL_INTERVAL')
    private readonly pollInterval: number,
  ) {}

  async onModuleInit() {
    this.isRunning = true;
    this.startMonitoring();
  }

  onApplicationShutdown() {
    this.isRunning = false;
  }

  private async startMonitoring(): Promise<void> {
    while (this.isRunning) {
      try {
        const gasPrice = await this.client.getGasPrice();
        await this.gasRepository.saveGasPrice(gasPrice);
        this.logger.debug(`Updated gas price: ${gasPrice}`);
      } catch (error) {
        this.logger.error(`Failed to fetch gas price: ${error.message}`);
      }
      await sleep(this.pollInterval);
    }
  }

  async getLatestGasPrice(): Promise<bigint | null> {
    const latestPrice = await this.gasRepository.getLatestGasPrice();
    return latestPrice ? BigInt(latestPrice.gasPrice) : null;
  }
}
