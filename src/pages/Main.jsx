import {useState, useEffect} from 'react'

import Dropd from "react-dropd";
import AnimeItem from '../components/AnimeItem';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {Chart} from 'react-google-charts'


function Main() {
    const [loading, setLoading] = useState(true)
    const [animeList, setAnimeList] = useState(null)
    const [selectedItem, setSelecteditem] = useState(null)
    const [stats, setStats] = useState(null)
    

    useEffect(() => {
        // fetching anime list
        const fetchAnimeList = async()=>{
            const res = await fetch(`https://api.jikan.moe/v3/search/anime?q=${selectedItem}`)
            const data = await res.json()
            const results = data.results
            setAnimeList(results)
            setLoading(false)
        }
        fetchAnimeList()  
        
    }, [selectedItem])

    useEffect(() => {
        const animeType = {"Movie":0, "TV":0,"Special":0,"OVA":0,"ONA":0,"others":0}
        let total = 0
        animeList?.forEach(item => {
           switch(item.type){
                case "Movie":
                    animeType.Movie += 1
                    break
                case "TV":
                    animeType.TV += 1
                    break
                case "Special":
                    animeType.Special += 1
                    break
                case "OVA":
                    animeType.OVA += 1
                    break
                case "ONA":
                    animeType.ONA += 1
                    break
                default:
                    animeType.others += 1
                    break 
           }
           total +=1
        })
        // anime copy for pie chart input
        let animeTypeCopy = [['Type', 'Animes Per Type']]
        for(let key in animeType){
            animeType[key] = animeType[key]/total*100;
            animeTypeCopy.push([key,animeType[key]])
        }
        setStats(animeTypeCopy)
    }, [animeList])
    
    if(loading){
        return <h1>loading</h1>
    }
    return (
        <div className='main'>
          <Navbar/>
            <main className='mainContainer'>
                <div className="animeContainer">
                    <Dropd list={['Dragon Ball Z', 'pokemon', 'naruto', 'gintama', 'Fullmetal Alchemist']} 
                    placeholder={'Select anime'} className="dropdown" 
                    onItemChange={curr=>setSelecteditem(curr)}/>
                    <div className="animeListContainer">
                            {animeList && animeList.map(item=>(
                                <AnimeItem key={item.mal_id} img_url={item.image_url} id={item.mal_id}/>
                            ))}
                    </div>
                    </div>
                <div 
                className="statContainer">
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={stats && stats}
                        options={{
                            title: 'Based On Types',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        /></div>
            </main>
            <Footer/>
        </div>
    )
}

export default Main
