import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import "./Search.css";
import Artists from "../components/Artists/Artists";
import SearchedResults from "../components/SearchedResults/SearchedResults";
import { artistProps } from "../components/Artists/Artists";
import {
  optionsAutoComplete,
  optionsSearchKeyword,
  tracksProps,
} from "../constants";

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
        try {
          const response = await axios.request(optionsSearchKeyword(keyword));
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
      try {
        const response = await axios.request(optionsAutoComplete(inputValue));
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
          <SearchedResults tracks={apiData.tracks} />
          <Artists artists={apiData.artists} />
        </div>
      )}
    </div>
  );
};

export default Search;
