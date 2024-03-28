import { useEffect, useState } from 'react';
import styles from '../Movie.module.css';
import { useParams, useNavigate } from 'react-router-dom';
function Detail() {
  //const x=useParams()로 하면 {id:'num'} 형태로 나오는데
  //const {id}=useParams()로 하면 그냥 id값만 딱! 나옴
  const { id } = useParams();
  const navigate = useNavigate();
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
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getMovie();
  }, [id]);
  const backgroundStyle = movie
    ? { backgroundImage: `url(${movie.background_image_original})` }
    : {};

  return (
    <div className={styles.detailContainer} style={backgroundStyle}>
      {movieDetails ? (
        <button onClick={goBack} className={styles.back}>
          ◀ Back
        </button>
      ) : null}

      {movieDetails ? (
        <div className={styles.detailBox}>
          <img
            src={movie.medium_cover_image}
            alt={movie.title}
            style={{ width: 200, marginBottom: 10 }}
          ></img>

          <a
            href={movie.url}
            className={styles.download} // 스타일 적용을 위해 className 사용
            target='_blank' // 새 탭에서 링크 열기
            rel='noopener noreferrer' // 보안 위험 방지
          >
            Download
          </a>
          <div className={styles.details}>
            <strong>Rating:</strong> {movie.rating}
            <p>
              <strong>RunTime:</strong> {movie.runtime} minutes
            </p>
            <p>
              <strong>genres:</strong> {movie.genres.join(', ')}
            </p>
            <p>
              <strong>Intro:</strong>{' '}
              {movie.description_intro === ''
                ? 'null'
                : movie.description_intro}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div> // Display a loading message or spinner before data is fetched
      )}
    </div>
  );
}
export default Detail;
