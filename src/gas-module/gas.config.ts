import { IsNumber, Min } from 'class-validator';

export class GasConfig {
  @IsNumber()
  @Min(1000) // Minimum 1 second
  GAS_POLL_INTERVAL: number = 10000; // Default 10 seconds
}
