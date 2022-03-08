import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import dcImg from '../../Images/dc-logo.png'
import marvelImg from '../../Images/marvel-logo.png'

import Navbar from  '../../Components/Navbar/navbar'
import { Carrousel } from '../../Components/Carrousel/carrousel'
import updateCharacter from '../../Services/updateCharacter'
import getOneCharacter from '../../Services/getOneCharacter'

import 'react-toastify/dist/ReactToastify.css'
import './updateCharacterPage.css'
import { useParams } from 'react-router-dom'

toast.configure({
    theme: 'dark',
    pauseOnHover: true,
    draggable: true
})



export const UpdateCharacterPage = () => {
    
    const { name } = useParams()

    //const [hero, setHero] = useState(null)
    const [images, setImages] = useState([])
    const [logoImg, setLogoImg] = useState(null)
    const [imgToShow, setImgToShow] = useState(null)
    const [showImg, setShowImg] = useState(false)
    const [house, setHouse] = useState('')
    const [newName, setNewName] = useState('')
    const [realName, setRealName] = useState('')
    const [year, setYear] = useState('')
    const [equipment, setEquipment] = useState('')
    const [biography, setBiography] = useState('')


    const handleImages = (imagenes) => {
        if (imagenes.length === 1)
            setImages([imagenes[0].name]);
        else{
            let aux = []
            for (var i = 0; i < imagenes.length; i++){
                aux.push(imagenes[i].name)
            }
            setImages(aux)
        }
    }

    const handleConfirm = () => {
        if (images.length > 1) {
            let aux = []
            images.map(act => {
                aux.push(require(`../../Images/${act}`))
            })
            setImgToShow(aux)
        } else
            setImgToShow([require(`../../Images/${images[0]}`)])
        setShowImg(true)
    }

    const handleHouse = (option) => {
        if (option === '1'){
            setHouse('Marvel')
            setLogoImg(marvelImg)
        }
        else if (option === '2'){
            setHouse('DC')
            setLogoImg(dcImg)
        }
    }

    const handleName = value => setNewName(value)

    const handleRealName = value => setRealName(value)
    
    const handleYear = value => setYear(value)

    const handleEquipment = value => setEquipment(value)

    const handleBiography = value => setBiography(value) 

    const update = async () => {      
        if (house !== '' && name !== '' && year !== '' && biography !== '') {
            
            const resp = await updateCharacter(house, name, realName, year, equipment, biography, images)
            console.log(resp)
            setHouse('')
            setLogoImg(null)
            setNewName('')
            setRealName('')
            setYear('')
            setEquipment('')
            setBiography('')
            setImages([])
            setShowImg(false)
            toast.success('Personaje actualizado con exito')
        } else toast.error('Datos faltantes')
    }


    useEffect(() => {
        const fetchData = async () => {
            const resp = await getOneCharacter(name)
            setImages(resp.images)
            let aux = []
            resp.images.map(img => {
                aux.push(require(`../../Images/${img}`))
            })
            setImgToShow(aux)
            setHouse(resp.house)
            setNewName(name)
            setYear(resp.year)
            setBiography(resp.biography)
            if (resp.realname)
                setRealName(resp.realname)
            if (resp.equipment)
                setEquipment(resp.equipment)
            setShowImg(true)
            setLogoImg(require(`../../Images/${resp.house.toLowerCase()}-logo.png`))
        }
        fetchData()
    }, [name])


    return(
        <div className='addCharacterContainer'>
            <Navbar/>
            <h1 className='title'>Actualizar Personaje</h1>
            <div className="houseSelector">
                { logoImg != null &&
                    <img className='imgContainer' src={logoImg}  alt='img' />
                }
                <div className='houseSelectorContent'>
                    <label htmlFor="houseSelect" className="form-label">Casa:</label>
                    <select id="houseSelect" className="content-select" aria-label="Default select example" defaultValue="0" onChange={(e) => handleHouse(e.target.value)}>
                        <option value="0">Selecciona la Casa</option>
                        <option value="1">Marvel</option>
                        <option value="2">DC</option>
                    </select>
                </div>
            </div>
            <div className='addCharacterContent'>
                <div className='rightSide'>
                    {showImg ?
                        <div className='carouselContainer' >
                            <Carrousel 
                                heroes={imgToShow}
                            />
                        </ div>
                    :
                        <h1>Cargue al menos una imagen del personaje</h1>
                    }
                    <input className='form-input mt-2' type="file" multiple name="pic" accept="image/png, .jpeg, .jpg" onChange={(e) => handleImages(e.target.files)}/>
                    <button className='btn btn-outline-light btnCargar' onClick={handleConfirm}>Ver Imagenes</button>
                </div>

                <div className='leftSide'>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Nombre:</label>
                        <input type="text" className="form-control" id="nameInput" onChange={(e) => handleName(e.target.value)} value={newName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="realNameInput" className="form-label">Nombre Real:</label>
                        <input type="text" className="form-control" id="realNameInput" onChange={(e) => handleRealName(e.target.value)} value={realName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearInput" className="form-label">Año  de aparicion:</label>
                        <input type="number" className="form-control" id="yearInput" onChange={(e) => handleYear(e.target.value)} value={year} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="equipmentInput" className="form-label">Equipamiento:</label>
                        <input type="text" className="form-control" id="equipmentInput" onChange={(e) => handleEquipment(e.target.value)} value={equipment} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descriptionText" className="form-label">Biografia:</label>
                        <textarea className="form-control" id="descriptionText" rows="3" onChange={(e) => handleBiography(e.target.value)} value={biography} />
                    </div>
                </div>

            </div>
                <button className='btn btn-outline-light minWidth' onClick={update}>Confirmar Actualizacion</button>
        </div>
    )
}
