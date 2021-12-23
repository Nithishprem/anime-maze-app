import{useParams,Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {FaArrowLeft } from 'react-icons/fa'

function Detail() {
    const [loading, setLoading] =useState(true)
    const [animeItem, setAnimeItem] = useState(null)
    const params = useParams()
    
    useEffect(()=>{
        const fetchItem = async()=>{
            const res = await fetch(`https://api.jikan.moe/v3/anime/${params.animeId}`)
            const data = await res.json()
            setAnimeItem(data)
            setLoading(false)
            // console.log(data)
        }
        fetchItem()
    
    },[params.animeId])
    
    if(loading)return <h1>Loading</h1>
    return (
        <div className='detail'>
           <Navbar/>
            <main className='animedetailContainer'>
                <Link to='/main' className='backArrow'><FaArrowLeft/></Link>
                <div className="imgContainer">
                    <div className="imgTitle">{animeItem.title}</div>
                    <div className="animeImage">
                        <img src={animeItem.image_url} alt="anime poster" />
                    </div>
                </div>
                <div className="detailsContainer">
                    <div className="detailsHeader">Analytics</div>
                    <div className="detailsSynopsis"><h3>Synopsis &nbsp;: &nbsp;</h3><p>{animeItem.synopsis.substring(0,250)}</p></div>
                    <div className="detailsCard">
                        <div className="episodesCont">
                            <div className='episodesHead'>Total Episodes :</div>  
                            <p className='value'>{animeItem.episodes}</p>
                        </div>
                        <div className="scoreCont">
                            <div className='scoreHead'>Score : </div> 
                            <p className='value'>{animeItem.score}</p>
                        </div>
                        <div className="typeCont">
                            <div className='typeHead'>Type : </div>
                        <p className='value'>{animeItem.type}</p></div>
                        <div className="datesCont">
                            <div className="dateStart">
                                <div className='startHead'>Start : </div> 
                                <p className='value'>{animeItem.aired.from?.split('T')[0]}</p>
                            </div>
                            <div className="dateEnd">
                               <div className='endHead'>End Date : </div>  
                               <p className='value'>{animeItem.aired.to?.split('T')[0]}</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </main>
           <Footer/>
        </div>
    )
}

export default Detail
