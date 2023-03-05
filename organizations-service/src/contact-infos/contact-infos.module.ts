import { Module } from '@nestjs/common';
import { ContactInfosService } from './contact-infos.service';
import { ContactInfosController } from './contact-infos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactInfo, ContactInfoSchema } from './schema/contact-info.schema';
import { ContactInfosRepository } from './repositories/contact-infos.repository';

@Module({
  providers: [ContactInfosService, ContactInfosRepository],
  controllers: [ContactInfosController],
  imports: [
    MongooseModule.forFeature([
      { name: ContactInfo.name, schema: ContactInfoSchema },
    ]),
  ],
})
export class ContactInfosModule {}
