import React, { useContext } from "react";
import "./styles.css";
import Play from "../Play";
import MyContext from "../../context";

export interface ICard {
  id: number;
  title: string;
  artist: string;
  thumbnail: string;
  url?: string;
}

const Card: React.FC<ICard> = ({ title, artist, thumbnail, url }) => {
  const { updateData } = useContext(MyContext);

  return (
    <div
      className="card"
      onClick={() => updateData({ title, artist, thumbnail })}
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
        <Play url={url} />
      </div>
    </div>
  );
};

export default Card;
