import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ICard, optionsChartTrack } from "../constants/index";
import { ApiData } from "../constants/interface";
import { AuthContext } from "../security/AuthProvider";

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
  removePlaylist: (playlistId: number) => void;
  addToPlaylist: (card: ICard, playlistId: number) => void;
  removeFromPlaylist: (card: ICard, playlistId: number) => void;
  statusTrack: Status;
}

const initialApiContext: ApiContextType = {
  apiChartTrack: [],
  favList: [],
  playlists: [],
  addPlaylist: () => {},
  removePlaylist: () => {},
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
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid || "";

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

  // Function to post favorites to the API
  const postFavoritesToApi = async () => {
    try {
      await axios.post("/user/lists", { userId, favList });
    } catch (error) {
      console.error("Error posting favorites to API:", error);
    }
  };

  // Function to post playlists to the API
  const postPlaylistsToApi = async () => {
    try {
      await axios.post("/user/lists", { userId, playlists });
    } catch (error) {
      console.error("Error posting playlists to API:", error);
    }
  };

  // Function to fetch favorites from the API
  const fetchFavoritesFromApi = async () => {
    try {
      const favoritesResponse = await axios.get(`/user/favlist/${userId}`);
      setFavList(favoritesResponse.data);
      localStorage.setItem("favList", JSON.stringify(favoritesResponse.data));
    } catch (error) {
      console.error("Error fetching favorites from API:", error);
    }
  };

  // Function to fetch playlists from the API
  const fetchPlaylistsFromApi = async () => {
    try {
      const playlistsResponse = await axios.get(`/user/playlists/${userId}`);
      setPlaylists(playlistsResponse.data);
      localStorage.setItem("playlists", JSON.stringify(playlistsResponse.data));
    } catch (error) {
      console.error("Error fetching playlists from API:", error);
    }
  };

  // UseEffect to post favorites and playlists to the API whenever they change
  useEffect(() => {
    postFavoritesToApi();
  }, [favList]);

  useEffect(() => {
    postPlaylistsToApi();
  }, [playlists]);

  // UseEffect to fetch favorites and playlists from the API during initial load if local storage is empty or outdated
  useEffect(() => {
    const storedFavList = localStorage.getItem("favList");
    const storedPlaylists = localStorage.getItem("playlists");

    if (!storedFavList) {
      fetchFavoritesFromApi();
    }

    if (!storedPlaylists) {
      fetchPlaylistsFromApi();
    }
  }, []);

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
      id: Date.now(),
      name: name,
      cards: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const removePlaylist = (playlistId: number) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== playlistId)
    );
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
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      setPlaylists(JSON.parse(storedPlaylists));
    }
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
        removePlaylist,
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
