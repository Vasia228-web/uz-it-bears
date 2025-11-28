import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './hooks/AuthContext';

import Home from "./pages/Home/Home.jsx";
import Auth from "./pages/Auth/Auth.jsx"; 
import Header from "./components/Header/Header.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import Project from "./pages/Project/Project.jsx";
import Ranking from "./pages/Ranking/Ranking.jsx";
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';  

import './App.module.css';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="loading">Завантаження...</div>;
  }

  return (
    <Router>
      <div className="app">

        {user && <Header />}
        
        <Routes>

          <Route 
            path="/auth" 
            element={user ? <Navigate to="/" replace /> : <Auth />} 
          />
          
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/auth" replace />} 
          />

          <Route 
            path="/chat" 
            element={user ? <Chat /> : <Navigate to="/auth" replace />} 
          />

          <Route 
            path="/projects" 
            element={user ? <Project /> : <Navigate to="/auth" replace />} 
          />

          <Route 
            path="/ranking" 
            element={user ? <Ranking /> : <Navigate to="/auth" replace />} 
          />

          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/auth" replace />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
