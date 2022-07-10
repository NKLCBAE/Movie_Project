import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https:/yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);

    setLoading(false);
  }, [id]);
  console.log(movie);
  useEffect(() => {
    getMovie();
  }, [getMovie, id]);
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <h1>{movie.title_long}</h1>
          <img src={movie.large_cover_image} alt={movie.title} />
          <h2>{`Genres:${movie.genres}`}</h2>
          <p>{movie.description_full}</p>
          <a href={movie.url}>Go To Page</a>
        </div>
      )}
    </div>
  );
}
export default Detail;
