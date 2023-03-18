import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Organization } from '../../organizations/schema/organization.schema';

@Schema({ timestamps: true, collection: 'charityTypes' })
export class CharityType {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  logo: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
  })
  organizations: Organization[];
}

export const CharityTypeSchema = SchemaFactory.createForClass(CharityType);
