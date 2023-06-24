import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { optionsChartTrack } from "../constants/index";
import { ICard } from "../components/Card";

export interface ApiData {
  title: string;
  subtitle: string;
  type: string;
  url: string;
  images: {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor: string;
  };
  hub: {};
  artists: {}[];
  highlights: {};
  layout: string;
  key: string;
  properties: {};
  share: {};
}

export interface IPlaylist {
  id: number;
  name: string;
  cards: number[];
}

interface ApiContextType {
  apiChartTrack: ApiData[];
  favList: ICard[];
  addFavorite: (card: ICard) => void;
  removeFavorite: (card: ICard) => void;
  playlists: IPlaylist[];
  addPlaylist: (name: string) => void;
  addToPlaylist: (card: ICard, playlistId: number) => void;
  removeFromPlaylist: (card: ICard, playlistId: number) => void;
  statusTrack: Status;
}

const initialApiContext: ApiContextType = {
  apiChartTrack: [],
  favList: [],
  playlists: [],
  addPlaylist: () => {},
  addToPlaylist: () => {},
  removeFromPlaylist: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  statusTrack: "loading",
};
type Status = "loading" | "success" | "error";

export const ApiContext = createContext<ApiContextType>(initialApiContext);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiChartTrack, setApiChartTrack] = useState<ApiData[]>([]);
  const [favList, setFavList] = useState<ICard[]>(() => {
    const storedFavList = localStorage.getItem("favList");
    return storedFavList ? JSON.parse(storedFavList) : [];
  });
  const storedPlaylists = localStorage.getItem("playlists");
  const initialPlaylists: IPlaylist[] = storedPlaylists
    ? JSON.parse(storedPlaylists)
    : [];

  const [playlists, setPlaylists] = useState<IPlaylist[]>(initialPlaylists);
  const [statusTrack, setStatusTrack] = useState<Status>("loading");

  const addFavorite = (card: ICard) => {
    const isCardAlreadyFavorite = favList.some(
      (favCard) => favCard.id === card.id
    );
    if (!isCardAlreadyFavorite) {
      setFavList((prevFavList) => [...prevFavList, card]);
    }
  };

  const removeFavorite = (card: ICard) => {
    setFavList((prevFavList) => prevFavList.filter((c) => c.id !== card.id));
  };

  const addPlaylist = (name: string) => {
    const newPlaylist: IPlaylist = {
      id: playlists.length + 1,
      name: name,
      cards: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const addToPlaylist = (card: ICard, playlistId: number) => {
    setPlaylists((prevPlaylists) => {
      return prevPlaylists.map((playlist) => {
        if (playlist.id === playlistId && !playlist.cards.includes(card.id)) {
          return {
            ...playlist,
            cards: [...playlist.cards, card.id],
          };
        }
        return playlist;
      });
    });
  };

  const removeFromPlaylist = (card: ICard, playlistId: number) => {
    setPlaylists((prevPlaylists) => {
      return prevPlaylists.map((playlist) => {
        if (playlist.id === playlistId && playlist.cards.includes(card.id)) {
          return {
            ...playlist,
            cards: playlist.cards.filter((cardId) => cardId !== card.id),
          };
        }
        return playlist;
      });
    });
  };

  useEffect(() => {
    // Update local storage whenever favList changes
    localStorage.setItem("favList", JSON.stringify(favList));
  }, [favList]); // Run whenever favList changes

  useEffect(() => {
    const searchKeyword = async () => {
      try {
        const response = await axios.request(optionsChartTrack);
        // console.log(response.data.tracks);
        setApiChartTrack(response.data.tracks);
        setStatusTrack("success");
      } catch (error) {
        console.error(error);
        setStatusTrack("error");
      }
    };
    searchKeyword();
  }, []);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  return (
    <ApiContext.Provider
      value={{
        apiChartTrack,
        favList,
        addPlaylist,
        addFavorite,
        removeFavorite,
        playlists,
        addToPlaylist,
        removeFromPlaylist,

        statusTrack,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
