import { API_URL } from "./settings"

export default async function getCharacters() {
    const response = await fetch(`${API_URL}/obtenerHeroes`)
    const jsonData = await response.json(); 
    return(jsonData);
}