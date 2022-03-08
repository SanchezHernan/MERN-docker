import { API_URL } from "./settings"

export default async function getOneCharacter( name ) {
    const response = await fetch(`${API_URL}/obtener/heroe/${name}`)
    const jsonData = await response.json(); 
    return(jsonData);
}