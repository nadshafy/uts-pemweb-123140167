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
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    const entity = mediaType === 'musicTrack' ? 'musicTrack' : 'album';

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music&entity=${entity}&limit=20`
      );
      if (!response.ok) throw new Error(`Gagal mengambil data (status ${response.status})`);
      const data = await response.json();
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setError(err);
      setResults([]);
    }

    setLoading(false);
  };

  const addToPlaylist = (track) => {
    if (!playlist.find((item) => item.trackId === track.trackId)) {
      setPlaylist([...playlist, track]);
    }
  };

  const addAlbumToPlaylist = async (album) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${album.collectionId}&entity=song`
      );
      if (!response.ok) throw new Error('Gagal mengambil track album');
      const data = await response.json();
      const tracks = data.results.filter(item => item.wrapperType === 'track');
      const newTracks = tracks.filter(track => !playlist.find(p => p.trackId === track.trackId));
      setPlaylist([...playlist, ...newTracks]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromPlaylist = (id) => {
    setPlaylist(playlist.filter(item => item.trackId !== id && item.collectionId !== id));
  };

  const clearPlaylist = () => setPlaylist([]);

  const handleTrackClick = (item) => {
    setSelectedTrack(item);
  };

  const closeModal = () => setSelectedTrack(null);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('myPlaylist');
    if (savedPlaylist) setPlaylist(JSON.parse(savedPlaylist));
  }, []);

  useEffect(() => {
    localStorage.setItem('myPlaylist', JSON.stringify(playlist));
  }, [playlist]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortKey === 'price') return (a.trackPrice || a.collectionPrice || 0) - (b.trackPrice || b.collectionPrice || 0);
    if (sortKey === 'date') return new Date(b.releaseDate) - new Date(a.releaseDate);
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
        loading={loading}
      />
      <hr />
      <SortControls setSortKey={setSortKey} />
      <hr />
      <main>
        <div className="results-container">
          <MusicTable
            results={sortedResults}
            mediaType={mediaType}
            loading={loading}
            error={error}
            addToPlaylist={mediaType === 'album' ? addAlbumToPlaylist : addToPlaylist}
            onTrackClick={handleTrackClick}
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
      {selectedTrack && <DetailModal track={selectedTrack} onClose={closeModal} />}
    </div>
  );
}

export default App;
