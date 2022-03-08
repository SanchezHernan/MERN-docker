import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    
    const navigate = useNavigate()
    const [busqueda, setBusqueda] = useState('')


    const handleBusqueda = (value) =>
        setBusqueda(value)   
    

    const search = (e) => {
        e.preventDefault()
        navigate(`/Search/${busqueda}`)
    } 
    

    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className='nav-item-container'>
                <Link className="nav-item" to="/">
                    Personajes
                </Link>    
                <Link className="nav-item" to="/marvel">
                    Marvel
                </Link>
                <Link className="nav-item" to="/dc">
                    DC
                </Link>
            </div>
            <form className="input-group" onSubmit={(e) => search(e)}>
                <input type="text" className="form-control" placeholder="Buscar personaje" onChange={(e) => handleBusqueda(e.target.value)} value={busqueda}/>
                <button className="btn btn-outline-light" type="button" id="button-addon2" type='submit' >Buscar</button>
            </form>
            <Link className='btn btn-outline-light nav-final-item' to='/add/character'>
                Agregar Personaje
            </Link>
        </nav>
    )
}

export default Navbar