import { Injectable, Logger } from '@nestjs/common';
import { Gauge } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { GasRepository } from './gas.repository';

@Injectable()
export class GasService {
  private readonly logger = new Logger(GasService.name);

  constructor(
    @InjectMetric('gas_price') private gasPriceGauge: Gauge<string>,
    private readonly gasRepository: GasRepository,
  ) {}

  async getLatestGasPrice() {
    const latestGasPrice = await this.gasRepository.getLatestGasPrice();
    if (!latestGasPrice) {
      throw new Error('No latest gas price found');
    }
    const gasPrice = Number(latestGasPrice.gasPrice);
    this.gasPriceGauge.set(gasPrice);
    return {
      gasPrice,
      timestamp: Math.floor(latestGasPrice.createdAt.getTime() / 1000),
    };
  }

  async getGasPrices(limit: number = 10) {
    const gasPrices = await this.gasRepository.getRecentGasPrices(limit);
    return gasPrices.map((gp) => ({
      gasPrice: Number(gp.gasPrice),
      timestamp: Math.floor(gp.createdAt.getTime() / 1000),
    }));
  }
}
