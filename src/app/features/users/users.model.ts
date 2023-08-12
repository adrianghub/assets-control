export type User = UserDto;

export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}

interface AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface CompanyDto {
  name: string;
  catchPhrase: string;
  bs: string;
}
