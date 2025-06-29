import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';

const NEO = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // MOCK DATA FALLBACK
    const mockData = [
      {
        id: '1',
        name: 'Mock Asteroid A',
        estimated_diameter: { kilometers: { estimated_diameter_max: 0.123 } },
        close_approach_data: [
          {
            relative_velocity: { kilometers_per_hour: '45000' },
            miss_distance: { kilometers: '780000' }
          }
        ],
        is_potentially_hazardous_asteroid: false
      },
      {
        id: '2',
        name: 'Mock Asteroid B',
        estimated_diameter: { kilometers: { estimated_diameter_max: 3.6 } },
        close_approach_data: [
          {
            relative_velocity: { kilometers_per_hour: '67000' },
            miss_distance: { kilometers: '1200000' }
          }
        ],
        is_potentially_hazardous_asteroid: true
      }
    ];

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/neo`)
      .then(res => {
        const result = res.data && res.data.length ? res.data : mockData;
        setNeos(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching NEO data:', err);
        setNeos(mockData);
        setLoading(false);
      });
  }, []);

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

      <h2 className="text-3xl font-bold mb-8 text-center">☄️ Near Earth Objects (Today)</h2>

      {loading ? (
        <p className="text-center animate-pulse">Loading NEOs...</p>
      ) : neos.length === 0 ? (
        <p className="text-center">No NEOs found today.</p>
      ) : (
        <>
          {/* Table */}
          <table className="w-full border-collapse mt-6 text-sm sm:text-base">
            <thead>
              <tr className="bg-white/10">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Diameter (km)</th>
                <th className="p-2 text-left">Speed (km/h)</th>
                <th className="p-2 text-left">Miss Distance (km)</th>
                <th className="p-2 text-left">Hazard?</th>
              </tr>
            </thead>
            <tbody>
              {neos.map((neo) => {
                const diameter = neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3);
                const speed = parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0);
                const distance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toFixed(0);
                const hazard = neo.is_potentially_hazardous_asteroid;

                return (
                  <tr key={neo.id} className={`border-t ${hazard ? 'bg-red-900/30' : 'bg-white/5'}`}>
                    <td className="p-2">{neo.name}</td>
                    <td className="p-2">{diameter}</td>
                    <td className="p-2">{speed}</td>
                    <td className="p-2">{distance}</td>
                    <td className="p-2 text-green-400">{hazard ? <span className="text-red-400">⚠️ Yes</span> : '✅ No'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default NEO;