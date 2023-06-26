import NavModal from "../components/NavModal/NavModal";
import TopTracks from "../components/TopTracks/TopTracks";
import Favourites from "./Favourites";

const Home = () => {
  return (
    <div className="home">
      <NavModal />
      <TopTracks />
      <Favourites />
    </div>
  );
};

export default Home;
