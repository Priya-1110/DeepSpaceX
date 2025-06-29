import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';

export default function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/apod`)
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching APOD:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center font-orbitron text-xl animate-pulse">
        Loading...
      </div>
    );
  }

  if (!apod) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center font-orbitron text-xl">
        Failed to load APOD.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-orbitron pt-32 sm:pt-28 px-4 pb-10 sm:px-8 relative">
      {/* Navbar */}
      <nav className="w-full flex flex-wrap justify-between items-center py-4 px-6 bg-black/80 border-b border-white/20 fixed top-0 left-0 z-20 backdrop-blur-md">
        <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">
          DeepSpaceX
        </h1>
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white border border-white p-2 rounded hover:bg-white/10"
          >
            <HiOutlineMenu size={20} />
          </button>
        </div>
        <div className={`w-full sm:w-auto ${menuOpen ? 'block' : 'hidden'} sm:flex flex-wrap gap-4 text-sm sm:text-base mt-2 sm:mt-0`}>
          <Link to="/" className="block sm:inline hover:text-cyan-400 transition">Home</Link>
          <Link to="/apod" className="block sm:inline hover:text-cyan-400 transition">APOD</Link>
          <Link to="/mars" className="block sm:inline hover:text-cyan-400 transition">Mars</Link>
          <Link to="/epic" className="block sm:inline hover:text-cyan-400 transition">EPIC</Link>
          <Link to="/neo" className="block sm:inline hover:text-cyan-400 transition">NEOs</Link>
          <Link to="/donki" className="block sm:inline hover:text-cyan-400 transition">DONKI</Link>
          <Link to="/library" className="block sm:inline hover:text-cyan-400 transition">Library</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center break-words px-2">{apod.title}</h2>
        <p className="text-sm text-gray-400 text-center mb-6">{apod.date}</p>

        <div className="flex justify-center mb-6">
          {apod.media_type === 'image' ? (
            <img
              src={apod.url}
              alt={apod.title}
              className="rounded-lg w-full max-w-full md:max-w-2xl shadow-lg border border-white/20"
            />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              className="w-full max-w-full md:max-w-3xl h-[250px] sm:h-[400px] md:h-[500px] rounded-lg border border-white/20"
            ></iframe>
          )}
        </div>

        <div className="flex justify-center mb-8">
          <a
            href={apod.hdurl || apod.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2 px-5 rounded-xl transition shadow hover:shadow-lg text-sm sm:text-base"
          >
            🔍 View Full Resolution
          </a>
        </div>

        <p className="text-base sm:text-lg text-gray-200 leading-relaxed bg-white/5 p-6 rounded-xl shadow-inner">
          {apod.explanation}
        </p>
      </div>
    </div>
  );
}