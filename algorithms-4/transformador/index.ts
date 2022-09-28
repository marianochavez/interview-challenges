type Input = {
  nombres: string[];
  edades: number[];
};

type Output = {
  id: number;
  nombre: string;
  edad: number;
};

export default function transformador(input: Input): Output[] {
  const result: Output[] = input['nombres'].map(((name, i) => (
    { id: i+1, nombre: name, edad: input['edades'][i]}  as Output
  )))
  return result;
}
