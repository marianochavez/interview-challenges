export default function validarParéntesis(parentesis: string): boolean {
  const arr: string[] = parentesis.split('');
  const stack: string[] = []

  if (!parentesis || arr.length === 1 || arr[0] === ")") return false;

  arr.forEach((item)=>{
    if(item==="("){
      stack.push(item);
    } else {
      if(stack.length === 0 ){
        return false;
      }
      stack.pop();
    }
  })
  
  return stack.length === 0 ;
}
