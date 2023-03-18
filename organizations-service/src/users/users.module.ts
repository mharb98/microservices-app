import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BrokersModule } from '../brokers/brokers.module';
import { ModeratorsConsumer } from './users.consumer';
import { ModeratorsService } from './moderators.service';
import { ModeratorsRepository } from './repositories/moderators.repository';
import { Moderator, ModeratorSchema } from './schema/moderator.schema';

@Module({
  providers: [ModeratorsService, ModeratorsRepository, ModeratorsConsumer],
  imports: [
    MongooseModule.forFeature([
      { name: Moderator.name, schema: ModeratorSchema },
    ]),
    BrokersModule,
    ConfigModule,
  ],
})
export class UsersModule {}
