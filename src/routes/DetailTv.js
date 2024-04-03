import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Movie.module.css';
function Detailtv() {
  //const x=useParams()로 하면 {id:'num'} 형태로 나오는데
  //const {id}=useParams()로 하면 그냥 id값만 딱! 나옴
  const { id } = useParams();
  const navigate = useNavigate();
  const [tvDetails, setTvDetails] = useState(null);
  const [tv, setTv] = useState(null);

  //Details로 갈 때 params가 id값!!! 왜냐면 App.js에서 경로 설정할 때
  // /movie/:id로 설정했으니까!! :juri로 했으면 juri 값이 movie의 id겠죵
  useEffect(() => {
    const getTvDetail = async () => {
      // API 엔드포인트를 특정 영화의 상세 정보를 조회하는 것으로 변경하세요.
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=c50be32b4ea0f1614f09c0d548130381`;
      const response = await fetch(url);
      const json = await response.json();
      setTvDetails(json);
      setTv(json); // 상태를 설정합니다.
    };

    getTvDetail();
  }, [id]);
  const goBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  const genresList = tv?.genres.map((genre) => genre.name).join(', ');
  const languagesList = tv?.spoken_languages
    .map((lang) => lang.english_name)
    .join(', ');
  const companies = tv?.production_companies
    .map((company) => company.name)
    .join(', ');

  const country = tv?.origin_country.join(', ');
  return (
    <div className={styles.detailContainer}>
      {/* 배경 이미지를 포함하는 별도의 요소로 블러 효과 적용 */}
      {tv && (
        <div
          className={styles.backgroundBlur}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
          }}
        ></div>
      )}
      {tv ? (
        <>
          <button onClick={goBack} className={styles.back}>
            ◀ Back
          </button>
          <div className={styles.detailBox}>
            <img
              src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
              alt={tv.name}
              style={{ width: 300, marginBottom: 10 }}
            ></img>
            <a
              href={tv.homepage}
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
                <strong>Coutry: </strong>
                {country}
              </p>
              <p>
                <strong>Rating:</strong> {tv.vote_average} (vote count:{' '}
                {tv.vote_count})
              </p>
              <p>
                <strong>genres:</strong> {genresList}
              </p>
              <p>
                <strong>Company: </strong>
                {companies}{' '}
              </p>

              <p>
                <strong>First air date: </strong>
                {tv.first_air_date}
              </p>
              <p>
                <strong>Last air date: </strong>
                {tv.last_air_date}
              </p>
              <p>
                <strong>Episodes: </strong>
                {tv.number_of_episodes}
              </p>
              <p>
                <strong>Seasons: </strong>
                {tv.number_of_seasons}
              </p>
              <p>
                <strong>overview:</strong>{' '}
                {tv.overview === '' ? 'null' : tv.overview}
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
export default Detailtv;
