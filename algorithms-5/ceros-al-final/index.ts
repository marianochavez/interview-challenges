export default function moverCeros(array: unknown[]): unknown[] {
  const cerosArray:unknown[] = array.filter(e=>e===0) 
  const noCerosArray:unknown[]=array.filter(e=>e!==0)
  
  return noCerosArray.concat(cerosArray);
}
