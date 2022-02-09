import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from './App';
import CreateRoomPage from './Pages/CreateRoom/CreateRoom';
import JoinRoomPage from './Pages/JoinRoom/JoinRoom';
import JoinRoomCheckerPage from './Pages/JoinRoomChecker/JoinRoomChecker';
import WatchingRoomPage from './Pages/WatchingRoom/WatchingRoom';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/join-room/:roomId" element={<JoinRoomCheckerPage />} />
        <Route path="/rooms/:roomId" element={<WatchingRoomPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
