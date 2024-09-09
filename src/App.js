import React, { useState } from 'react';
import Menu from './pages/Menu';
import { AppBar, Toolbar, IconButton, Badge, Modal, Box, Typography, Button, TextField } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'; // Ícono de celular
import Cart from './pages/Cart'; // Asumiendo que Cart es el componente que muestra el pedido

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ nombre: '', direccion: '' });
  const [error, setError] = useState('');

  const addToCart = (product) => {
    const productExists = cart.find(item => item.nombre === product.nombre);
    if (productExists) {
      setCart(
        cart.map(item =>
          item.nombre === product.nombre
            ? { ...item, cantidad: parseInt(item.cantidad) + parseInt(product.cantidad) }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const generarMensajeWhatsApp = () => {
    if (!customerInfo.nombre || !customerInfo.direccion) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    const productosMensaje = cart.map(item => `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`).join(', ');
    const mensaje = `Hola, me gustaría pedir: ${productosMensaje}. Nombre: ${customerInfo.nombre}, Dirección: ${customerInfo.direccion}`;

    const urlWhatsApp = `https://wa.me/573175662576?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div>
      {/* Barra de navegación con ícono de celular */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menú
          </Typography>
          <IconButton color="inherit" onClick={handleModalOpen}>
            <Badge badgeContent={cart.length} color="secondary">
              <PhoneAndroidIcon /> {/* Ícono de celular */}
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Modal que muestra el resumen del pedido y el formulario de cliente */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-pedido"
        aria-describedby="modal-contenido-pedido"
      >
        <Box sx={style}>
          <Typography id="modal-pedido" variant="h6" component="h2">
            Resumen de Pedido
          </Typography>

          <Cart cart={cart} />

          {/* Formulario de datos del cliente */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Datos del Cliente
          </Typography>
          <TextField
            label="Nombre"
            name="nombre"
            value={customerInfo.nombre}
            onChange={handleCustomerInfoChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            name="direccion"
            value={customerInfo.direccion}
            onChange={handleCustomerInfoChange}
            fullWidth
            margin="normal"
          />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          {cart.length > 0 && (
            <Button onClick={generarMensajeWhatsApp} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Enviar pedido por WhatsApp
            </Button>
          )}
        </Box>
      </Modal>

      {/* Menú principal */}
      <Menu addToCart={addToCart} />
    </div>
  );
}

export default App;



