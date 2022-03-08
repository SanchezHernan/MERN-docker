import Card from '../Card/card'
import './cardsContainer.css'


export const CardsContainer = ({heroes}) => {


    return(
        <div className='cardsContainer'>
            { heroes.map(hero =>
                <Card
                    className='cardContainer'
                    key={hero.name}
                    name={hero.name}
                    image={require(`../../Images/${hero.images[0]}`)}
                />
            )}
        </div>
    )
}
