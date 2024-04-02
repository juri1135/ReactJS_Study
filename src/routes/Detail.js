import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Movie.module.css';
function Detail() {
  //const x=useParams()로 하면 {id:'num'} 형태로 나오는데
  //const {id}=useParams()로 하면 그냥 id값만 딱! 나옴
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movie, setMovie] = useState(null);

  //Details로 갈 때 params가 id값!!! 왜냐면 App.js에서 경로 설정할 때
  // /movie/:id로 설정했으니까!! :juri로 했으면 juri 값이 movie의 id겠죵
  useEffect(() => {
    const getMovieDetail = async () => {
      // API 엔드포인트를 특정 영화의 상세 정보를 조회하는 것으로 변경하세요.
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c50be32b4ea0f1614f09c0d548130381`;
      const response = await fetch(url);
      const json = await response.json();
      setMovieDetails(json);
      setMovie(json); // 상태를 설정합니다.
    };

    getMovieDetail();
  }, [id]);
  const goBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  const genresList = movie?.genres.map((genre) => genre.name).join(', ');
  const languagesList = movie?.spoken_languages
    .map((language) => language.english_name)
    .join(', ');
  const companies = movie?.production_companies.map((company) => company.name);
  const companylogo = `https://image.tmdb.org/t/p/original${movie?.production_companies.map(
    (company) => company.logo_path
  )}`;
  return (
    <div className={styles.detailContainer}>
      {/* 배경 이미지를 포함하는 별도의 요소로 블러 효과 적용 */}
      {movie && (
        <div
          className={styles.backgroundBlur}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>
      )}
      {movie ? (
        <>
          <button onClick={goBack} className={styles.back}>
            ◀ Back
          </button>
          <div className={styles.detailBox}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              style={{ width: 300, marginBottom: 10 }}
            ></img>
            <a
              href={movie.homepage}
              className={styles.download} // 스타일 적용을 위해 className 사용
              target='_blank' // 새 탭에서 링크 열기
              rel='noopener noreferrer' // 보안 위험 방지
            >
              Homepage
            </a>
            <div className={styles.details}>
              <p>
                <strong>Language: </strong>
                {languagesList}
              </p>
              <p>
                <strong>Company: </strong>
                {companies}{' '}
              </p>
              <strong>Rating:</strong> {movie.vote_average}
              <p>
                <strong>RunTime:</strong> {movie.runtime} minutes
              </p>
              <p>
                <strong>genres:</strong> {genresList}
              </p>
              <p>
                <strong>overview:</strong>{' '}
                {movie.overview === '' ? 'null' : movie.overview}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <h1>Loading...</h1>
        </div> // Display a loading message or spinner before data is fetched
      )}
    </div>
  );
}
export default Detail;
