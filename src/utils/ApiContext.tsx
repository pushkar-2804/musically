import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { optionsChartTrack } from "../constants/index";

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
  statusTrack: Status;
}

const initialApiContext: ApiContextType = {
  apiChartTrack: [],
  statusTrack: "loading",
};
type Status = "loading" | "success" | "error";

export const ApiContext = createContext<ApiContextType>(initialApiContext);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiChartTrack, setApiChartTrack] = useState<ApiData[]>([]);
  const [statusTrack, setStatusTrack] = useState<Status>("loading");

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
        statusTrack,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
