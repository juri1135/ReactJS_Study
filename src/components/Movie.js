import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../Movie.module.css';
function Movie({ title, cover_image, genres, summary, id, rating, day }) {
  return (
    //Link to 이용해서 브라우저 새로고침 없이 영화 제목 클릭하면 다른 페이지로 넘어가게 만들기
    <div className={styles.movie}>
      <div className={styles.mov}>
        <Link basename={process.env.PUBLIC_URL} to={`/movie/${id}`}>
          <div class={styles.movieImg}>
            <img
              src={cover_image}
              alt={title}
              style={{
                maxWidth: '200px' /* 최대 너비를 200px로 설정 */,
                maxHeight: '300px' /* 최대 높이를 300px로 설정 */,
                objectFit:
                  'cover' /* 이미지 비율을 유지하면서 컨테이너를 꽉 채움 */,
              }}
            ></img>
          </div>

          <div className={styles.coverText}>
            <strong>⭐{rating}</strong>
          </div>
        </Link>
      </div>
      <p className={styles.movieTitle}>{title}</p>
      <p style={{ marginTop: 2 }}>📅{day}</p>
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
export default Movie;
