import '../hojas-de-estilos/Contenedor.css'

const Contenedor = (props) => {
    return(
        <div className="contenedor">
            {props.children}
        </div>
    );
}

export {Contenedor};