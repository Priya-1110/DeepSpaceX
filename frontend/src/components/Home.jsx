import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import clickSfx from './assets/click-21156.mp3';
import spaceAmbience from './assets/space-ambience.mp3';

const tiles = [
  {
    label: 'APOD',
    to: '/apod',
    riddle: "I catch the cosmos’ daily breath",
  },
  {
    label: 'Mars Rover',
    to: '/mars',
    riddle: "I roam the rusted plains of red",
  },
  {
    label: 'EPIC Earth',
    to: '/epic',
    riddle: "I blink from Earth’s polar gaze",
  },
  {
    label: 'NEOs',
    to: '/neo',
    riddle: "I warn when danger from the skies arrives",
  },
  {
    label: 'DONKI',
    to: '/donki',
    riddle: "I monitor the sun’s tempers and storms",
  },
  {
    label: 'Library',
    to: '/library',
    riddle: "I hold cosmic memories of light and sound",
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(new Audio(clickSfx));
  const bgAudioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = muted;
      const playPromise = bgAudioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [muted]);

  const playClick = () => {
    const sound = audioRef.current;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  const toggleMute = () => {
    const bg = bgAudioRef.current;
    if (bg) {
      bg.muted = !bg.muted;
      setMuted(bg.muted);
    }
  };

  if (showIntro) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-3xl animate-pulse font-orbitron">
        Initializing Launch Sequence...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-4 font-orbitron">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/space-bg.mp4" type="video/mp4" />
      </video>

      {/* Background Music */}
      <audio ref={bgAudioRef} src={spaceAmbience} autoPlay loop muted={muted} />

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className="absolute top-5 right-5 z-10 bg-black/50 border border-white px-3 py-1 rounded text-sm hover:bg-white hover:text-black transition"
      >
        {muted ? '🔇 Sound' : '🔊 Sound'}
      </button>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center z-10"
      >
        Welcome to <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">DeepSpaceX</span>
      </motion.h1>

      {/* Riddle Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 w-full max-w-6xl px-4">
        {tiles.map(({ label, to, riddle }) => (
          <Link
            key={label}
            to={to}
            onMouseEnter={playClick}
            className="relative group flex items-center justify-center h-36 p-4 rounded-xl border border-cyan-400 bg-black/50 backdrop-blur-md text-center text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-[0_0_30px_cyan] hover:border-cyan-300"
          >
            <span className="absolute text-xl font-bold text-yellow-300 opacity-0 group-hover:opacity-100 transition duration-300">
              {label}
            </span>
            <span className="text-lg sm:text-xl italic transition duration-300 group-hover:opacity-0">
              {riddle}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
