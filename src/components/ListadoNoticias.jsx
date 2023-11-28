import { v4 as uuid } from "uuid";
import useNoticias from "../hooks/useNoticias";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Noticia from "./Noticia";

const ListadoNoticias = () => {
  const { noticias, totalNoticias, handleChangePagina, pagina } = useNoticias();

  const totalPaginas = Math.ceil(totalNoticias / 20);

  return (
    <>
      <Typography textAlign="center" marginY={5} variant="h3" component="h2">
        Ultimas Noticias
      </Typography>
      <Grid container spacing={4}>
        {noticias.map((noticia) => (
          <Noticia key={uuid()} noticia={noticia} />
        ))}
      </Grid>
      <Stack
        spacing={2}
        marginY={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          count={totalPaginas}
          color="error"
          onChange={handleChangePagina}
          page={pagina} // state del componente, se le pasa el valor de la página que debe marcar.
        />
      </Stack>
    </>
  );
};

export default ListadoNoticias;
