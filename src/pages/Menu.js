import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

// Importar imágenes
import monstruosa from '../assets/monstruosa.jpg';
import soda from '../assets/soda.jpg';
import pai from '../assets/pai.jpg';

const productos = [
  {
    nombre: 'Monstruosa',
    precio: 30000,
    imagen: monstruosa,
  },
  {
    nombre: 'Soda de Liche',
    precio: 5000,
    imagen: soda,
  },
  {
    nombre: 'Pai de Chocolate',
    precio: 7000,
    imagen: pai,
  },
];

function Menu({ addToCart }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {productos.map((producto, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={producto.imagen}
              alt={producto.nombre}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {producto.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Precio: ${producto.precio}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart({ ...producto, cantidad: 1 })}
                style={{ marginTop: '10px' }}
              >
                Agregar al pedido
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Menu;

