import { API_URL } from "./settings"

export default async function postCharacter( house, name, realname, year, equipment, biography, images ) {
   
    if (realname === '') realname = 'null'
    if (equipment === '') equipment = 'null'
    const response = await fetch(`${API_URL}/agregarHeroe/${house}/${name}/${realname}/${year}/${equipment}/${biography}`, {
        method: 'POST',
        body: JSON.stringify(images),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    const jsonData = await response.json(); 
    return(jsonData);
}