import { OrganizationEntity } from '../entities/organization.entity';

export default class QueryOrganizationsResult {
  organizations: OrganizationEntity[];
  count: number;
}
