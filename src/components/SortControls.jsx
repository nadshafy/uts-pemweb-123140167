import React from 'react';

const SortControls = ({ setSortKey }) => {
  return (
    <div>
      <span>Sortir berdasarkan: </span>
      <button onClick={() => setSortKey('price')}>Harga</button>
      <button onClick={() => setSortKey('date')}>Tanggal Rilis</button>
      <button onClick={() => setSortKey('')}>Reset</button>
    </div>
  );
};

export default SortControls;