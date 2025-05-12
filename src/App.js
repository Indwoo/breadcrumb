import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SpeciesList from './pages/SpeciesList';
import SpeciesOverview from './pages/SpeciesOverview';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import './styles/main.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/species" element={<SpeciesList />} />
      <Route path="/species/:speciesId" element={<SpeciesOverview />} />
      <Route path="/species/:speciesId/pokemons" element={<PokemonList />} />
      <Route path="/species/:speciesId/pokemons/:pokemonId" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
