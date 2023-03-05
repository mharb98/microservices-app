import { ContactInfoType } from './contact-info-type.enum';

export interface QueryContactInfoInput {
  id?: number;
  type?: ContactInfoType;
  value?: string;
  default?: boolean;
  organization?: string;
}
