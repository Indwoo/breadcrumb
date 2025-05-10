import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [speciesName, setSpeciesName] = useState(null);
  const [loadingSpecies, setLoadingSpecies] = useState(false);

  useEffect(()=>{
    const speciesIdIndex = pathnames.findIndex((x, i) => pathnames[i - 1] === 'species');

    if (speciesIdIndex !== -1) {
      const id = pathnames[speciesIdIndex];
      setLoadingSpecies(true);
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => res.json())
        .then((data) => setSpeciesName(data.name))
        .catch(() => setSpeciesName(null))
        .finally(() => setLoadingSpecies(false));
    }
  }, [location.pathname]);

  const getPathname = (segment, index) => {
    const prev = pathnames[index - 1];

    switch (segment) {
      case 'species':
        return 'Pokemon Species List';
      case 'pokemons':
        return 'Pokemon List';
      default:
        if (prev === 'species') {
          if (loadingSpecies) return 'Loading...';
          return speciesName || `species-${segment}`;
        }
        return segment;
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.map((segment, i) => {
        const to = '/' + pathnames.slice(0, i + 1).join('/');
        const isLast = i === pathnames.length - 1;

        return (
          <span key={to}>
            {' > '}
            {isLast ? (
              <span>{getPathname(segment, i)}</span>
            ) : (
              <Link to={to}>{getPathname(segment, i)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  )
}

export default BreadCrumb