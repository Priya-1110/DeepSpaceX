import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/apod`)
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching APOD:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="h-screen bg-black text-white flex items-center justify-center font-orbitron text-xl animate-pulse">Loading...</div>;
  if (!apod) return <div className="h-screen bg-black text-white flex items-center justify-center font-orbitron text-xl">Failed to load APOD.</div>;

  return (
    <div className="min-h-screen bg-black text-white font-orbitron p-6 relative">
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

      {/* Main Content */}
      <div className="pt-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">{apod.title}</h2>
        <p className="text-sm text-gray-400 text-center mb-6">{apod.date}</p>

        <div className="flex justify-center mb-6">
          {apod.media_type === 'image' ? (
            <img
              src={apod.url}
              alt={apod.title}
              className="rounded-lg max-w-full shadow-lg border border-white/20"
            />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              className="w-full max-w-3xl h-[500px] rounded-lg border border-white/20"
            ></iframe>
          )}
        </div>

        <p className="text-lg text-gray-200 leading-relaxed bg-white/5 p-6 rounded-xl shadow-inner">
          {apod.explanation}
        </p>
      </div>
    </div>
  );
}
