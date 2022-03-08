import { useNavigate } from 'react-router-dom'
import './card.css'


const Card = ({name, image}) => {

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate(`/hero/${name}`)
    }


    return(
        <button className="card text-dark bg-light mb-3" onClick={handleClick}>
            <img className="card-img-top" src={image} alt="Card cap"/>
            <div className="card-body">
                <p className="card-text">{name}</p>
            </div>
        </button>
    )
}

export default Card