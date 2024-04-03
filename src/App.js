import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import DetailTv from './routes/DetailTv';
import Tv from './components/Tv';
import ThemeProvider from './routes/ThemeContext';
function App() {
  return (
    // /는 Home으로 간다는 의미. / 이 경로에 있으면 Home 랜더링하겠다
    // url 경로가 /movie면 Detail 랜더링하겠다
    <ThemeProvider>
      <Router basename='/ReactJS_Study'>
        <Routes>
          <Route path={`/movie/:id`} element={<Detail />} />
          <Route path={`/`} element={<Home />} />
          <Route path={`/movie`} element={<Home />} />
          <Route path={`/Tv`} element={<Tv />} />
          <Route path={`/tv/:id`} element={<DetailTv />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
