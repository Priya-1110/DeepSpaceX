import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CAMERA_OPTIONS = {
  curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
  opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
  spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
};

export default function Mars() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);
  const [camera, setCamera] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchPhotos = () => {
    setLoading(true);
    const params = { rover, sol };
    if (camera) params.camera = camera;

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/mars`, { params })
      .then(res => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching Mars photos:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const camerasForRover = CAMERA_OPTIONS[rover.toLowerCase()] || [];

  return (
    <div className="min-h-screen bg-black text-white font-orbitron pt-24 px-4 sm:px-6">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 px-6 bg-black/80 border-b border-white/20 fixed top-0 left-0 z-20 backdrop-blur-md">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">DeepSpaceX</h1>
        
        {/* Desktop Nav */}
        <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link to="/apod" className="hover:text-cyan-400 transition">APOD</Link>
          <Link to="/mars" className="hover:text-cyan-400 transition">Mars</Link>
          <Link to="/epic" className="hover:text-cyan-400 transition">EPIC</Link>
          <Link to="/neo" className="hover:text-cyan-400 transition">NEOs</Link>
          <Link to="/donki" className="hover:text-cyan-400 transition">DONKI</Link>
          <Link to="/library" className="hover:text-cyan-400 transition">Library</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white border border-white px-2 py-1 rounded">☰</button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-black border border-white p-4 rounded space-y-2 z-10">
              <Link to="/" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/apod" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>APOD</Link>
              <Link to="/mars" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Mars</Link>
              <Link to="/epic" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>EPIC</Link>
              <Link to="/neo" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>NEOs</Link>
              <Link to="/donki" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>DONKI</Link>
              <Link to="/library" className="block hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Library</Link>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">🛰️ Mars Rover Explorer</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div>
            <label className="mr-2">Rover:</label>
            <select value={rover} onChange={(e) => { setRover(e.target.value); setCamera(''); }} className="bg-black border border-white px-2 py-1 rounded">
              <option value="curiosity">Curiosity</option>
              <option value="opportunity">Opportunity</option>
              <option value="spirit">Spirit</option>
            </select>
          </div>

          <div>
            <label className="mr-2">Sol:</label>
            <input type="number" value={sol} onChange={(e) => setSol(e.target.value)} className="bg-black border border-white px-2 py-1 rounded w-24" />
          </div>

          {camerasForRover.length > 0 && (
            <div>
              <label className="mr-2">Camera:</label>
              <select value={camera} onChange={(e) => setCamera(e.target.value)} className="bg-black border border-white px-2 py-1 rounded">
                <option value="">All</option>
                {camerasForRover.map(cam => (
                  <option key={cam} value={cam}>{cam}</option>
                ))}
              </select>
            </div>
          )}

          <button onClick={fetchPhotos} className="px-4 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition">
            Search
          </button>
        </div>

        {/* Gallery */}
        {loading ? (
          <p className="text-center animate-pulse">Loading Mars Rover photos...</p>
        ) : photos.length === 0 ? (
          <p className="text-center">No photos found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {photos
              .filter(photo => photo.img_src?.startsWith('http'))
              .map(photo => (
                <div key={photo.id} className="bg-white/5 p-4 rounded-xl shadow-lg">
                  <img
                    src={photo.img_src.replace('http://', 'https://')}
                    alt={`Taken by ${photo.rover.name} - ${photo.camera.full_name}`}
                    className="w-full rounded-lg mb-2 border border-white/20"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
                    }}
                  />
                  <p className="text-sm text-gray-300">
                    <strong>{photo.rover.name}</strong> – {photo.camera.full_name}<br />
                    <em>{photo.earth_date}</em>
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
