import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CharityType } from '../../charity-types/schema/charity-type.schema';
import { ContactInfo } from '../../contact-infos/schema/contact-info.schema';
import { Location } from '../../locations/schema/location.schema';
import { Moderator } from '../../users/schema/moderator.schema';

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CharityType' }],
  })
  charityTypes: CharityType[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moderator',
  })
  moderator: Moderator;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
