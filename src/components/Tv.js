import { useState, useEffect } from 'react';
import styles from '../Movie.module.css';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from '../routes/ThemeContext';
function Tv() {
  const location = useLocation(); // 현재 위치를 추적
  const [loading, setLoading] = useState(true);
  const [tv, setTv] = useState([]);
  const [sorted, setSorted] = useState(false); // 추가: 정렬 상태를 관리
  const [up, setUp] = useState(false); // 추가: 정렬 방향 관리 (true: 오름차순, false: 내림차순)
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [allGenres, setAllGenres] = useState([]);
  const { mode, toggleMode } = useTheme();
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=c50be32b4ea0f1614f09c0d548130381&language=en-US`;
      const response = await fetch(url);
      const json = await response.json();
      setGenres([{ id: 'All', name: 'All' }, ...json.genres]);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const getTv = async () => {
      setLoading(true);
      const json = await (
        await fetch(
          'https://api.themoviedb.org/3/discover/tv?api_key=c50be32b4ea0f1614f09c0d548130381'
        )
      ).json();
      setTv(json.results);

      // 장르 ID 배열을 실제 장르 이름으로 변환
      const allGenreNames = json.results.map((tv) =>
        tv.genre_ids
          .map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : 'Unknown';
          })
          .join(', ')
      );

      // 중복을 제거하여 모든 장르를 설정
      const uniqueGenres = [...new Set(allGenreNames.flat())];
      setAllGenres(['All', ...uniqueGenres]);
      setLoading(false);
    };
    getTv();
  }, [location.pathname, mode]);
  const onClick = () => {
    if (up) {
      // 현재 오름차순이면 내림차순으로 정렬
      setTv((currentTv) =>
        [...currentTv].sort((a, b) => b.vote_average - a.vote_average)
      );
    } else {
      // 현재 내림차순이면 오름차순으로 정렬
      setTv((currentTv) =>
        [...currentTv].sort((a, b) => a.vote_average - b.vote_average)
      );
    }
    setUp(!up); // 정렬 방향 반전
    setSorted(true); // 정렬된 상태로 설정
  };
  const onChange = (event) => {
    setTitle(event.target.value);
  };

  //useEffect!! 기억나지!!! 페이지 전체 랜더링하면 개손해니까 getMovies는 맨 첨에만 랜더링하고 재랜더링 안 해!
  //getMovies는 말 그대로 url 받아서 페이지 이동했을 때 id 받는 것만 하면 되니까 그 후에는 다시 쓸 일이 없음;;

  //사용자가 입력한 제목 필터링하기 영화 제목들 다 소문자로 바꾸고
  //전체 영화 제목에서 사용자가 입력한 문자가 포함되면 그 영화 여기 다 담아
  // 필터링된 영화 목록, 정렬된 상태가 아니라면 원본 목록 사용
  // Combine title and genre filtering into one step, applying sorting if needed
  let displayedTv = tv.filter(
    (tv) =>
      (selectedGenre === 'All' ||
        tv.genre_ids.includes(parseInt(selectedGenre))) &&
      tv.name.toLowerCase().includes(title.toLowerCase())
  );

  if (sorted) {
    displayedTv.sort((a, b) =>
      up ? a.rating - b.rating : b.rating - a.rating
    );
  }
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div
      className={`${styles.container} ${
        mode === 'light' ? styles.lightContainer : ''
      }`}
    >
      <Header />
      {loading ? null : (
        <>
          <div className={styles.input}>
            <input
              className={styles.movieSearch}
              type='text'
              placeholder='Search tv show...'
              onChange={onChange}
            />
            <button onClick={onClick} className={styles.button}>
              {up ? '▲' : '▼'}
            </button>
          </div>
          <div
            className={`${
              mode === 'light'
                ? styles.lightgenreContainer
                : styles.genreContainer
            }`}
          >
            {genres.map((genre) => (
              <button
                className={`${
                  mode === 'light'
                    ? styles.lightgenreButton
                    : styles.genreButton
                }`}
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </>
      )}
      {loading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div className={styles.moviesContainer}>
          {displayedTv.map((tv) => (
            <div className={styles.movie}>
              <div className={styles.mov}>
                <Link basename={process.env.PUBLIC_URL} to={`/tv/${tv.id}`}>
                  <div class={styles.movieImg}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original' + tv.poster_path
                      }
                      alt={tv.original_name}
                      style={{
                        maxWidth: '200px', //최대 너비를 200px로 설정 ,
                        maxHeight: '300px', //최대 높이를 300px로 설정 ,
                        objectFit: 'cover', //이미지 비율을 유지하면서 컨테이너를 꽉 채움 ,
                      }}
                    ></img>
                  </div>

                  <div className={styles.coverText}>
                    <strong>⭐{tv.vote_average}</strong>
                  </div>
                </Link>
              </div>

              <p className={styles.movieTitle}>{tv.original_name}</p>
              <p style={{ marginTop: 2 }}>📅{tv.first_air_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Movie.propTypes = {
//   id: PropTypes.number.isRequired,
//   cover_image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
//   genres: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
export default Tv;
