import { useEffect, useState } from "react"

import Navbar from "../../Components/Navbar/navbar"
import { CardsContainer } from "../../Components/CardsContainer/cardsContainer"
import getDCCharacters from "../../Services/getDCCharacters"

import './dcPage.css'


const DCPage = () => {

    const [dcHeroes, setDcHeroes] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getDCCharacters()
            setDcHeroes(data)
        }
        fetchData()
    }, [])

    return(
        <div className='dcPage'>
            <Navbar/>
            <h1>DC Heroes</h1>
            <CardsContainer 
                heroes={dcHeroes}
            />
        </div>
    )
}

export default DCPage