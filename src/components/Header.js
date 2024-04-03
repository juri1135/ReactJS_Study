import { useState } from 'react';
import styles from '../Movie.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../routes/ThemeContext';

function Header() {
  const { mode, toggleMode } = useTheme();
  return (
    <div
      className={`${styles.header} ${
        mode === 'light' ? styles.lightContainer : ''
      }`}
    >
      <Link
        basename={process.env.PUBLIC_URL}
        to='/'
        style={{ textDecoration: 'none' }}
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
        onClick={toggleMode}
        className={styles.themeset}
        style={{
          background: 'transparent' /* 배경색 투명 */,
          border: 'none' /* 테두리 없음 */,
          fontSize: 'large',
        }}
      >
        {mode === 'dark' ? '🌞' : '🌚'}
      </button>
      <div className={styles.movieORtv}>
        <Link
          className={styles.movieOR}
          basename={process.env.PUBLIC_URL}
          to='/movie'
        >
          Movie
        </Link>
        <Link
          className={styles.tvOR}
          basename={process.env.PUBLIC_URL}
          to='/Tv'
        >
          TV
        </Link>
      </div>
    </div>
  );
}
export default Header;
