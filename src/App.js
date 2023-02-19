import Header from "./components/header/Header";
import Navigate from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom';
import Movie from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import Search from "./pages/Search/Search";
import Series from "./pages/Series/Series";

function App() {
  return (
    <>
      <Header />
    <div className="app">
      <Routes>
      <Route path="/" element={<Trending/>} />  
      <Route path="/movies" element={<Movie />}/>  
      <Route path="/series" element={<Series />} />  
      <Route path="/search" element={<Search />} />  
      </Routes>  
    </div>
    <Navigate />
    </>
  );
}

export default App;
