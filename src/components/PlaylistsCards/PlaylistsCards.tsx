import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Skeleton from "../Skeleton/Skeleton";
import { ICard } from "../../constants";

interface PlaylistCardsProps {
  cards: ICard[];
}

const PlaylistCards: React.FC<PlaylistCardsProps> = ({ cards }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating loading time for demo purposes
  }, [cards]);

  return (
    <div className="rplayed__grid">
      {loading
        ? cards.map((_, index) => <Skeleton height="220px" key={index} />)
        : cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              artist={card.artist}
              thumbnail={card.thumbnail}
              playlists={card.playlists}
              title={card.title}
              isFavorite={card.isFavorite}
            />
          ))}
      {}
    </div>
  );
};

export default PlaylistCards;
