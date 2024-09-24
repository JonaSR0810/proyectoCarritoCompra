
import React from 'react';
import './App.css';
import { Contenedor } from './componentes/Contenedor';
import { Datos } from './componentes/Datos';
import data from "./Productos.json";
import data1_1 from "./Tecnologia.json";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
function App() {
  const [contadorCarrito, setContadorCarrito] = useState(0);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
      const actualizadoCarrito = carrito.map(item => {
        if (item.id === producto.id) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      setCarrito(actualizadoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };


  const precio_descontado = (precio, descuento) => {
    return (precio - (precio * parseInt(descuento) / 100)).toFixed(2)
  };

  

  
  const restarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
      if (existente.cantidad === 1) {
        const carritoActualizado = carrito.filter(item => item.id !== producto.id);
        setCarrito(carritoActualizado);
      } else {
        const actualizadoCarrito = carrito.map(item => {
          if (item.id === producto.id) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        });
        setCarrito(actualizadoCarrito);
      }
      restarCantidadCarrito(); // Restar solo si se pudo restar del carrito
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setContadorCarrito(0);
  };


  const añadirCantidadCarrito = () => {
    if (contadorCarrito >= 0) {
      setContadorCarrito(contadorCarrito + 1);
    }
  };

  const restarCantidadCarrito = () => {
    if (contadorCarrito > 0) {
      setContadorCarrito(contadorCarrito - 1);
    }
  };

  const añadirTodo = (producto) => {
    agregarAlCarrito(producto);
    añadirCantidadCarrito();
  }
  

   const restarTodo = (producto) => {
    restarAlCarrito(producto);
    restarCantidadCarrito();
  }


  // Función para calcular el total del carrito
  const calcularTotal = () => {
    const total = carrito.reduce((total, producto) => {
      const precioDescontado = precio_descontado(parseFloat(producto.precio), parseFloat(producto.descuento));
      return total + precioDescontado * producto.cantidad;
    }, 0);
    return total.toFixed(2); // Redondear el total a dos decimales
  };
  
  return (
    <div className="App">
      <div className="top" id="inicio">
        <nav className="menu">
          <img src="/imagenes/aldi.png" alt="imagen" />
          <div className="carrito">
            Carrito <FaShoppingCart />
            <div className="numero-producto">{contadorCarrito}</div>
            <div className="desplegable">
              <img src="/imagenes/aldi.png" alt="Logo" className="logodesplegable" />
              <ul className='productos'>
                {carrito.length === 0 ? (
                  <li className="carrito-vacio">El carrito está vacío</li>
                ) : (
                  carrito.map((producto, index) => (
                    <li key={index}>
                      <img src={producto.imagen} alt={producto.nombre} className="imagen-producto" />
                      <button className="catidad-producto" onClick={() => añadirTodo(producto)}> <FaPlus className='suma'/> </button>
                      <button className="catidad-producto" onClick={() => restarTodo(producto)}> <FaMinus className='resta'/> </button><br></br>
                      {producto.nombre} {producto.cantidad > 1 && `x${producto.cantidad}`} - {precio_descontado(producto.precio, producto.descuento)} €
                      
                      <hr></hr>
                    </li>
                    
                  ))
                )}
                
              </ul>
              <p>Total: {calcularTotal()} €</p>
              <button className="boton-vaciar" onClick={vaciarCarrito}>Vaciar Carrito</button>
            </div>
          </div>
        </nav>
      </div>
      <img src='imagenes/videaso.gif' alt="GIF" className="gif-banner"/>

      
      <h1>PRODUCTOS ALIMENTICIOS</h1>
      <Contenedor>
        {data.map(datos =>
          <Datos
            key={datos.id}
            imagendescuento={datos.imagendescuento}
            imagen={datos.imagen}
            id={datos.id}
            nombre={datos.nombre}
            precio={datos.precio}
            descuento={datos.descuento}
            agregarAlCarrito={() => agregarAlCarrito(datos)}
            añadirCantidadCarrito={añadirCantidadCarrito}
          />
        )}
        
      </Contenedor>
      <div className="contenedor2">
        <h1>PRODUCTOS TECNOLÓGICOS</h1>
        <Contenedor>
          {data1_1.map(datos =>
            <Datos
              key={datos.id}
              imagendescuento={datos.imagendescuento}
              imagen={datos.imagen}
              id={datos.id}
              nombre={datos.nombre}
              precio={datos.precio}
              descuento={datos.descuento}
              agregarAlCarrito={() => agregarAlCarrito(datos)}
              añadirCantidadCarrito={añadirCantidadCarrito}
            />
          )}
        </Contenedor>
      </div>
      <button className='boton-inicio'><a href='#inicio'>Volver Arriba</a></button>
    </div>
  );
}

export default App;
