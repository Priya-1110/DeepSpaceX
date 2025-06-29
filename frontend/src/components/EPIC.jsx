import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';

const EPIC = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('natural');
  const [selectedDate, setSelectedDate] = useState('');
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, [mode]);

  useEffect(() => {
    let interval;
    if (isPlaying && images.length > 0) {
      interval = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % images.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images]);

  useEffect(() => {
    if (!isPlaying || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    const img = new Image();

    const drawFrame = () => {
      const currentImage = getImageUrl(images[frame].image, images[frame].date);
      img.src = currentImage;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      frame = (frame + 1) % images.length;
    };

    const interval = setInterval(drawFrame, 700);
    return () => clearInterval(interval);
  }, [isPlaying, images, mode]);

  const fetchImages = () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/epic?mode=${mode}`;
    if (selectedDate) url += `&date=${selectedDate}`;
    axios.get(url)
      .then(res => {
        setImages(res.data);
        setFrameIndex(0);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching EPIC images:', err);
        setLoading(false);
      });
  };

  const getImageUrl = (image, date) => {
    const [yyyy, mm, dd] = date.split(' ')[0].split('-');
    return `https://epic.gsfc.nasa.gov/archive/${mode}/${yyyy}/${mm}/${dd}/jpg/${image}.jpg`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-orbitron pt-32 px-4 sm:px-8 relative">
      {/* Navbar */}
      <nav className="w-full flex flex-wrap justify-between items-center py-4 px-6 bg-black/80 border-b border-white/20 fixed top-0 left-0 z-20 backdrop-blur-md">
        <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">
          DeepSpaceX
        </h1>
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white border border-white p-2 rounded hover:bg-white/10">
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

      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mt-4 mb-6">
        <button
          onClick={() => setMode('natural')}
          className={`px-4 py-2 rounded-full border ${mode === 'natural' ? 'border-cyan-400 text-cyan-300' : 'border-white/30 text-white/60'} transition hover:border-cyan-500`}
        >
          🌍 Natural
        </button>
        <button
          onClick={() => setMode('enhanced')}
          className={`px-4 py-2 rounded-full border ${mode === 'enhanced' ? 'border-pink-400 text-pink-300' : 'border-white/30 text-white/60'} transition hover:border-pink-500`}
        >
          🛰️ Enhanced
        </button>
      </div>

      {/* Date Filter */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <input
          type="date"
          max={new Date().toISOString().split('T')[0]}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-black border border-cyan-400 text-white px-3 py-2 rounded-md"
        />
        <button
          onClick={fetchImages}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md"
        >
          🔍 Filter
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md"
        >
          {isPlaying ? '⏸ Pause Rotation' : '▶ Play Rotation'}
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        {mode === 'natural' ? '🌍 Natural EPIC Earth Images' : '🛰️ Enhanced EPIC Earth Images'}
      </h2>

      {/* Loading / Canvas / Grid */}
      {loading ? (
        <p className="text-center animate-pulse">Loading {mode} EPIC images...</p>
      ) : images.length === 0 ? (
        <p className="text-center">No {mode} images found.</p>
      ) : isPlaying ? (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text animate-pulse tracking-wide">
            🌐 Earth Rotation Simulation (Canvas)
          </h3>
          <div className="relative w-full max-w-md aspect-square border-4 border-cyan-400 rounded-xl shadow-xl animate-glow">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="rounded-xl w-full h-full bg-black"
            />
          </div>
          <p className="text-sm text-cyan-300 italic mt-2 animate-pulse">Rendering EPIC frames...</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.slice(0, 12).map((img) => (
            <div key={img.identifier} className="bg-white/5 p-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
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
                <strong>Date:</strong> {img.date.split(' ')[0]}<br />
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