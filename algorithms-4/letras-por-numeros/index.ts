export default function letrasPorNumeros(string: string): string {
  let charsCode = ""
  const accents = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }
  const cleanedString = string.trim().split(" ").join("")
    .toLowerCase().split('').map((letter) => {
      if (accents[letter]) return accents[letter]
      return letter
    })
  cleanedString.forEach((char:string)=>{
    let code = char.charCodeAt(0);
    charsCode += `${code-96} `
  })
  console.log(charsCode)
  return charsCode.trim();
}
