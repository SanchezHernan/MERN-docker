import { API_URL } from "./settings"

export default async function getDCCharacters() {
    const response = await fetch(`${API_URL}/obtenerHeroes/dc`)
    const jsonData = await response.json(); 
    return(jsonData);
}