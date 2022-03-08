import Navbar from  '../../Components/Navbar/navbar'
import { CardsContainer } from '../../Components/CardsContainer/cardsContainer'
//import getCharacters from '../../Services/getCharacters'

import './searchPage.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import searchCharacter from '../../Services/searchCharacter'


export const SearchPage = () => {

    const { busqueda } = useParams()

    const [heroes, setHeroes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await searchCharacter(busqueda)
            setHeroes(data)
        }
        fetchData()
    }, [busqueda])


    return(
        <div className='allheroes'>
            <Navbar/>
            <h1>Resultados</h1>
            {heroes.length > 0 &&
                <CardsContainer 
                    heroes={heroes}
                />
            }
        </div>
    )
}
