import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Organization } from '../../organizations/schema/organization.schema';

@Schema({ timestamps: true, collection: 'locations' })
export class Location {
  @Prop({ required: true, type: String })
  province: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ type: Number })
  lat: number;

  @Prop({ type: Number })
  long: number;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ default: false, type: Boolean })
  default: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: Organization;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
