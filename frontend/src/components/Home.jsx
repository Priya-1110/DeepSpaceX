import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import clickSfx from './assets/click-21156.mp3';
import spaceAmbience from './assets/space-ambience.mp3';

const tiles = [
  {
    label: 'APOD',
    to: '/apod',
    riddle: "I catch the cosmos' daily breath",
  },
  {
    label: 'Mars Rover',
    to: '/mars',
    riddle: "I roam the rusted plains of red",
  },
  {
    label: 'EPIC Earth',
    to: '/epic',
    riddle: "I blink from Earth's polar gaze",
  },
  {
    label: 'NEOs',
    to: '/neo',
    riddle: "I warn when danger from the skies arrives",
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(new Audio(clickSfx));
  const bgAudioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
      <audio ref={bgAudioRef} src={spaceAmbience} autoPlay loop />

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className="absolute top-5 right-5 z-10 bg-black/50 border border-white px-3 py-1 rounded text-sm hover:bg-white hover:text-black transition"
      >
        {muted ? '🔇 Mute' : '🔊 Sound'}
      </button>

      {/* Header */}
      <div className="flex items-center justify-center mb-12 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white whitespace-nowrap">
          Welcome to <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">DeepSpaceX</span>
        </h1>
      </div>

      {/* Riddle Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        {tiles.map(({ label, to, riddle }) => (
          <Link
            key={label}
            to={to}
            onMouseEnter={playClick}
            className="relative w-72 h-40 bg-black/60 border border-white/30 rounded-2xl shadow-xl transition-transform duration-500 backdrop-blur-md group overflow-hidden hover:shadow-[0_0_30px_gold] hover:border-yellow-300"
          >
            <div className="absolute inset-0 animate-pulse opacity-10 bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-400 rounded-2xl blur-xl"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
              <p className="text-sm text-center italic text-slate-300 mb-2">{riddle}</p>
              <p className="text-2xl font-bold text-yellow-300 tracking-wide opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
