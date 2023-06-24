import { useContext } from "react";
import "./TopTracks.css";
import { ApiContext } from "../../utils/ApiContext";
import Card from "../Card";
import Skeleton from "../Skeleton";

const TopTracks = () => {
  const { apiChartTrack, statusTrack } = useContext(ApiContext);

  return (
    <section className="rplayed">
      <h2 className="subtitle">Top Tracks</h2>
      <div className="rplayed__grid">
        {statusTrack === "loading"
          ? [...Array(8).keys()].map((n) => <Skeleton height="220px" key={n} />)
          : apiChartTrack?.map((data) => {
              // setLoading(false);
              return (
                <Card
                  key={data.key}
                  title={data.title}
                  id={Number(data.key)}
                  artist={data.subtitle}
                  url={data.url}
                  thumbnail={data.images.background}
                />
              );
            })}
      </div>
    </section>
  );
};

export default TopTracks;
