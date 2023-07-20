export const optionsChartTrack = {
    method: "GET",    
    url: `${import.meta.env.VITE_URL}/charts/track`,
    params: {
      pageSize: "20",
      startFrom: "0",
    },
    headers: {
      'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDKEY}`,
      'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDHOST}`
    }
  };
// export const optionsFetchSong = (cardId:number)=> {return({
//     method: 'GET',    
//     url: `${import.meta.env.VITE_URL}/get-details`,
//     params: {
//       key: `${cardId}`
//     },
//     headers: {
//       'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDKEY}`,
//       'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDHOST}`
//     }
//   })};


export const optionsAutoComplete =(inputValue: string)=> {
  return({
  method: "GET",  
  url: `${import.meta.env.VITE_URL}/auto-complete`,
  params: { term: inputValue },
  headers: {
    'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDKEY}`,
    'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDHOST}`
  }});
};

export const optionsSearchKeyword =(keyword: string)=> {
  return({
  method: "GET",
  url: `${import.meta.env.VITE_URL}/search`,
  params: { term: keyword },
  headers: {
    'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDKEY}`,
    'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDHOST}`
  }});
};