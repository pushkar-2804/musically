import Card from "../components/Card";
import { ApiContext } from "../utils/ApiContext";
import { useContext } from "react";

const Favourites = () => {
  const { favList } = useContext(ApiContext);
  return (
    <>
      <section className="rplayed">
        <h2 className="subtitle">Favourites</h2>
        <div className="rplayed__grid">
          {favList.length ? (
            favList?.map((data) => {
              return (
                <Card
                  key={data.id}
                  id={data.id}
                  artist={data.artist}
                  thumbnail={data.thumbnail}
                  title={data.title}
                  url={data.url}
                  isFavorite={data.isFavorite}
                />
              );
            })
          ) : (
            <div>No favourite songs present</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Favourites;
