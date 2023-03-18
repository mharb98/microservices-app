import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { ContactInfosModule } from './contact-infos/contact-infos.module';
import { LocationsModule } from './locations/locations.module';
import { OrganizationMiddleware } from './common/middlewares/organization-middleware.middleware';
import { CharityTypesModule } from './charity-types/charity-types.module';
import { OrganizationsCharityTypesModule } from './organizations-charity-types/organizations-charity-types.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BrokersModule } from './brokers/brokers.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OrganizationsModule,
    ContactInfosModule,
    LocationsModule,
    CharityTypesModule,
    OrganizationsCharityTypesModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    BrokersModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrganizationMiddleware)
      .forRoutes('organizations/:organizationId');
  }
}
