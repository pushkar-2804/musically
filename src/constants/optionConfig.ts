


export const optionsChartTrack = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/charts/track",
    params: {
      pageSize: "20",
      startFrom: "0",
    },
    headers: {
      'X-RapidAPI-Key': 'a445dbc7afmsh5c661eb64a62627p16dc21jsnd91fd32493e0',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
export const optionsFetchSong = (cardId:number)=> {return({
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/songs/get-details',
    params: {
      key: `${cardId}`
    },
    headers: {
      'X-RapidAPI-Key': 'a445dbc7afmsh5c661eb64a62627p16dc21jsnd91fd32493e0',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  })};


export const optionsAutoComplete =(inputValue: string)=> {
  return({
  method: "GET",
  url: "https://shazam.p.rapidapi.com/auto-complete",
  params: { term: inputValue },
  headers: {
    "X-RapidAPI-Key":
      "a445dbc7afmsh5c661eb64a62627p16dc21jsnd91fd32493e0",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  }});
};

export const optionsSearchKeyword =(keyword: string)=> {
  return({
  method: "GET",
  url: "https://shazam.p.rapidapi.com/search",
  params: { term: keyword },
  headers: {
    "X-RapidAPI-Key":
      "a445dbc7afmsh5c661eb64a62627p16dc21jsnd91fd32493e0",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  }});
};