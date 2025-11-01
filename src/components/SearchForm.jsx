import React from 'react';

const SearchForm = ({ searchTerm, setSearchTerm, mediaType, setMediaType, handleSearch, loading }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Cari artis, lagu, album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
      >
        <option value="musicTrack">Lagu (Track)</option>
        <option value="album">Album</option>
        <option value="musicArtist">Artis</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Mencari...' : 'Cari'}
      </button>
    </form>
  );
};

export default SearchForm;
