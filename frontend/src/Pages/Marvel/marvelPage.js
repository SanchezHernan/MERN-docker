import Navbar from "../../Components/Navbar/navbar"
import { CardsContainer } from "../../Components/CardsContainer/cardsContainer"

import getMarvelCharacters from '../../Services/getMarvelCharacters'

import './marvelPage.css'
import { useEffect, useState } from "react"




const MarvelPage = () => {

    const [marvelHeroes, setMarvelHeroes] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getMarvelCharacters()
            setMarvelHeroes(data)
        }
        fetchData()
    }, [])


    return(
        <div className='marvelPage'>
            <Navbar/>
            <h1>Marvel Heroes</h1>
            {marvelHeroes.length > 0 &&
                <CardsContainer 
                    heroes={marvelHeroes}
                />
            }
        </div>
    )
}

export default MarvelPage