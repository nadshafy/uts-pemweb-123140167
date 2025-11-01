import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import MusicTable from './components/MusicTable';
import SortControls from './components/SortControls';
import Playlist from './components/Playlist';
import DetailModal from './components/DetailModal';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('musicTrack');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [playlist, setPlaylist] = useState([]);

  const [sortKey, setSortKey] = useState('');

  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}&limit=20`
      );
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const addToPlaylist = (track) => {
    if (!playlist.find((item) => item.trackId === track.trackId)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeFromPlaylist = (trackIdToRemove) => {
    setPlaylist(playlist.filter((track) => track.trackId !== trackIdToRemove));
  };

  const clearPlaylist = () => {
    setPlaylist([]); 
  };

  const closeModal = () => {
    setSelectedTrack(null);
  };

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('myPlaylist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []); 
  
  useEffect(() => {
    localStorage.setItem('myPlaylist', JSON.stringify(playlist));
  }, [playlist]); 

  const sortedResults = [...results].sort((a, b) => {
    if (sortKey === 'price') {
      return a.trackPrice - b.trackPrice;
    }
    if (sortKey === 'date') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    return 0;
  });


  return (
    <div className="App">
      <h1>Music Explorer</h1>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mediaType={mediaType}
        setMediaType={setMediaType}
        handleSearch={handleSearch}
      />
      <hr />
      <SortControls setSortKey={setSortKey} />
      <hr />
      <main>
        <div className="results-container">
          <MusicTable
            results={sortedResults} 
            loading={loading}
            error={error}
            addToPlaylist={addToPlaylist}
            onTrackClick={setSelectedTrack}
          />
        </div>
        <div className="playlist-container">
          <Playlist 
            playlist={playlist}
            removeFromPlaylist={removeFromPlaylist}
            clearPlaylist={clearPlaylist}
          />
        </div>
      </main>

      {selectedTrack && (
        <DetailModal 
          track={selectedTrack} 
          onClose={closeModal} 
        />
      )}

    </div>
  );
}

export default App;

