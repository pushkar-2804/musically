import axios from "axios";
import { ICard } from "../components/Card";
import { optionsFetchSong } from "../constants/optionConfig";

export const fetchSongDetails = async (cardId: number) => {
    try {
        const response = await axios.request(optionsFetchSong(cardId));      
      return formatCardData(response.data);
    } catch (error) {
      console.error("Error fetching song details:", error);
      return null;
    }
  };
  
export  const formatCardData = (data: any): ICard => {
    // Format the data to match the ICard interface
    const formattedCardData: ICard = {
      id: Number(data.key),
      title: data.title,
      artist: data.subtitle,
      thumbnail: data.images?.coverart || "",
      url: data.url || "",
      isFavorite: false,
      playlists: [],
    };
  
    return formattedCardData;
  };
  