import {Link } from 'react-router-dom'

function AnimeItem({img_url, id}) {
    return (
        <Link to={`/detail/${id}`}>
        <div className="animeItemContainer">
            <img src={img_url} alt="anime poster" className="animeItem"/>
        </div>
        </Link>
    )
}

export default AnimeItem
