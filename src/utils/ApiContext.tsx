import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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
  apiData: ApiData[];
  status: Status;
}

const initialApiContext: ApiContextType = {
  apiData: [],
  status: "loading",
};
type Status = "loading" | "success" | "error";

export const ApiContext = createContext<ApiContextType>(initialApiContext);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const searchKeyword = async () => {
      const options = {
        method: "GET",
        url: "https://shazam.p.rapidapi.com/charts/track",
        params: {
          pageSize: "4",
          startFrom: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "e1319596a0msh07b4162bc8b1097p1e1e84jsndfb0c10d633e",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        console.log(response.data.tracks);
        setApiData(response.data.tracks);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };
    searchKeyword();
  }, []);

  return (
    <ApiContext.Provider value={{ apiData, status }}>
      {children}
    </ApiContext.Provider>
  );
};
