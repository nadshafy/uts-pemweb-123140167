import React from 'react';

const MusicTable = ({ results, mediaType, loading, error, addToPlaylist, onTrackClick }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!results || results.length === 0) return <p>Tidak ada hasil. Silakan lakukan pencarian.</p>;

  return (
    <table>
      <thead>
        {mediaType === 'musicTrack' && (
          <tr>
            <th>Artwork</th>
            <th>Judul Lagu</th>
            <th>Artis</th>
            <th>Album</th>
            <th>Harga</th>
            <th>Audio Preview</th>
            <th>Aksi</th>
          </tr>
        )}
        {mediaType === 'album' && (
          <tr>
            <th>Artwork</th>
            <th>Nama Album</th>
            <th>Artis</th>
            <th>Jumlah Track</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        )}
      </thead>
      <tbody>
        {results.map((item) => (
          <tr key={item.trackId || item.collectionId}>
            {mediaType === 'musicTrack' && (
              <>
                <td><img src={item.artworkUrl100} alt={item.trackName} /></td>
                <td onClick={() => onTrackClick(item)} style={{ cursor: 'pointer', color: 'blue' }}>{item.trackName}</td>
                <td>{item.artistName}</td>
                <td>{item.collectionName}</td>
                <td>{item.trackPrice ? `$${item.trackPrice}` : '-'}</td>
                <td>{item.previewUrl && <audio controls src={item.previewUrl}></audio>}</td>
                <td>
                  <button style={{ marginRight: '8px' }} onClick={() => addToPlaylist(item)}>Tambah</button>
                  <button onClick={() => onTrackClick(item)}>Detail</button>
                </td>
              </>
            )}
            {mediaType === 'album' && (
              <>
                <td><img src={item.artworkUrl100} alt={item.collectionName} /></td>
                <td onClick={() => onTrackClick(item)} style={{ cursor: 'pointer', color: 'blue' }}>{item.collectionName}</td>
                <td>{item.artistName}</td>
                <td>{item.trackCount}</td>
                <td>{item.collectionPrice ? `$${item.collectionPrice}` : '-'}</td>
                <td>
                  <button style={{ marginRight: '8px' }} onClick={() => addToPlaylist(item)}>Tambah Semua Track</button>
                  <button onClick={() => onTrackClick(item)}>Detail</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MusicTable;
