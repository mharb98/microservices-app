import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ContactInfo } from '../../contact-infos/schema/contact-info.schema';
import { Location } from '../../locations/schema/location.schema';

@Schema({ timestamps: true, collection: 'organizations' })
export class Organization {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  logo: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }] })
  locations: Location[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactInfo' }],
  })
  contactInfo: ContactInfo[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
