/* --------------------------------------------------------------------- *\
|  This code was auto-generated by the solidity-event-to-typeorm package. |
|                                                                         |
|  Changes to this file may cause incorrect behavior and will be lost if  |
|  the code is regenerated.                                               |
\* ---------------------------------------------------------------------  */

import { Column, Entity } from 'typeorm';
import * as constants from '../constants';
import { BlockchainEventEntity } from './BlockchainEventEntity';

@Entity({ name: 'transfer_fab013d9' })
export class TransferEntity_fab013d9 extends BlockchainEventEntity {
  @Column({
    name: 'src',
    nullable: false,
    type: 'varchar',
    update: false,
    length: constants.BYTES_32_LENGTH,
  })
  public src: string; // address

  @Column({
    name: 'dst',
    nullable: false,
    type: 'varchar',
    update: false,
    length: constants.BYTES_32_LENGTH,
  })
  public dst: string; // address

  @Column({
    name: 'wad',
    nullable: false,
    type: 'numeric',
    precision: constants.UINT_256_MAX_DIGITS,
    update: false,
  })
  public wad: string; // uint
}
