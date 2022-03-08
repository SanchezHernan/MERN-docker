
import './carrousel.css'


export const Carrousel = ({heroes}) => {
    
    return(
        <div className='carrouselContainer'>
            {heroes.length > 1 ?

                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        { heroes.slice(1, heroes.length).map((hero, i) => 
                            <li data-target="#carouselExampleIndicators" data-slide-to={i} key={hero}></li>    
                        )}
                    </ol>
                
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={heroes[0]} alt="First slide" />
                    </div>
                    { heroes.slice(1, heroes.length).map(hero =>
                            <div className="carousel-item" key={hero}>
                                <img className="d-block w-100" src={hero} alt="First slide" />
                            </div>    
                        )
                    }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            :
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <img className="d-block w-100" src={heroes[0]} alt="First slide" />
                </div>
            }
        </div> 
    )
}
