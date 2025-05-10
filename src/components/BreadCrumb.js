import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  console.log(pathnames)

  const [name, setName] = useState({ species: null, pokemon: null });

  useEffect(() => {
    const fetchName = async () => {
      const spIdx = pathnames.findIndex((x, i) => pathnames[i - 1] === 'species');
      const pkIdx = pathnames.findIndex((x, i) => pathnames[i - 1] === 'pokemons');

      try {
        if (spIdx !== -1) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pathnames[spIdx]}`);
          const data = await res.json();
          setName(prev => ({ ...prev, species: data.name }));
        }
        if (pkIdx !== -1) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pathnames[pkIdx]}`);
          const data = await res.json();
          setName(prev => ({ ...prev, pokemon: data.name }));
        }
      } catch (err) {
        console.log('Failed to fetch');
      }
    };

    fetchName();
  }, [location.pathname]);

  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.map((path, i) => {
        const sep = '/' + pathnames.slice(0, i + 1).join('/');
        const last = i === pathnames.length - 1;
        const prev = pathnames[i - 1];

        let text = path;
        if (prev === 'species' && name.species) text = name.species;
        if (prev === 'pokemons' && name.pokemon) text = name.pokemon;

        if (path === 'species') text = 'Species';
        if (path === 'pokemons') text = 'Pokemons';

        return (
          <span key={sep}>
            {' > '}
            {last ? <span>{text}</span> : <Link to={sep}>{text}</Link>}
          </span>
        );
      })}
    </nav>
  );
}

export default BreadCrumb;