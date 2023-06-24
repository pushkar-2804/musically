import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface ThreeDotMenuProps {
  playlists: Playlist[];
  onPlaylistClick: (playlistId: number) => void;
  isCardInPlaylist: (playlistId: number) => boolean;
}

const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  playlists,
  onPlaylistClick,
  isCardInPlaylist,
}) => {
  return (
    <DropdownButton id="dropdown-menu" title="...">
      {playlists.map((playlist) => (
        <Dropdown.Item
          key={playlist.id}
          onClick={() => onPlaylistClick(playlist.id)}
          active={isCardInPlaylist(playlist.id)}
        >
          {playlist.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default ThreeDotMenu;
