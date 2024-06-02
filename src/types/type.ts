export interface AuthType {
  setSearchParams: (params: URLSearchParams | Record<string, string>) => void;
}

export interface UserType {
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  id: number;
}
export interface WeatherDataType {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
}
