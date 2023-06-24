import Card from "../components/Card";
import { ApiContext } from "../utils/ApiContext";
import { useContext } from "react";

const Favourites = () => {
  const { favList } = useContext(ApiContext);
  return (
    <section className="rplayed">
      <h2 className="subtitle">Favourites</h2>
      <div className="rplayed__grid">
        {favList?.map((data) => {
          console.log(data);
          return (
            <Card
              id={data.id}
              artist={data.artist}
              thumbnail={data.thumbnail}
              title={data.title}
              url={data.url}
              isFavorite={data.isFavorite}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Favourites;
