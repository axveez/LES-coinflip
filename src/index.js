import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import { initContract } from './utils'
import "./styles/global.scss";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  // <App />,
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/leaderboard" element={<Leaderboard />}>
        <Route index element={<Leaderboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.querySelector('#root')
);
