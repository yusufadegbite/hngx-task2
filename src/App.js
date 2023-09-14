import "./App.css";
import Hompage from "./pages/Hompage";
import MovieDetails from "./pages/MovieDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Hompage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
