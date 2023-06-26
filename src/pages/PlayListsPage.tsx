import { useState, useContext } from "react";
import { ApiContext } from "../utils/ApiContext";
import Playlist from "../components/Playlist/Playlist";
import deleteIcon from "../assets/Delete.svg";
import ModalCreatePlaylist from "../components/ModalCreatePlaylist/ModalCreatePlaylist";
import NavModal from "../components/NavModal/NavModal";

const PlayListsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { playlists, removePlaylist } = useContext(ApiContext);
  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(null);

  const handleRemovePlaylist = (playlistId: number) => {
    removePlaylist(playlistId);
  };

  return (
    <div className="wrap">
      {" "}
      <NavModal />
      <div className="rplayed">
        <h3 className="subtitle"> Playlists </h3>
        <div className="rplayed__grid">
          <div className="card" onClick={() => setShowModal(true)}>
            <h3 className="card__title">Create a Playlist...</h3>
          </div>
        </div>
        {showModal && (
          <ModalCreatePlaylist
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        <div className="rplayed__grid">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="card "
              onClick={() => setActivePlaylistId(playlist.id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="card__title">{playlist.name}</h3>
                <div className="d-flex align-items-center">
                  <span className="card__artist">
                    ({playlist.cards.length})
                  </span>
                  <button
                    onClick={() => handleRemovePlaylist(playlist.id)}
                    className="btn text-light"
                  >
                    <img src={deleteIcon} alt="delete" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Playlist playlistId={activePlaylistId} length={playlists.length} />
      </div>
    </div>
  );
};

export default PlayListsPage;
