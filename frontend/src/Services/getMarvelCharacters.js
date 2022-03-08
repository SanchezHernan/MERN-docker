import { API_URL } from "./settings"

export default async function getMarvelCharacters() {
    const response = await fetch(`${API_URL}/obtenerHeroes/marvel`)
    const jsonData = await response.json(); 
    return(jsonData);
}