
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stati, setStati] = useState({
    TRATTO1: 'ok',
    TRATTO2: 'in_scadenza',
    TRATTO3: 'da_fare',
    TRATTO4: 'ok',
    TRATTO5: 'ok'
  });

  const colori = {
    ok: 'green',
    in_scadenza: 'orange',
    da_fare: 'red'
  };

  useEffect(() => {
    Object.keys(stati).forEach(tratto => {
      const el = document.getElementById(tratto);
      if (el) el.setAttribute('fill', colori[stati[tratto]]);
    });
  }, [stati]);

  return (
    <div className="App">
      <h2>Linea a 5 tratti - Stato manutentivo</h2>
      <object type="image/svg+xml" data="/impianto.svg" width="600" height="220" />
    </div>
  );
}

export default App;
