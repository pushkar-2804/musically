export type ICard {
    id: number;
    title: string;
    artist: string;
    thumbnail: string;
    url?: string;
    isFavorite: boolean;
    playlists?: number[];
  }

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