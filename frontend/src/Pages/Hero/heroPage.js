import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Carrousel } from '../../Components/Carrousel/carrousel'
import Navbar from '../../Components/Navbar/navbar'
import { toast } from 'react-toastify'

import getOneCharacter from '../../Services/getOneCharacter'
import deleteCharacter from '../../Services/deleteCharacter'

import 'react-toastify/dist/ReactToastify.css'
import './heroPage.css'


toast.configure({
    theme: 'dark',
    pauseOnHover: true,
    draggable: true
})



export const HeroPage = () => {

    const { name } = useParams()
    const navigate = useNavigate()

    const [hero, setHero] = useState(null)
    const [imgToCarousel, setImgToCarousel] = useState([])

    const update = () => 
        navigate(`/update/character/${name}`)


    const confirmDelete = async() => {
        try {
            await deleteCharacter(name)
            toast.success('Personaje eliminado')
            navigate('/')
        } catch (error) {
            toast.error('Ha ocurrido un error')
        }
    }


    const eliminar = async() => {
        toast.error(
            <div className='toastContainer'>
                <p className='whiteTitle'>Esta seguro que desea eliminar este personaje?</p>
                <div className='toastBtnContainer'>
                    <button className='btn btn-danger toastBtn' onClick={confirmDelete}>Aceptar</button>
                    <button className='btn btn-secondary toastBtn'>Cancelar</button>
                </div>
            </div>
        ) 
    }


    useEffect(() => {
        const fetchData = async () => {
            const resp = await getOneCharacter(name)
            setHero(resp)
            let aux = []
            resp.images.map(img => {
                aux.push(require(`../../Images/${img}`))
            })
            setImgToCarousel(aux)
        }
        fetchData()
    }, [name])


    return(
        <div className="heroPageContainer">
            <Navbar />
            {hero != null &&
                <div className='heroPageContent'>
                    <h1 className='heroName'>{ hero.name }</h1>
                    <div className='heroInfo'>
                        <div className='carruselContainer'>
                            <Carrousel
                                heroes={imgToCarousel}
                            />
                        </div>
                        <div className='rightSide'>
                            <p className='rightContent'>Casa:
                                <img className='houseImg' src={require(`../../Images/${hero.house.toLowerCase()}-logo.png`)} />
                            </p>
                            <p className='rightContent'>Ano de aparicion: {hero.year}</p>    
                            { hero.realname &&
                                <p className='rightContent'>Nombre: {hero.realname}</p>
                        
                            }
                            { hero.equipment && 
                                <p className='rightContent'>Equipamento: {hero.equipment}</p>
                            }    
                        </div>
                    </div>
                    <p className='biography'>Biografia: {hero.biography}</p>
                </div>
            }
            <div className='buttonsContainer'>
                <button className='btn btn-outline-primary btnActualizar' onClick={update}>Actualizar</button>
                <button className='btn btn-outline-danger btnEliminar' onClick={eliminar}>Eliminar</button>
            </div>
        </div>
    )
}
