import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CrewmateForm from './crewmateForm';
import CrewmateList from './crewmateList';
import CrewmateDetail from './crewmateDetail';
import EditCrewmate from './editCrewmate';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Crewmate Manager</h1>
        <nav>
          <Link to="/"className="link">Crewmate List</Link>
          <Link to="/add"className="link">Add Crewmate</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<CrewmateList />} />
          <Route path="/add" element={<CrewmateForm />} />
          <Route path="/crewmates/:id" element={<CrewmateDetail />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


