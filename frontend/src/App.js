import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import APOD from './components/APOD';
import Mars from './components/Mars';
import EPIC from './components/EPIC';
import NEO from './components/NEO';
import DONKI from './components/DONKI';
import Library from './components/Library'; // New component
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
        <Route path="/donki" element={<DONKI />} />
        <Route path="/library" element={<Library />} />


      </Routes>
    </Router>
  );
}

export default App;
