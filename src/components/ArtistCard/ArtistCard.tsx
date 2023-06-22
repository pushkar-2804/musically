import React from 'react'
import './ArtistCard.css'
import Play from '../Play'

export interface IArtistCard {
  id: number,
  artist: string,
  onClick?: () => void
}



const ArtistCard: React.FC<IArtistCard> = ({ artist, onClick}) => {
    // console.log (title);
  return (
    <div className="card cardArtist" onClick={onClick}>
      <div className="card__content">
        <div className="card__wrapper">
          <h3 className="cardArtist__title">{artist}</h3>
        </div>
        <Play />
      </div>
    </div>
  )
}

export default ArtistCard
