import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import App from '../App.module.css';
function Detail() {
  //const x=useParams()로 하면 {id:'num'} 형태로 나오는데
  //const {id}=useParams()로 하면 그냥 id값만 딱! 나옴
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movie, setMovie] = useState(null);
  //Details로 갈 때 params가 id값!!! 왜냐면 App.js에서 경로 설정할 때
  // /movie/:id로 설정했으니까!! :juri로 했으면 juri 값이 movie의 id겠죵
  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovieDetails(json);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, [id]);
  return (
    <div className={App.detailContainer}>
      {movieDetails ? (
        <div>
          <h1>
            <Link to={movie.url}>{movieDetails.data.movie.title}</Link>(
            {movie.year})
          </h1>
          <img src={movie.medium_cover_image} alt={movie.title}></img>
          <p>
            <strong>Rating:</strong> {movie.rating}, <strong>RunTime:</strong>{' '}
            {movie.runtime}
          </p>
          <p>
            <strong>genres:</strong> {movie.genres.join(',')}
          </p>
          <p>
            <strong>Intro:</strong> {movie.description_intro}
          </p>
          <p>
            <strong>Full:</strong> {movie.description_full}
          </p>
        </div> // Adjust according to your API response structure
      ) : (
        <div>
          <h1>Loading...</h1>
        </div> // Display a loading message or spinner before data is fetched
      )}
    </div>
  );
}
export default Detail;
