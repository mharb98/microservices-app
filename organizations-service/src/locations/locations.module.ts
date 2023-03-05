import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationsRepository } from './repositories/locations.repository';
import { LocationSchema, Location } from './schema/location.schema';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
})
export class LocationsModule {}
