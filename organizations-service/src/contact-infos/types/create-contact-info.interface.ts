import { ContactInfoType } from './contact-info-type.enum';

export default interface CreateContactInfoInput {
  type: ContactInfoType;
  value: string;
}
