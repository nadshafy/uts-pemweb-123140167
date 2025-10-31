import React from 'react';

const DetailModal = ({ track, onClose }) => {
  if (!track) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-button" onClick={onClose}>X</button>
        
        <h2>{track.trackName}</h2>
        <h3>{track.artistName}</h3>

        <img 
          src={track.artworkUrl100.replace('100x100', '300x300')}
          alt={track.trackName} 
          style={{ width: '300px', height: '300px' }}
        />

        <p><strong>Album:</strong> {track.collectionName}</p>
        <p><strong>Genre:</strong> {track.primaryGenreName}</p>
        <p><strong>Tanggal Rilis:</strong> {new Date(track.releaseDate).toLocaleDateString()}</p>
        <p>
          <a href={track.trackViewUrl} target="_blank" rel="noopener noreferrer">
            Lihat di iTunes Store
          </a>
        </p>

      </div>
    </div>
  );
};

export default DetailModal;