import React from 'react'
import Socket from '../../../../Socket';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faTrashCan, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { PLAYLIST_STATUS, SOCKET_EVENTS } from "../../../../Constants";

import './PlaylistItem.scss';

function PlaylistItem({ id, username, link, videoId}) {
  return (
    <div className="playlist-item" id={id} >
      <div className="thumbnail">
        <img
          src="https://www.techsmith.com/blog/wp-content/uploads/2019/06/YouTube-Thumbnail-Sizes.png"
          alt={link}
        />
      </div>
      <div className="content">
        <p title={link.length > 40 ? link: null} className="name">{link.length > 40 ? link.slice(0,40) + '...': link }</p>
        <small className="added-by">{username}</small>
      </div>
      <div className="control-buttons">
        <FontAwesomeIcon icon={faAngleUp} onClick={() => Socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, {id, videoId, username, link, playlistStatus: PLAYLIST_STATUS.MOVE_UP})} />
        <FontAwesomeIcon icon={faTrashCan} onClick={() => Socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, {id, videoId, username, link, playlistStatus: PLAYLIST_STATUS.REMOVE})} />
        <FontAwesomeIcon icon={faAngleDown} onClick={() => Socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, {id, videoId, username, link, playlistStatus: PLAYLIST_STATUS.MOVE_DOWN})} />
      </div>
    </div>
  )
}

export default PlaylistItem
