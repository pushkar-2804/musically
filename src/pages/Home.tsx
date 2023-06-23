import TopTracks from "../components/TopTracks/TopTracks";
import { ApiProvider } from "../utils/ApiContext";

const Home = () => {
  // const [apiData, setApiData] = useState<apiDataProps>({} as apiDataProps);

  return (
    <ApiProvider>
      <div className="home">
        <TopTracks />
      </div>
    </ApiProvider>
  );
};

export default Home;
