import { Module } from '@nestjs/common';
import { CharityTypesService } from './charity-types.service';
import { CharityTypesController } from './charity-types.controller';
import { CharityTypesRepository } from './repositories/charity-type.repository';
import { CharityTypeSchema, CharityType } from './schema/charity-type.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CharityTypesService, CharityTypesRepository],
  controllers: [CharityTypesController],
  imports: [
    MongooseModule.forFeature([
      { name: CharityType.name, schema: CharityTypeSchema },
    ]),
  ],
})
export class CharityTypesModule {}
