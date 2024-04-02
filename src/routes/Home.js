import Movie from '../components/Movie';
import { useState, useEffect } from 'react';
import styles from '../Movie.module.css';
import { Link, useLocation } from 'react-router-dom';
function Home() {
  const location = useLocation(); // 현재 위치를 추적
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [sorted, setSorted] = useState(false); // 추가: 정렬 상태를 관리
  const [up, setUp] = useState(false); // 추가: 정렬 방향 관리 (true: 오름차순, false: 내림차순)
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [allGenres, setAllGenres] = useState([]);
  const [mode, setMode] = useState(['drak']);

  const onClick = () => {
    if (up) {
      // 현재 오름차순이면 내림차순으로 정렬
      setMovies((currentMovies) =>
        [...currentMovies].sort((a, b) => b.rating - a.rating)
      );
    } else {
      // 현재 내림차순이면 오름차순으로 정렬
      setMovies((currentMovies) =>
        [...currentMovies].sort((a, b) => a.rating - b.rating)
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

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const json = await (
        await fetch(
          'https://yts.mx/api/v2/list_movies.json?minimum_rating=5&sort_by=year'
        )
      ).json();
      setMovies(json.data.movies);
      // 모든 영화에서 장르 추출 후 중복 제거하여 상태 설정
      const genres = new Set(json.data.movies.flatMap((movie) => movie.genres));
      setAllGenres(['All', ...genres]);
      setLoading(false);
    };
    getMovies();
    if (mode === 'dark') {
      document.body.style.backgroundColor = 'var(--background-color-dark)';
      document.body.style.color = 'var(--text-color-dark)';
      document.body.style.margin = 0;
    } else {
      document.body.style.backgroundColor = 'var(--background-color-light)';
      document.body.style.color = 'var(--text-color-light)';
      document.body.style.margin = 0;
    }
    const savedMode = localStorage.getItem('mode') || 'dark';
    setMode(savedMode);
  }, [location.pathname, mode]);
  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };
  //사용자가 입력한 제목 필터링하기 영화 제목들 다 소문자로 바꾸고
  //전체 영화 제목에서 사용자가 입력한 문자가 포함되면 그 영화 여기 다 담아
  // 필터링된 영화 목록, 정렬된 상태가 아니라면 원본 목록 사용
  // Combine title and genre filtering into one step, applying sorting if needed
  let displayedMovies = movies.filter(
    (movie) =>
      (selectedGenre === 'All' || movie.genres.includes(selectedGenre)) &&
      movie.title.toLowerCase().includes(title.toLowerCase())
  );

  if (sorted) {
    displayedMovies.sort((a, b) =>
      up ? a.rating - b.rating : b.rating - a.rating
    );
  }
  return (
    <div
      className={`${styles.container} ${
        mode === 'light' ? styles.lightContainer : ''
      }`}
    >
      <div className={styles.header}>
        <Link
          basename={process.env.PUBLIC_URL}
          to='/'
          style={{ textDecoration: 'none', textAlign: 'center' }}
        >
          <h1
            style={{
              color: 'red',
              fontSize: '3rem',
              marginTop: 5,
              marginBottom: 5,
              fontWeight: 1000,
            }}
          >
            Juriflix🎞️
          </h1>
        </Link>

        <button
          onClick={() => {
            setMode(mode === 'dark' ? 'light' : 'dark');
            const newMode = mode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('mode', newMode); // 상태를 localStorage에 저장
          }}
          className={styles.themeToggle}
          style={{
            background: 'transparent' /* 배경색 투명 */,
            border: 'none' /* 테두리 없음 */,
            fontSize: 'large',
          }}
        >
          {mode === 'dark' ? '🌞' : '🌚'}
        </button>
      </div>
      {loading ? null : (
        <>
          <div className={styles.input}>
            <input
              className={styles.movieSearch}
              type='text'
              placeholder='Search movies...'
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
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => selectGenre(genre)}
                className={`${
                  mode === 'dark' ? styles.genreButton : styles.lightgenreButton
                } ${selectedGenre === genre ? styles.selectedGenre : ''}`}
              >
                {genre}
              </button>
            ))}
          </div>
        </>
      )}
      {loading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div className={styles.moviesContainer}>
          {displayedMovies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              cover_image={movie.medium_cover_image}
              genres={movie.genres}
              summary={movie.summary}
              rating={movie.rating}
              runtime={movie.runtime}
              day={movie.year}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
