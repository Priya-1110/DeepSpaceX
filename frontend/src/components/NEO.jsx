import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const NEO = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/neo')
      .then(res => {
        setNeos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching NEO data:', err);
        setLoading(false);
      });
  }, []);

  const chartData = neos.map(neo => ({
    name: neo.name,
    diameter: +neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)
  }));

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

      <h2 className="text-3xl font-bold mb-8 text-center">☄️ Near Earth Objects (Today)</h2>

      {loading ? (
        <p className="text-center animate-pulse">Loading NEOs...</p>
      ) : neos.length === 0 ? (
        <p className="text-center">No NEOs found today.</p>
      ) : (
        <>
          {/* Table */}
          <table className="w-full border-collapse mt-6">
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

          {/* Chart */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-center">📊 Max Diameter of NEOs</h2>
          <div className="w-full h-[400px] bg-white/5 rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} height={80} tick={{ fill: 'white', fontSize: 10 }} />
                <YAxis tick={{ fill: 'white' }} />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: 'white' }} />
                <Legend />
                <Bar dataKey="diameter" fill="#38bdf8" className="hover:fill-yellow-400 transition" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default NEO;
