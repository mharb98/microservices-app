export default interface CreateLocationInput {
  province: string;
  city: string;
  address: string;
  lat?: number;
  long?: number;
  default?: boolean;
}
