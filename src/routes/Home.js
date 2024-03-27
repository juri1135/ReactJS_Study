import Movie from '../components/Movie';
import { useState, useEffect } from 'react';
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
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
  return (
    <div>
      <h1>Movie list🎞️</h1>
      <hr />
      {loading ? (
        <h1>Loading...🔃</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              cover_image={movie.medium_cover_image}
              genres={movie.genres}
              summary={movie.summary}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
