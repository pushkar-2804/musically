import Card from "../Card";

export type tracksProps = {
  tracks: {
    hits: {
      track: {
        layout: string;
        type: string;
        key: string;
        title: string;
        subtitle: string;
        share: { [key: string]: any };
        images: {
          background: string;
          coverart: string;
          coverarthq: string;
          joecolor: string;
        };
        hub: { [key: string]: any };
        artists: { id: string; adamid: string }[];
        url: string;
      };
    }[];
  };
};

const Playlist = (props: tracksProps) => {
  return (
    <div className="rplayed">
      <h3 className="subtitle"> Playlists </h3>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
