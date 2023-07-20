import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useContext } from "react";
import { ApiContext } from "../../utils/ApiContext";
import {
  fetchSongDetails,
  formatCardData,
  postCardDetailsToApi,
} from "../../utils/FetchCardDetails";
import Skeleton from "../Skeleton/Skeleton";
import { ICard } from "../../constants";

interface PlaylistCardsProps {
  cards: number[];
}

const PlaylistCards: React.FC<PlaylistCardsProps> = ({ cards }) => {
  const [loading, setLoading] = useState(false);
  const { apiChartTrack } = useContext(ApiContext);
  const [cardDetails, setCardDetails] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchCardDetails = async () => {
      setLoading(true);
      const promises = cards.map((cardId) => getCardDetails(cardId));
      const resolvedCardDetails = await Promise.all(promises);
      setCardDetails(resolvedCardDetails.filter(Boolean) as ICard[]);
      setLoading(false);
    };

    fetchCardDetails();
  }, [cards]);

  const storeCardDetails = (cardId: number, cardDetails: ICard) => {
    localStorage.setItem(`card_${cardId}`, JSON.stringify(cardDetails));
  };

  const getCardDetails = async (cardId: number) => {
    const existingCard = apiChartTrack.find(
      (track) => Number(track.key) === cardId
    );
    if (existingCard) {
      const formattedCardData = formatCardData(existingCard);
      storeCardDetails(cardId, formattedCardData);
      postCardDetailsToApi(formattedCardData); // Post card details to the API
      return formatCardData(existingCard);
    }
    const storedCardData = localStorage.getItem(`card_${cardId}`);
    if (storedCardData) {
      return JSON.parse(storedCardData);
    }

    try {
      console.log(`Fetching card details for card ID: ${cardId}`);
      const cardDetails = await fetchSongDetails(cardId);
      if (cardDetails) {
        storeCardDetails(cardId, cardDetails);
        postCardDetailsToApi(cardDetails); // Post card details to the API
        return cardDetails;
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
      return null;
    }
  };

  return (
    <div className="rplayed__grid">
      {loading
        ? cardDetails.map((n) => <Skeleton height="220px" key={n.id} />)
        : cardDetails.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                artist={card.artist}
                thumbnail={card.thumbnail}
                playlists={card.playlists}
                title={card.title}
                isFavorite={card.isFavorite}
              />
            );
          })}
      {}
    </div>
  );
};

export default PlaylistCards;
