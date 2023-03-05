import FindOrganizationInput from "./find-organization-input.interface";

export default interface QueryOrganizationInput extends FindOrganizationInput {
    contactValue?: string;
    province?: string;
    charityTypeIds?: number[];
}