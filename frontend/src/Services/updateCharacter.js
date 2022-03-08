import { API_URL } from "./settings"

export default async function updateCharacter( house, name, realname, year, equipment, biography, images ) {
    if (realname === '') realname = 'null'
    if (equipment === '') equipment = 'null'
    const response = await fetch(`${API_URL}/updateCharacter/${house}/${name}/${realname}/${year}/${equipment}/${biography}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(images),
    })
    const jsonData = await response.json(); 
    return(jsonData);
}