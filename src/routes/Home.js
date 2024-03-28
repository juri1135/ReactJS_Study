import Movie from '../components/Movie';
import { useState, useEffect } from 'react';
import styles from '../Movie.module.css';
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const onChange = (event) => {
    setTitle(event.target.value);
  };
  const getMovies = async () => {
    const json = await (
      await fetch(
        'https://yts.mx/api/v2/list_movies.json?minimum_rating=9.5&sort_by=year'
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  //useEffect!! 기억나지!!! 페이지 전체 랜더링하면 개손해니까 getMovies는 맨 첨에만 랜더링하고 재랜더링 안 해!
  //getMovies는 말 그대로 url 받아서 페이지 이동했을 때 id 받는 것만 하면 되니까 그 후에는 다시 쓸 일이 없음;;

  useEffect(() => {
    getMovies();
  }, []);
  //사용자가 입력한 제목 필터링하기 영화 제목들 다 소문자로 바꾸고
  //전체 영화 제목에서 사용자가 입력한 문자가 포함되면 그 영화 여기 다 담아
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(title.toLowerCase())
  );
  return (
    <div className={styles.container}>
      <h1>Movie list🎞️</h1>
      <hr />
      {loading ? null : (
        <input
          className={styles.movieSearch}
          type='text' // type을 'text'로 변경
          placeholder='Search movies...' // 사용자가 입력창의 용도를 이해할 수 있도록 placeholder 추가
          onChange={onChange}
        ></input>
      )}
      {loading ? (
        <h1>Loading...🔃</h1>
      ) : (
        <div className={styles.moviesContainer}>
          {filteredMovies.map((movie) => (
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
