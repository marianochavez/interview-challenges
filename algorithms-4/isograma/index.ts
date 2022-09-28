export default function esIsograma(string: string): boolean {
  const accents = {á:'a',é:'e',í:'i',ó:'o',ú:'u'}
  const cleanedString = string.toLowerCase().split('').map((letter)=>{
    if(accents[letter]) return accents[letter]
    return letter
  })

  const unRepeatedChar = [...new Set(cleanedString)]

  return cleanedString.length === unRepeatedChar.length;
}
