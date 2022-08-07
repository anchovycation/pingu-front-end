import React, { useState } from 'react'
import Chat from '../Chat/Chat';
import Playlist from './Playlist/Playlist';

import './ChatPlaylistContainer.scss';

const MENU_TYPES = {
  CHAT: 'chat',
  PLAYLIST: 'playlist',
}

function ChatPlaylistContainer({ chatProps, playlistProps }) {
  const [selectedContent, setSelectedContent] = useState(MENU_TYPES.CHAT);
  return (
    <div className="chat-playlist-container">
      <div className="menu">
        <span className={ selectedContent === MENU_TYPES.CHAT ? 'selected' : null } onClick={() => setSelectedContent(MENU_TYPES.CHAT)}>Chat</span>
        <span className={ selectedContent === MENU_TYPES.PLAYLIST ? 'selected' : null }  onClick={() => setSelectedContent(MENU_TYPES.PLAYLIST)}>Playlist</span>
      </div>
      {
        selectedContent === MENU_TYPES.CHAT ? <Chat {...chatProps} /> : <Playlist {...playlistProps} />
      }
    </div>
  )
}

export default ChatPlaylistContainer;
