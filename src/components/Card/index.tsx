import React from "react";
import "./styles.css";
import Play from "../Play";
import Heart from "../Heart";
// import MyContext from "../../context";

export interface ICard {
  id: number;
  title: string;
  artist: string;
  thumbnail: string;
  url?: string;
}

const Card: React.FC<ICard> = ({ title, artist, thumbnail, url }) => {
  // const { updateData } = useContext(MyContext);
  // const [favourites, setFavorites] = useState(null);

  return (
    <div
      className="card"
      // onClick={() => updateData({ title, artist, thumbnail })}
    >
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
          <Heart size="regular" />
          <Play url={url} />
        </div>
      </div>
    </div>
  );
};

export default Card;
