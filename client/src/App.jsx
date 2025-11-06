import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import Project from "./pages/Project/Project.jsx";
import Ranking from "./pages/Ranking/Ranking.jsx";
import './App.module.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;