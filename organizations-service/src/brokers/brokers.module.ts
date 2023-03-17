import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';

@Module({
  imports: [ConfigModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class BrokersModule {}
