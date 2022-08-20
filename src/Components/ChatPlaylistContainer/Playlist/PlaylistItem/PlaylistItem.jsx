import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faTrashCan, faAngleDown } from '@fortawesome/free-solid-svg-icons'


import './PlaylistItem.scss';

function PlaylistItem({ id, username, link, moveUpVideo, moveDownVideo, removeVideo}) {
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
        <FontAwesomeIcon icon={faAngleUp} onClick={() => moveUpVideo(id)} />
        <FontAwesomeIcon icon={faTrashCan} onClick={() => removeVideo(id)} />
        <FontAwesomeIcon icon={faAngleDown} onClick={() => moveDownVideo(id)} />
      </div>
    </div>
  )
}

export default PlaylistItem
