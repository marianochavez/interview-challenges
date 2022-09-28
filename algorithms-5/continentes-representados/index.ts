type Registry = {
  firstName: string;
  lastName: string;
  country: string;
  continent: string;
  age: number;
  language: string;
};

export default function continentesRepresentados(array: Registry[]): boolean {
  const continents = {Africa:false,Americas:false,Asia:false,Europe:false,Oceania:false}
  array.forEach((dev)=>{
    continents[dev.continent]= true;
  })
  return Object.values(continents).every(value=>value===true);
}

export function checkLangDevContinent(language: string,continent:string,array: Registry[]){
  const result = array.filter((dev)=>dev.continent===continent && dev.language===language);
  return result.length;
}

export function listOfLanguages(array: Registry[]){
  const allLanguages = array.map((dev)=>dev.language);
  const filteredLang = [...new Set(allLanguages)];

  return filteredLang;
}