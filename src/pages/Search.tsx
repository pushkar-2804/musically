import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import "./Search.css";
import Artists from "../components/Artists/Artists";
import Playlist from "../components/Playlist/Playlist";
// import Card from "../components/Card";
import { artistProps } from "../components/Artists/Artists";
import { tracksProps } from "../components/Playlist/Playlist";

export type apiDataProps = artistProps & tracksProps;

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [viewSuggestion, setViewSuggestion] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [apiData, setApiData] = useState<apiDataProps>({} as apiDataProps);
  const [apiSuggestionData, setApiSuggestionData] = useState<any[]>([]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    if (keyword !== "") {
      const searchKeyword = async () => {
        const options = {
          method: "GET",
          url: "https://shazam.p.rapidapi.com/search",
          params: { term: keyword },
          headers: {
            "X-RapidAPI-Key":
              "e1319596a0msh07b4162bc8b1097p1e1e84jsndfb0c10d633e",
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          },
        };
        try {
          const response = await axios.request(options);
          console.log(response.data);
          setApiData(response.data);
          setViewSuggestion(false);
        } catch (error) {
          console.error(error);
        }
      };
      searchKeyword();
    }
  }, [keyword]);
  useEffect(() => {
    if (!viewSuggestion) setViewSuggestion(true);
    // Call the API whenever the input value changes
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://shazam.p.rapidapi.com/auto-complete",
        params: { term: inputValue },
        headers: {
          "X-RapidAPI-Key":
            "e1319596a0msh07b4162bc8b1097p1e1e84jsndfb0c10d633e",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        console.log(response.data.hints);
        setApiSuggestionData(response.data.hints);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [inputValue]);

  return (
    <div>
      <div>
        <span className="m-2">Search</span>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to listen to?"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {viewSuggestion &&
        apiSuggestionData?.map((item, index: number) => {
          return (
            <div
              key={index}
              className="searchSuggestions p-2 "
              onClick={() => setKeyword(item.term)}
            >
              {item.term}
            </div>
          );
        })}

      {!viewSuggestion && (
        <div>
          <Playlist tracks={apiData.tracks} />
          <Artists artists={apiData.artists} />
        </div>
      )}
    </div>
  );
};

export default Search;
