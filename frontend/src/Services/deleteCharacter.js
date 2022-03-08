import { API_URL } from "./settings"

export default async function deleteCharacter(name) {
    const response = await fetch(`${API_URL}/delete/character/${name}`)
    const jsonData = await response.json(); 
    return(jsonData);
}