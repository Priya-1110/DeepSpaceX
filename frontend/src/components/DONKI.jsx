import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';

const DONKI = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/donki`)
      .then((res) => {
        setAlerts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching DONKI alerts:', err);
        setLoading(false);
      });
  }, []);

  const filteredAlerts = alerts.filter((alert) =>
    filterType === 'All' ? true : alert.messageType === filterType
  );

  return (
    <div className="min-h-screen bg-black text-white font-orbitron pt-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black opacity-20 pointer-events-none animate-pulse z-0" />

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
          <Link to="/donki" className="block sm:inline text-cyan-400 font-semibold transition">DONKI</Link>
          <Link to="/library" className="block sm:inline hover:text-cyan-400 transition">Library</Link>
        </div>
      </nav>

      <h2 className="text-4xl font-bold text-center mb-6 text-white z-10">
        🌞 Space Weather Alerts (DONKI)
      </h2>

      <div className="mb-6 text-center z-10">
        <select
          className="px-4 py-2 rounded bg-black text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="RBE">RBE</option>
          <option value="CME">CME</option>
          <option value="SEP">SEP</option>
          <option value="FLR">FLR</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-cyan-300 animate-pulse">Fetching solar telemetry...</p>
      ) : filteredAlerts.length === 0 ? (
        <p className="text-center">No alerts found 🛸</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
          {filteredAlerts.map((alert, idx) => {
            const issueTime = new Date(alert.messageIssueTime).toLocaleString();
            const body = alert.messageBody.split('\n\n')[2] || '';
            const colorMap = {
              RBE: 'border-cyan-400/50',
              CME: 'border-red-400/40',
              SEP: 'border-yellow-300/40',
              FLR: 'border-pink-400/40',
            };
            const borderColor = colorMap[alert.messageType] || 'border-white/20';

            return (
              <div
                key={idx}
                className={`relative bg-white/5 rounded-lg border ${borderColor} p-4 shadow-md hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-all duration-300 group`}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent rounded-l group-hover:scale-y-110 transition-transform origin-top" />
                <p className="text-sm text-cyan-300 mb-1 tracking-wide">
                  🛰 {alert.messageType} – {issueTime}
                </p>
                <h3 className="text-lg font-bold tracking-wider text-purple-200 mb-1">
                  {alert.messageID}
                </h3>
                <p className="text-gray-300 text-xs whitespace-pre-wrap mb-2">
                  {body || 'Alert summary not available.'}
                </p>
                <a
                  href={alert.messageURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm hover:text-blue-200 transition"
                >
                  🔗 View Full Alert
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DONKI;
