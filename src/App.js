import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import imagen from './page-not-found.png';
import styled from '@emotion/styled';

const Jumbotron = styled.div`
    background: url('https://wallpapercave.com/wp/JYodMo6.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 7rem;
    padding-bottom: 7rem;
    backdrop-filter: blur(2px);
`;

const Titulo = styled.p`
    font-size: 3rem;
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    color: #fff;

    @media (max-width: 767px) {
      font-size: 2.2rem;
    }
`;

const ImgSinResultados = styled.img`
    width: 500px;

    @media (max-width: 767px) {
      width: 100%;
    }
`;

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);

  useEffect(() => {

    // Para que no haga busqueda al abrir la pagina
    if (busqueda === '') return;

    const consultarAPI = async () => {
      const API_KEY = '16023968-e414e415e7058622c20bf9e79';
      const per_page = 30;
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${busqueda}&lang=es&per_page=${per_page}&page=${currentpage}`;
      const response = await fetch(url);
      const result = await response.json();

      setImagenes(result.hits);

      // Calcular total de paginas para paginador
      setTotalPages(Math.ceil(result.totalHits / per_page))

      // Scroll hacia arriba al cambiar de pagina
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }

    consultarAPI();
  }, [busqueda, currentpage])

  const paginaAnterior = () => {
    const newCurrentPage = currentpage - 1;

    if (newCurrentPage === 0) return;
    setCurrentPage(newCurrentPage);
  }

  const paginaSiguiente = () => {
    const newCurrentPage = currentpage + 1;

    if (newCurrentPage > totalpages) return;
    setCurrentPage(newCurrentPage);
  }

  return (
    <Fragment>
      <Jumbotron className="jumbotron jumbotron-fluid ">
        <div className="container">
          <Titulo className="lead text-center">Buscador de Imágenes</Titulo>

          <Formulario
            setBusqueda={setBusqueda}
          />
        </div>

      </Jumbotron>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <ListadoImagenes
            imagenes={imagenes}
          />

          {(imagenes.length === 0)
            ? (<ImgSinResultados src={imagen} alt="No results found"/>)
            : null
          }

          {(currentpage === 1) ? null : (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
          )}

          {(currentpage === totalpages) ? null : (
            <button
              type="button"
              className="btn btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          )}


        </div>
      </div>
    </Fragment>

  );
}

export default App;
