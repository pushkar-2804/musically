import { tracksProps } from "../../constants";
import Card from "../Card";

const SearchedResults = (props: tracksProps) => {
  return (
    <div className="rplayed">
      <h3 className="subtitle"> Searched results.. </h3>
      <div className="rplayed__grid">
        {props.tracks?.hits?.map((hit) => {
          return (
            <Card
              id={Number(hit.track.key)}
              key={hit.track.key}
              title={hit.track.title}
              artist={hit.track.subtitle}
              thumbnail={hit.track.images.coverart}
              url={hit.track.url}
              isFavorite
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchedResults;
