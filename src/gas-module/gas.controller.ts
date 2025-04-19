import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { GasService } from './gas.service';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max } from 'class-validator';

class GetGasPricesDto {
  @ApiProperty({
    description: 'Maximum number of gas prices to return',
    required: false,
    default: 100,
    maximum: 1000,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(1000)
  limit?: number = 100;
}

@ApiTags('Gas')
@Controller('gas')
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get('/price')
  async getLatestGasPrice() {
    return this.gasService.getLatestGasPrice();
  }

  @Get('/prices')
  async getGasPrices(@Query() query: GetGasPricesDto) {
    return this.gasService.getGasPrices(query.limit);
  }
}
