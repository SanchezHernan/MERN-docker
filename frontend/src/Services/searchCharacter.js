import { API_URL } from "./settings"

export default async function searchCharacter( name ) {
    const response = await fetch(`${API_URL}/buscarHeroes/${name}`)
    const jsonData = await response.json(); 
    return(jsonData);
}