import { useContext } from "react";
import "./TopTracks.css";
import { ApiContext } from "../../utils/ApiContext";
import Card from "../Card";
import Skeleton from "../Skeleton";

const TopTracks = () => {
  const { apiData, status } = useContext(ApiContext);

  return (
    <section className="rplayed">
      <h2 className="subtitle">Top Tracks</h2>
      <div className="rplayed__grid">
        {status === "loading"
          ? [...Array(4).keys()].map((n) => <Skeleton height="220px" key={n} />)
          : apiData?.map((data) => {
              // setLoading(false);
              return (
                <Card
                  key={data.key}
                  title={data.title}
                  id={Number(data.key)}
                  artist={data.subtitle}
                  thumbnail={data.images.background}
                />
              );
            })}
      </div>
    </section>
  );
};

export default TopTracks;
