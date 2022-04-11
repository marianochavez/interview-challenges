export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface Stats {
  success: number;
  errors: number;
  pokemon: Pokemon;
  isSuccess: boolean;
}

export interface FormValues {
  name: string;
}
