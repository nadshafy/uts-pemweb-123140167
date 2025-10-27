import React from 'react';

const Playlist = ({ playlist, removeFromPlaylist }) => {
  return (
    <aside>
      <h2>Playlist Saya</h2>
      {playlist.length === 0 ? (
        <p>Playlist Anda kosong.</p>
      ) : (
        <ul>
          {playlist.map((track) => (
            <li key={track.trackId}>
              {track.trackName} - {track.artistName}
              
              <button 
                onClick={() => removeFromPlaylist(track.trackId)}
                style={{ marginLeft: '10px' }}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Playlist;