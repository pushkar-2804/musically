import { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { ApiContext } from "../utils/ApiContext";
import Playlist from "../components/Playlist/Playlist";
import deleteIcon from "../assets/delete.png";

const PlayListsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { playlists, addPlaylist, removePlaylist } = useContext(ApiContext);
  const [playlistName, setPlaylistName] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(null);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleCreatePlaylist = () => {
    if (playlistName.trim() !== "") {
      addPlaylist(playlistName);
      setPlaylistName("");
    }
    handleClose();
  };

  const handleRemovePlaylist = (playlistId: number) => {
    removePlaylist(playlistId);
  };

  return (
    <div className="rplayed">
      <h3 className="subtitle"> Playlists </h3>
      <div className="rplayed__grid">
        <div className="card" onClick={() => setShowModal(true)}>
          <h3 className="card__title">Create a Playlist...</h3>
        </div>
      </div>
      {showModal && (
        <Modal
          centered
          show={showModal}
          onHide={() => setShowModal(false)}
          className="modal"
          style={{
            color: "black",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter playlist's name"
                  name="name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancel</button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleCreatePlaylist}
            >
              Create
            </button>
          </Modal.Footer>
        </Modal>
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
                <span className="card__artist">({playlist.cards.length})</span>
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
  );
};

export default PlayListsPage;
