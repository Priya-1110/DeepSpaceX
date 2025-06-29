import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MediaCard from './MediaCard'; // Import the new component

const Library = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('space');
  const [mediaType, setMediaType] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    setLoading(true);
    const typeParam = mediaType === 'all' ? 'image,video,audio' : mediaType;

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/library`, {
        params: {
          q: query,
          media_type: typeParam,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error('Error fetching NASA media library:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-orbitron pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-cyan-300 text-transparent bg-clip-text">
        📚 NASA Media Library
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 items-center">
        <input
          type="text"
          placeholder="Search keywords (e.g. rover, moon)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-72 rounded-md bg-black border border-cyan-400 text-white"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="px-4 py-2 rounded-md bg-black border border-purple-400 text-white"
        >
          <option value="all">🌌 All Media</option>
          <option value="image">🖼️ Images</option>
          <option value="video">🎥 Videos</option>
          <option value="audio">🔊 Audio</option>
        </select>
        <button
          onClick={fetchResults}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md"
        >
          🔍 Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center animate-pulse">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-center">No media found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.slice(0, 20).map((item, i) => (
            <MediaCard key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
