import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Organization } from '../../organizations/schema/organization.schema';

@Schema({ timestamps: true, collection: 'contactInfos' })
export class ContactInfo {
  @Prop({
    type: String,
    required: true,
    enum: ['Mobile', 'Landline', 'Hotline', 'Email'],
  })
  type: string;

  @Prop({ type: String, required: true, unique: true })
  value: string;

  @Prop({ default: false })
  default: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: Organization;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
