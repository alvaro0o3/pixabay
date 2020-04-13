import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({setBusqueda}) => {

    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    

    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if (search.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        // Enviar al componente principal
        setBusqueda(search);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca imágenes"
                        onChange={ e => setSearch(e.target.value) }
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-warning btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            {
                error 
                ? <Error mensaje="Por favor, indica que quieres buscar" />
                : null
            }
        </form>
     );
}
 
export default Formulario;