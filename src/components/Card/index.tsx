import React, { useEffect, useState } from "react";
import "./styles.css";
import Play from "../Play";
import Heart from "../Heart";
import { ApiContext } from "../../utils/ApiContext";

export interface ICard {
  id: number;
  title: string;
  artist: string;
  thumbnail: string;
  url?: string;
  isFavorite: boolean;
}

const Card: React.FC<ICard> = ({
  id,
  title,
  artist,
  thumbnail,
  url,
  isFavorite,
}) => {
  const { addFavorite, removeFavorite, favList } = React.useContext(ApiContext);
  const [isFav, setIsFav] = useState(isFavorite);

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
        </div>
      </div>
    </div>
  );
};

export default Card;
