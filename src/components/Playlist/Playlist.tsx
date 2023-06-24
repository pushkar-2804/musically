import { useContext } from "react";
import { ApiContext } from "../../utils/ApiContext";
import PlaylistCards from "../PlaylistsCards/PlaylistsCards";
interface PlaylistProps {
  playlistId: number | null;
  length: number;
}

const Playlist: React.FC<PlaylistProps> = ({ playlistId, length }) => {
  const { playlists } = useContext(ApiContext);

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!length) {
    return <div>No Playlist is created yet..</div>;
  }

  if (!playlist) {
    return <div>Select a playlist</div>;
  }

  return (
    <div className="rplayed">
      <h3 className="subtitle">{playlist.name}</h3>
      <PlaylistCards cards={playlist.cards} />
    </div>
  );
};

export default Playlist;
