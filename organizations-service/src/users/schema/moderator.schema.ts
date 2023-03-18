import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Organization } from '../../organizations/schema/organization.schema';

@Schema({ timestamps: true, collection: 'moderators' })
export class Moderator {
  @Prop({ type: Number, required: true, unique: true })
  internalProfileId: number;

  @Prop({ type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
  })
  managedOrganizations: Organization[];
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);
