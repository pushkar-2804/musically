import axios from "axios";
import { ChangeEvent, useEffect,useState } from "react";
import './Search.css'
import Artists from "../components/Artists/Artists";
// import Card from "../components/Card";

type apiDataProps = {
    artists: {
        hits: {
            artist:{adamid: number;
            avatar: string;
            name: string;
            verified: boolean;
            weburl: string;
        }}[]}
    tracks: object,
}

const Search = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [viewSuggestion, setViewSuggestion] = useState<boolean>(true);
    const [keyword, setKeyword] = useState('');
    const [apiData, setApiData] = useState<apiDataProps>({} as apiDataProps);
    const [apiSuggestionData, setApiSuggestionData] = useState<any[]>([]);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    useEffect(()=>{
        if (keyword!=="") {
        const searchKeyword = async()=>{
            const options = {
                method: 'GET',
                url: 'https://shazam.p.rapidapi.com/search',
                params: {term: keyword},
                headers: {
                  'X-RapidAPI-Key': 'b384c5e737msh9ade01c4c2b3fd8p1fff3fjsn74127e808d1b',
                  'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                }
              };
              try {
                const response = await axios.request(options);
                console.log(response.data);
                setApiData(response.data);
            setViewSuggestion(false);
            } catch (error) {
                console.error(error);
            }
        }
        searchKeyword()}
    },[keyword]);
    useEffect(() => {
        if (!viewSuggestion) setViewSuggestion(true);
    // Call the API whenever the input value changes
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/auto-complete',
            params: {term: inputValue},
            headers: {
              'X-RapidAPI-Key': 'b384c5e737msh9ade01c4c2b3fd8p1fff3fjsn74127e808d1b',
              'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
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
        Search
        <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="What do you want to listen to?"  aria-describedby="button-addon2" value={inputValue} onChange={handleInputChange} />
  <button className="btn btn-outline-secondary" type="button" id="button-addon2"> Search</button>
</div>
</div>
    {viewSuggestion && apiSuggestionData?.map((item,index:number)=>{
        return <div key={index} className="searchSuggestions p-2" onClick={()=>setKeyword(item.term)}>
            {item.term}
        </div>
    })}

    {!viewSuggestion && 
        <Artists data={apiData.artists}/>
    }
</div>
)}

export default Search;