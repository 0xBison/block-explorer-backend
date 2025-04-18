import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GasPrice } from './GasPrice.entity';

@Injectable()
export class GasRepository extends Repository<GasPrice> {
  constructor(
    @InjectRepository(GasPrice)
    repository: Repository<GasPrice>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async saveGasPrice(gasPrice: bigint): Promise<GasPrice> {
    return this.save({
      gasPrice,
    });
  }

  async getLatestGasPrice(): Promise<GasPrice | null> {
    return this.createQueryBuilder('gas_price')
      .orderBy('gas_price.created_at', 'DESC')
      .getOne();
  }

  async getRecentGasPrices(limit: number = 100) {
    return this.createQueryBuilder('gas_price')
      .orderBy('gas_price.created_at', 'DESC')
      .take(limit)
      .getMany();
  }
}
