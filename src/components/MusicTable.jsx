import React from 'react';

const MusicTable = ({ results, loading, error, addToPlaylist }) => {

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (results.length === 0) {
    return <p>Tidak ada hasil. Silakan lakukan pencarian.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Artwork</th>
          <th>Track Name</th>
          <th>Artist</th>
          <th>Price</th>
          <th>Audio Preview</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item) => (
          <tr key={item.trackId}>
            <td>
              <img src={item.artworkUrl100} alt={item.trackName} />
            </td>
            <td>{item.trackName}</td>
            <td>{item.artistName}</td>
            <td>{item.trackPrice} {item.currency}</td>
            <td>
              <audio controls src={item.previewUrl}></audio>
            </td>
            <td>
              <button onClick={() => addToPlaylist(item)}>
                Add to Playlist
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MusicTable;