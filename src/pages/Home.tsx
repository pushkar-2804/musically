import Playlist from "../components/Playlist/Playlist";
import RecentlyPlayed from "../components/RecentlyPlayed/RecentlyPlayed";

const Home = () => {
  //   const url = 'https://shazam.p.rapidapi.com/search?term=arijit%20singh&offset=0&limit=5';
  // const options = {
  // 	method: 'GET',
  // 	headers: {
  // 		'X-RapidAPI-Key': 'b384c5e737msh9ade01c4c2b3fd8p1fff3fjsn74127e808d1b',
  // 		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  // 	}
  // };

  // try {
  // 	const response = await fetch(url, options);
  // 	const result = await response.text();
  // 	console.log(result);
  // } catch (error) {
  // 	console.error(error);
  // }
  return (
    <div className="home">
      <RecentlyPlayed />
      <Playlist
        tracks={{
          hits: [],
        }}
      />
    </div>
  );
};

export default Home;
