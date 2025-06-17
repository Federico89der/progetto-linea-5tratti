import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tratti, setTratti] = useState([]);

  const colori = {
    ok: 'green',
    in_scadenza: 'orange',
    da_fare: 'red'
  };

  useEffect(() => {
    fetch('https://linea-backend.onrender.com/api/tratti/')
      .then(res => res.json())
      .then(data => {
        setTratti(data);
        data.forEach(tratto => {
          const el = document.getElementById(tratto.nome.toUpperCase());
          if (el && colori[tratto.stato]) {
            el.setAttribute('fill', colori[tratto.stato]);
          }
        });
      })
      .catch(err => console.error('Errore nel recupero dati:', err));
  }, []);

  return (
    <div className="App">
      <h2>Stato linea manutentiva</h2>
      <object type="image/svg+xml" data="/impianto.svg" width="600" height="240" />
    </div>
  );
}

export default App;
