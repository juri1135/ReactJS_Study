import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function Movie({ title, cover_image, genres, summary, id }) {
  return (
    //Link to 이용해서 브라우저 새로고침 없이 영화 제목 클릭하면 다른 페이지로 넘어가게 만들기
    <div>
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>
        <img src={cover_image} alt={title}></img>
      </p>
      <strong>Genres: {genres.join(', ')}</strong>
      <p>{summary === '' ? 'null' : summary}</p>
      <hr />
    </div>
  );
}
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
