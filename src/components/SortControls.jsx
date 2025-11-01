import React from 'react';

const SortControls = ({ setSortKey }) => {
  return (
    <div role="sort-controls"> 
      <span>Sortir berdasarkan: </span>
      
      <button onClick={() => setSortKey('price')}>Harga</button>
      <button onClick={() => setSortKey('date')}>Tanggal Rilis</button>
      
      <button onClick={() => setSortKey('')} className="secondary">
        Reset
      </button>
    </div>
  );
};

export default SortControls;
