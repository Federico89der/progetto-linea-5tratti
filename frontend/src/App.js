
import React, { useEffect, useState } from 'react';
import './App.css';
import './Modal.css';

function App() {
  const [tratti, setTratti] = useState([]);
  const [trattoSelezionato, setTrattoSelezionato] = useState(null);
  const [formData, setFormData] = useState({ tipo: '', tecnico: '', note: '' });

  const colori = {
    ok: 'green',
    in_scadenza: 'orange',
    da_fare: 'red'
  };

  useEffect(() => {
    fetch('https://linea-backend.onrender.com/api/tratti/')
      .then(res => res.json())
      .then(data => setTratti(data));
  }, []);

  const getFill = (nome) => {
    const tratto = tratti.find(t => t.nome.toUpperCase() === nome);
    return tratto ? colori[tratto.stato] || 'gray' : 'gray';
  };

  const handleSubmit = () => {
    const payload = {
      tratto: trattoSelezionato.id,
      tipo: formData.tipo,
      tecnico: formData.tecnico,
      note: formData.note
    };

    fetch('https://linea-backend.onrender.com/api/interventi/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(() => {
      setTrattoSelezionato(null);
      setFormData({ tipo: '', tecnico: '', note: '' });
      window.location.reload();
    })
    .catch(err => console.error('Errore invio:', err));
  };

  return (
    <div className="App">
      <h2>Stato linea manutentiva</h2>
      <svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="30" fill="pink" stroke="black" />
        {['TRATTO1', 'TRATTO2', 'TRATTO3', 'TRATTO4', 'TRATTO5'].map((nome, idx) => (
          <rect key={nome}
            x="110"
            y={10 + 40 * idx}
            width="400"
            height="30"
            fill={getFill(nome)}
            stroke="black"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const t = tratti.find(t => t.nome.toUpperCase() === nome);
              if (t) setTrattoSelezionato(t);
            }}
          />
        ))}
        <rect x="510" y="170" width="80" height="30" fill="pink" stroke="black" />
      </svg>

      {trattoSelezionato && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nuovo intervento su {trattoSelezionato.nome}</h3>
            <input
              type="text"
              placeholder="Tipo intervento"
              value={formData.tipo}
              onChange={e => setFormData({ ...formData, tipo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tecnico"
              value={formData.tecnico}
              onChange={e => setFormData({ ...formData, tecnico: e.target.value })}
            />
            <textarea
              placeholder="Note"
              value={formData.note}
              onChange={e => setFormData({ ...formData, note: e.target.value })}
            />
            <button onClick={handleSubmit}>Registra</button>
            <button className="close" onClick={() => setTrattoSelezionato(null)}>Chiudi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
