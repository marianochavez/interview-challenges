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
  maxSuccess: number;
}

export interface FormValues {
  name: string;
}
