import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import { useEffect } from 'react';
function App() {
  return (
    // /는 Home으로 간다는 의미. / 이 경로에 있으면 Home 랜더링하겠다
    // url 경로가 /movie면 Detail 랜더링하겠다
    <Router basename='/ReactJS_Study'>
      <Routes>
        <Route path={`/movie/:id`} element={<Detail />} />
        <Route path={`/`} element={<Home />} />
        <Route path={`/hello`} element={<h1>Hello!</h1>} />
      </Routes>
    </Router>
  );
}
export default App;
