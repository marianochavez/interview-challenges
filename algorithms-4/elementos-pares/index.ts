export default function filtrarPares(array: unknown[]): unknown[] {
  const result:unknown[] = []
  const uniqueItems = [...new Set(array)]
  uniqueItems.forEach((item)=>{
    const len = array.filter((value)=>value===item).length
    if(len % 2 === 0) result.push(item)
  })

  return result;
}
