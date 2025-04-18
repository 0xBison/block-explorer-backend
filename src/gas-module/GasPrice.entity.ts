import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gas_price' })
export class GasPrice {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'gas_price', type: 'bigint' })
  gasPrice: bigint;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
