import React, { useState } from 'react';

function FormularioCliente({ setCustomerInfo }) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomerInfo({ nombre, direccion });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Dirección:</label>
        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </div>
      <button type="submit">Guardar datos</button>
    </form>
  );
}

export default FormularioCliente;
