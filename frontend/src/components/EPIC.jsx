import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EPIC = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epic`)
      .then(res => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching EPIC images:', err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (image, date) => {
    const [yyyy, mm, dd] = date.split(' ')[0].split('-');
    return `https://epic.gsfc.nasa.gov/archive/natural/${yyyy}/${mm}/${dd}/jpg/${image}.jpg`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-orbitron pt-24 px-6">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 px-6 bg-black/80 border-b border-white/20 fixed top-0 left-0 z-20 backdrop-blur-md">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">DeepSpaceX</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link to="/apod" className="hover:text-cyan-400 transition">APOD</Link>
          <Link to="/mars" className="hover:text-cyan-400 transition">Mars</Link>
          <Link to="/epic" className="hover:text-cyan-400 transition">EPIC</Link>
          <Link to="/neo" className="hover:text-cyan-400 transition">NEOs</Link>
        </div>
      </nav>

      <h2 className="text-3xl font-bold mb-8 text-center">🌍 EPIC Earth Images</h2>

      {loading ? (
        <p className="text-center animate-pulse">Loading EPIC images...</p>
      ) : images.length === 0 ? (
        <p className="text-center">No EPIC images found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.slice(0, 12).map((img) => (
            <div key={img.identifier} className="bg-white/5 p-4 rounded-xl shadow-lg">
              <a href={getImageUrl(img.image, img.date)} target="_blank" rel="noopener noreferrer">
                <img
                  src={getImageUrl(img.image, img.date)}
                  alt={img.caption}
                  className="w-full rounded-lg border border-white/20"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x300?text=Image+Unavailable';
                  }}
                />
              </a>
              <p className="mt-2 text-sm text-gray-300">
                <strong>Date:</strong> {img.date.split(' ')[0]}
                <br />
                <em>{img.caption}</em>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EPIC;
