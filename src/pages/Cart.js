import React from 'react';

function Cart({ cart, removeFromCart, updateQuantity }) {
  return (
    <div>
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <span>{item.nombre} - ${item.precio} x {item.cantidad}</span>
            <input
              type="number"
              min="1"
              value={item.cantidad}
              onChange={(e) => updateQuantity(index, e.target.value)}
            />
            <button onClick={() => removeFromCart(index)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;

