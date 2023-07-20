import React, { useEffect, useState } from "react";
import "./Card.css";
import Play from "../Play/Play";
import Heart from "../Heart/Heart";
import { ApiContext } from "../../utils/ApiContext";
import ThreeDotMenu from "../ThreeDotMenu/ThreeDotMenu";
import { ICard } from "../../constants/index";

const Card: React.FC<ICard> = ({
  id,
  title,
  artist,
  thumbnail,
  url,
  isFavorite,
}) => {
  const {
    addFavorite,
    removeFavorite,
    favList,
    playlists,
    addToPlaylist,
    removeFromPlaylist,
  } = React.useContext(ApiContext);
  const [isFav, setIsFav] = useState(isFavorite);
  const card = { id, title, artist, thumbnail, url, isFavorite };
  useEffect(() => {
    const isCardFavorite = favList.some((favCard) => favCard.id === id);
    setIsFav(isCardFavorite);
  }, [favList, id]);

  const handleFavoriteClick = () => {
    setIsFav(!isFav);
    if (isFav) {
      removeFavorite({ id, title, artist, thumbnail, url, isFavorite });
    } else {
      addFavorite({ id, title, artist, thumbnail, url, isFavorite: true });
    }
  };

  // Update the isCardInPlaylist function to return the playlistId
  const isCardInPlaylist = (): number | null => {
    const playlistWithCard = playlists.find((playlist) =>
      playlist.cards.some((c) => c.id === card.id)
    );
    return playlistWithCard ? playlistWithCard.id : null;
  };

  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(null);

  const handlePlaylistClick = (playlistId: number) => {
    if (isCardInPlaylist() === playlistId) {
      removeFromPlaylist(card, playlistId);
      setActivePlaylistId(null);
    } else {
      addToPlaylist(card, playlistId);
      setActivePlaylistId(playlistId);
    }
  };

  return (
    <div className="card">
      <div
        className="card__thumbnail"
        style={{ backgroundImage: `url(${thumbnail})` }}
        data-testid="card-thumbnail"
      ></div>
      <div className="card__content">
        <div className="card__wrapper">
          <h3 className="card__title">{title}</h3>
          <span className="card__artist">{artist}</span>
        </div>
        <div className="d-flex">
          <Heart
            size="regular"
            onClick={handleFavoriteClick}
            isFavorite={isFav}
          />
          <Play url={url} />
          <ThreeDotMenu
            playlists={playlists}
            onPlaylistClick={handlePlaylistClick}
            activePlaylistId={activePlaylistId} // Pass the activePlaylistId prop
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
