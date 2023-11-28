import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const NoticiasContext = createContext();

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("general");
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalNoticias, setTotalNoticias] = useState(0);

  // Maneja el filtro de noticias por categoria
  useEffect(() => {
    const getNoticias = async () => {
      const URL = `https://newsapi.org/v2/top-headlines?country=US&category=${categoria}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data } = await axios(URL);
      // Seteo el estado Global con los datos de Noticias.
      setNoticias(data.articles);
      // Seteo el estado Global con la cantidad Total de Noticias
      setTotalNoticias(data.totalResults);
      // Vuelvo siempre a la pagina 1
      setPagina(1);
    };

    getNoticias();
  }, [categoria]);

  // Maneja el filtro de noticias por pagina
  useEffect(() => {
    // El atributo page de la url muestra una pagina específica.
    // El atributo pageSize determina la cantidad de aticulos dentro de la pagina.
    // Por defecto son 20 por página.
    const getNoticias = async () => {
      const URL = `https://newsapi.org/v2/top-headlines?country=US&category=${categoria}&page=${pagina}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data } = await axios(URL);
      console.log(data);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
    };

    getNoticias();
  }, [pagina]);

  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleChangePagina = (e, valor) => {
    // un evento puede enviar el propio evento y el valorActual
    setPagina(valor);
  };

  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};

export default NoticiasProvider;
