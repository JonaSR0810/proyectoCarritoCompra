import "../hojas-de-estilos/Datos.css";

const Datos = ({ imagen, id, nombre, precio, agregarAlCarrito, añadirCantidadCarrito,descuento, imagendescuento }) => {
  const agregarCarrito = () => {
    añadirCantidadCarrito();
    agregarAlCarrito();
  }



  return (
    <div className="datosmain">
      
    <div className="datos">
      
      <img className={id === "4" || id === "10"  ? "cuarta-imagen" : ""} src={imagen} alt="imagen" />
      <div>
        <h2>{nombre}</h2>
        <p className="precio">{precio} € </p>
        <p className="precio-normal">{(precio - (precio * parseInt(descuento) / 100)).toFixed(2)} €</p>
      </div>
      <img className="descuento10" src={imagendescuento} alt="imagen_descuento"/><button className="añadir" onClick={agregarCarrito}>Añadir</button>
    </div>
    </div>
  );
  
};


export { Datos };
