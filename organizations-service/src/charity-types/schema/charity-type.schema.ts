import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const CharityTypeSchema = SchemaFactory.createForClass(CharityType);
