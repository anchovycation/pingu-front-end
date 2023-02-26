const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join-room',
  JOINED: 'joined',
  SEND_MESSAGE: 'send-message',
  RECEIVE_MESSAGE: 'receive-message',
  TYPING: 'typing',
  DISPLAY: 'display',
  UPDATE_PLAYLIST: 'update-playlist',
  PLAYLIST_UPDATED: 'playlist-updated',
  KICK_USER: 'kick-user',
  USER_KICKED: 'user-kicked',
  UPDATE_VIDEO_STATUS: 'update-video-status',
  VIDEO_STATUS_UPDATED: 'video-status-updated',
  CHANGE_VIDEO_DURATION: 'change-video-duration',
  VIDEO_DURATION_CHANGED: 'video-duration-changed',
  SKIP_VIDEO: 'skip-video',
  VIDEO_SKIPPED: 'video-skipped',
  CHANGE_NAME: 'change-name',
  NAME_CHANGED: 'name-changed',
};

export default SOCKET_EVENTS;
