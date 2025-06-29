import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MediaCard = ({ item }) => {
  const data = item.data[0];
  const media = data.media_type;
  const [thumb, setThumb] = useState(item.links?.[0]?.href);
  const [assetUrl, setAssetUrl] = useState(null);

  useEffect(() => {
    const resolveAssetUrl = async () => {
      try {
        const res = await axios.get(`https://images-api.nasa.gov/asset/${data.nasa_id}`);
        const items = res.data.collection.items;
        const file = items.find(f =>
          f.href.endsWith('.mp4') || f.href.endsWith('.mp3') || f.href.endsWith('.wav')
        );
        if (file) setAssetUrl(file.href);
      } catch {
        setAssetUrl(null);
      }
    };

    if (media === 'video' || media === 'audio') {
      resolveAssetUrl();
    } else {
      setAssetUrl(thumb);
    }
  }, [data.nasa_id, media, thumb]);

  return (
    <div className="bg-white/5 p-3 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <p className="text-sm text-cyan-300 mb-2 capitalize">{media}</p>

      {/* Thumbnail Wrapper */}
      <a
        href={assetUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block group"
      >
        <div
          className={`w-full ${
            media === 'audio' ? 'h-32' : 'h-48'
          } bg-black border border-white/20 rounded-2xl overflow-hidden flex items-center justify-center`}
        >
          {media === 'image' && thumb ? (
            <img src={thumb} alt={data.title} className="w-full h-full object-cover rounded-xl" />
          ) : media === 'video' && thumb ? (
            <>
              <img
                src={thumb}
                alt="Video Preview"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white bg-black/70 p-3 rounded-full shadow-lg text-2xl">
                  ▶
                </div>
              </div>
            </>
          ) : media === 'audio' ? (
            <div className="text-cyan-300 text-base font-semibold text-center px-4">
              🎧 Click to listen
            </div>
          ) : (
            <div className="text-gray-500">No preview available</div>
          )}
        </div>
      </a>

      <h3 className="mt-2 text-white text-sm font-bold truncate" title={data.title}>
        {data.title}
      </h3>
    </div>
  );
};

export default MediaCard;
