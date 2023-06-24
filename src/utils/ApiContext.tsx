import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { optionsChartTrack } from "../constants/index";
import { ICard } from "../components/Card";

interface ApiData {
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

interface ApiContextType {
  apiChartTrack: ApiData[];
  favList: ICard[];
  addFavorite: (card: ICard) => void;
  removeFavorite: (card: ICard) => void;
  statusTrack: Status;
}

const initialApiContext: ApiContextType = {
  apiChartTrack: [],
  favList: [],
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
  // Retrieve favList from local storage on mount
  // useEffect(() => {
  //   // Retrieve favList from local storage
  //   const storedFavList = localStorage.getItem("favList");
  //   if (storedFavList) {
  //     setFavList(JSON.parse(storedFavList));
  //   }
  // }, []); // Run only once on component mount

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

  return (
    <ApiContext.Provider
      value={{
        apiChartTrack,
        favList,
        addFavorite,
        removeFavorite,
        statusTrack,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
