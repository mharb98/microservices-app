import { ContactInfoType } from './contact-info-type.enum';

export default interface UpdateContactInfoInput {
  default?: boolean;
  value?: string;
  type?: ContactInfoType;
  organization?: string;
}
