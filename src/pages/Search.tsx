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
import Skeleton from "../components/Skeleton";
import NavModal from "../components/NavModal/NavModal";

export type apiDataProps = artistProps & tracksProps;

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [viewSuggestion, setViewSuggestion] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<apiDataProps>({} as apiDataProps);
  const [apiSuggestionData, setApiSuggestionData] = useState<any[]>([]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (keyword !== "") {
      // setInputValue(keyword);
      setViewSuggestion(false);
      setLoading(true);
      const searchKeyword = async () => {
        try {
          const response = await axios.request(optionsSearchKeyword(keyword));
          console.log(response.data);
          setApiData(response.data);
          setLoading(false);
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

  useEffect(() => console.log(loading), [loading]);

  return (
    <div className="searchWrap">
      <NavModal />
      <div className="mt-4">
        <h5 className="m-2">Search</h5>
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

      {loading && (
        <div className="rplayed__grid">
          {" "}
          {[...Array(5).keys()].map((n) => (
            <Skeleton height="220px" key={n} />
          ))}
        </div>
      )}

      {!viewSuggestion && !loading && (
        <div>
          <SearchedResults tracks={apiData} keyword={keyword} />
          <Artists artists={apiData.artists} />
        </div>
      )}
    </div>
  );
};

export default Search;
