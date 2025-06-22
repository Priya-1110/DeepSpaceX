import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import APOD from './components/APOD';
import Mars from './components/Mars';
import EPIC from './components/EPIC';
import NEO from './components/NEO';
import Home from './components/Home'; // New component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/epic" element={<EPIC />} />
        <Route path="/neo" element={<NEO />} />
      </Routes>
    </Router>
  );
}

export default App;
