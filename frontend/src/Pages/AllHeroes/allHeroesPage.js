import Navbar from  '../../Components/Navbar/navbar'
import { CardsContainer } from '../../Components/CardsContainer/cardsContainer'
import getCharacters from '../../Services/getCharacters'

import './allHeroesPage.css'
import { useEffect, useState } from 'react'


const AllHeroesPage = () => {

    const [heroes, setHeroes] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getCharacters()
            setHeroes(data)
        }
        fetchData()
    }, [])


    return(
        <div className='allheroes'>
            <Navbar/>
            <h1>All Heroes</h1>
            {heroes.length > 0 &&
                <CardsContainer 
                    heroes={heroes}
                />
            }
            {/* <div className='indices'>
                <span className='indice' onClick={handleClick}> 1 </span>
                <span className='indice'> 2 </span>
                <span className='indice'> 3 </span>
            </div> */}
        </div>
    )
}

export default AllHeroesPage