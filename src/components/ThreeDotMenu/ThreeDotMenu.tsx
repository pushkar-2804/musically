import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { IPlaylist } from "../../utils/ApiContext";
import "./ThreeDotMenu.css";

interface ThreeDotMenuProps {
  playlists: IPlaylist[];
  onPlaylistClick: (playlistId: number) => void;
  activePlaylistId: number | null; // Add activePlaylistId prop
}

const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  playlists,
  onPlaylistClick,
  activePlaylistId,
}) => {
  const [playlistsAvailable, setPlaylistsAvailable] = useState(false);

  useEffect(() => {
    if (playlists?.length) setPlaylistsAvailable(true);
  }, [playlists]);

  return (
    <DropdownButton id="dropdown-menu" title="" className="dropdown-with-dots">
      {playlistsAvailable ? (
        <>
          <Dropdown.Item disabled>Select a Playlist</Dropdown.Item>

          {playlists.map((playlist) => (
            <Dropdown.Item
              key={playlist.id}
              onClick={() => onPlaylistClick(playlist.id)}
              active={activePlaylistId === playlist.id} // Set the active state based on activePlaylistId
            >
              {playlist.name}
            </Dropdown.Item>
          ))}
        </>
      ) : (
        <Dropdown.Item disabled>No Playlist Available</Dropdown.Item>
      )}
    </DropdownButton>
  );
};

export default ThreeDotMenu;
